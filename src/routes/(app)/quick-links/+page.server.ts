import type { Actions, PageServerLoad } from './$types';
import { superValidate, message } from 'sveltekit-superforms/server';
import { schema, deleteSchema } from './validation';
import { prisma } from '$lib/server/prisma';
import { SerialType } from '@prisma/client';
import { incrementSerialNumber, initializeSerialNumber } from '$lib/utils/serialNumbers';

export const load = (async ({ parent, locals }) => {
	await parent();
	const { user } = await locals.lucia.validate();

	const quickLink = {
		id: '',
		serial: initializeSerialNumber(SerialType.QUICK_LINK),
		amount: 100,
		description: ''
	};
	if (user) {
		// get last used serial
		const lastSerial = (
			await prisma.lastUsedSerial.findUnique({
				where: {
					userId_type: {
						userId: user?.id,
						type: SerialType.QUICK_LINK
					}
				}
			})
		)?.serial;
		quickLink.serial = lastSerial
			? incrementSerialNumber(lastSerial)
			: initializeSerialNumber(SerialType.QUICK_LINK);
	}

	const form = await superValidate(quickLink, schema);
	const deleteForm = await superValidate({ id: '' }, deleteSchema);

	const links = await prisma.quickLink.findMany({
		where: {
			userId: user?.id
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	return { user, title: 'Quick Links', form, deleteForm, links };
}) satisfies PageServerLoad;

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const { user } = await locals.lucia.validate();
		const form = await superValidate(request, schema);

		if (!form.valid) {
			return message(form, 'Invalid quick link!');
		}

		try {
			// NOTE: Update this when adding more payment gateways
			// check if the user has an active integration
			const userIntegration = await prisma.integration.findFirst({
				where: {
					userId: user?.id
				},
				include: {
					payfast: true
				}
			});

			// Check the user has an active integration
			if (!userIntegration) {
				return message(form, 'No active integration found!', {
					status: 400
				});
			} else if (userIntegration.payfast.length === 0) {
				return message(form, 'No active integration found!', {
					status: 400
				});
			}

			// create the quick link
			if (user?.id) {
				const res = await prisma.quickLink.create({
					data: {
						amount: form.data.amount,
						serial: form.data.serial,
						description: form.data.description,
						user: {
							connect: {
								id: user?.id
							}
						}
					}
				});

				await prisma.lastUsedSerial.upsert({
					create: {
						serial: form.data.serial,
						userId: user?.id,
						type: SerialType.QUICK_LINK
					},
					update: {
						serial: form.data.serial
					},
					where: {
						userId_type: {
							userId: user?.id,
							type: SerialType.QUICK_LINK
						}
					}
				});

				form.data.id = res.id;
				form.data.serial = incrementSerialNumber(res.serial);
				form.data.amount;
				form.data.description = '';
				return message(form, 'Quick link created!');
			}
		} catch (error) {
			console.error(error);
			return message(form, 'Failed to create quick link', {
				status: 400
			});
		}
	},
	delete: async ({ request, url }) => {
		const deleteForm = await superValidate(request, deleteSchema);
		const quickLinkId = url.searchParams.get('id');
		if (quickLinkId) {
			try {
				await prisma.quickLink.delete({
					where: {
						id: quickLinkId
					}
				});

				return message(deleteForm, 'Quick link deleted!');
			} catch (error) {
				console.error(error);
				return message(deleteForm, 'Failed to delete quick link', {
					status: 400
				});
			}
		}
	}
};
