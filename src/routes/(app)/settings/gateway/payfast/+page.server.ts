import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { schema } from './validation';
import { superValidate, message } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';

export const load = (async ({ parent, locals }) => {
	await parent();
	const { user } = locals;

	// fetch users integrations
	const userIntegrations = await prisma.integration.findFirst({
		where: {
			userId: user?.id
		},
		include: {
			payfast: true
		}
	});

	const form = await superValidate(userIntegrations?.payfast[0], zod(schema));

	return {
		user,
		title: 'Payfast Settings',
		form
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const { user } = locals;
		const form = await superValidate(request, zod(schema));

		if (!form.valid) {
			return message(form, 'Invalid integration details');
		}

		try {
			// check if the user has an integration already
			const userIntegration = await prisma.integration.findFirst({
				where: {
					userId: user?.id
				}
			});

			if (userIntegration) {
				const res = await prisma.payfast.create({
					data: {
						integration: {
							connect: {
								id: userIntegration.id
							}
						},
						merchantId: form.data.merchantId,
						merchantKey: form.data.merchantKey,
						passphrase: form.data.passphrase || ''
					}
				});
				form.data.id = res.id;
				return message(form, 'Payfast integration created');
			} else {
				const res = await prisma.integration.create({
					data: {
						user: {
							connect: {
								id: user?.id
							}
						},
						payfast: {
							create: {
								merchantId: form.data.merchantId,
								merchantKey: form.data.merchantKey,
								passphrase: form.data.passphrase ?? ''
							}
						}
					},
					include: {
						payfast: true
					}
				});
				form.data.id = res.payfast[0].id;
				return message(form, 'Payfast integration created');
			}
		} catch (error) {
			console.error(error);
			return message(form, 'Failed to create integration', {
				status: 400
			});
		}
	},
	delete: async ({ request }) => {
		const form = await superValidate(request, zod(schema));
		if (form.data.id) {
			try {
				await prisma.payfast.delete({
					where: {
						id: form.data.id
					}
				});

				form.data.id = undefined;
				form.data.merchantId = '';
				form.data.merchantKey = '';
				form.data.passphrase = undefined;
				return message(form, 'Integration deleted');
			} catch (error) {
				console.error(error);
				return message(form, 'Failed to delete integration', {
					status: 400
				});
			}
		}
	},
	update: async ({ request }) => {
		const form = await superValidate(request, zod(schema));
		if (!form.valid) {
			return message(form, 'Invalid integration details');
		}

		try {
			if (form.data.id) {
				await prisma.payfast.update({
					where: {
						id: form.data.id
					},
					data: {
						merchantId: form.data.merchantId,
						merchantKey: form.data.merchantKey,
						passphrase: form.data.passphrase || ''
					}
				});
			}
			return message(form, 'Integration updated');
		} catch (error) {
			console.error(error);
			return message(form, 'Failed to update integration', {
				status: 400
			});
		}
	}
};
