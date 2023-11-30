import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { schema } from './validation';
import { superValidate, message } from 'sveltekit-superforms/server';

export const load = (async ({ parent, locals }) => {
	await parent();

	// fetch users integrations
	const userIntegrations = await prisma.integration.findFirst({
		where: {
			user_id: locals?.session?.user?.id
		},
		include: {
			payfast: true
		}
	});

	const form = await superValidate(userIntegrations?.payfast[0], schema);

	return {
		user: locals?.session?.user,
		title: 'Integrations',
		form
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const userId = locals.session.user.userId;
		const form = await superValidate(request, schema);

		if (!form.valid) {
			return message(form, 'Invalid integration details!');
		}

		try {
			// check if the user has an integration already
			const userIntegration = await prisma.integration.findFirst({
				where: {
					user_id: userId
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
						merchant_id: form.data.merchant_id,
						merchant_key: form.data.merchant_key,
						passphrase: form.data.passphrase || ''
					}
				});
				form.data.id = res.id;
				return message(form, 'Payfast integration created!');
			} else {
				const res = await prisma.integration.create({
					data: {
						user: {
							connect: {
								id: userId
							}
						},
						payfast: {
							create: {
								merchant_id: form.data.merchant_id,
								merchant_key: form.data.merchant_key,
								passphrase: form.data.passphrase ?? ''
							}
						}
					},
					include: {
						payfast: true
					}
				});
				form.data.id = res.payfast[0].id;
				return message(form, 'Payfast integration created!');
			}
		} catch (error) {
			console.error(error);
			return message(form, 'Failed to create integration', {
				status: 400
			});
		}
	},
	delete: async ({ request }) => {
		const form = await superValidate(request, schema);
		if (form.data.id) {
			try {
				await prisma.payfast.delete({
					where: {
						id: form.data.id
					}
				});

				form.data.id = undefined;
				form.data.merchant_id = '';
				form.data.merchant_key = '';
				form.data.passphrase = undefined;
				return message(form, 'Integration deleted!');
			} catch (error) {
				console.error(error);
				return message(form, 'Failed to delete integration', {
					status: 400
				});
			}
		}
	},
	update: async ({ request }) => {
		const form = await superValidate(request, schema);
		if (!form.valid) {
			return message(form, 'Invalid integration details!');
		}

		try {
			if (form.data.id) {
				await prisma.payfast.update({
					where: {
						id: form.data.id
					},
					data: {
						merchant_id: form.data.merchant_id,
						merchant_key: form.data.merchant_key,
						passphrase: form.data.passphrase || ''
					}
				});
			}
			return message(form, 'Integration updated!');
		} catch (error) {
			console.error(error);
			return message(form, 'Failed to update integration', {
				status: 400
			});
		}
	}
};
