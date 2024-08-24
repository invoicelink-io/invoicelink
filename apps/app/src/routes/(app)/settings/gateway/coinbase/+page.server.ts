import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { schema } from './validation';
import { superValidate, message } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { getIntegrations } from '$lib/utils/integrations';

export const load = (async ({ parent, locals }) => {
	await parent();
	const { user } = locals;

	// fetch users integrations
	const userIntegrations = await getIntegrations(user?.id);

	const form = await superValidate(userIntegrations?.coinbase[0], zod(schema));

	return {
		user,
		title: 'Coinbase Settings',
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

		// delete any existing webhooks
		// await deleteAllCoinbaseWebhooks(form.data.secretKey);

		try {
			// check if the user has an integration already
			const userIntegration = await prisma.integration.findFirst({
				where: {
					userId: user?.id
				}
			});

			// register a new webhook for the user
			// const webhook = await registerCoinbaseWebhook({
			// 	secretKey: form.data.secretKey,
			// 	url: `https://app.invoicelink.io/api/coinbase/notify/${user?.id}`
			// });

			if (userIntegration) {
				const res = await prisma.coinbase.create({
					data: {
						integration: {
							connect: {
								id: userIntegration.id
							}
						},
						secretKey: form.data.secretKey
						// webhookSecret: webhook.secret
					}
				});
				form.data.id = res.id;
				return message(form, 'Coinbase integration created');
			} else {
				const res = await prisma.integration.create({
					data: {
						user: {
							connect: {
								id: user?.id
							}
						},
						coinbase: {
							create: {
								secretKey: form.data.secretKey
								// webhookSecret: webhook.secret
							}
						}
					},
					include: {
						coinbase: true
					}
				});
				form.data.id = res.coinbase[0].id;
				return message(form, 'Coinbase integration created');
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
				await prisma.coinbase.delete({
					where: {
						id: form.data.id
					}
				});

				// delete any webhooks
				// await deleteAllCoinbaseWebhooks(form.data.secretKey);

				form.data.id = undefined;
				form.data.secretKey = '';
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
			// delete any existing webhooks
			// await deleteAllCoinbaseWebhooks(form.data.secretKey);

			if (form.data.id) {
				// register a new webhook for the user
				// const webhook = await registerCoinbaseWebhook({
				// 	secretKey: form.data.secretKey,
				// 	url: `https://app.invoicelink.io/api/coinbase/notify/${user?.id}`
				// });

				await prisma.coinbase.update({
					where: {
						id: form.data.id
					},
					data: {
						secretKey: form.data.secretKey
						// webhookSecret: webhook.secret
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
