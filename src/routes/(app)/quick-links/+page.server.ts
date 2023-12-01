import type { Actions, PageServerLoad } from './$types';
import { superValidate, message } from 'sveltekit-superforms/server';
import { schema } from './validation';
import { prisma } from '$lib/server/prisma';

export const load = (async ({ parent, locals }) => {
	await parent();
	const { user } = await locals?.lucia.validate();
	// fetch users integrations
	const quickLink = {
		id: '',
		amount: 100
	};

	const form = await superValidate(quickLink, schema);

	const links = await prisma.quickLink.findMany({
		where: {
			userId: user?.id
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	return { user, title: 'Quick Links', form, links };
}) satisfies PageServerLoad;

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const { user } = await locals?.lucia.validate();
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
						user: {
							connect: {
								id: user?.id
							}
						}
					}
				});

				form.data.id = res.id;
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
		const form = await superValidate(request, schema);
		const quickLinkId = url.searchParams.get('id');
		if (quickLinkId) {
			try {
				await prisma.quickLink.delete({
					where: {
						id: quickLinkId
					}
				});

				return message(form, 'Quick link deleted!');
			} catch (error) {
				console.error(error);
				return message(form, 'Failed to delete quick link', {
					status: 400
				});
			}
		}
	}
};
