import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { schema } from './validation';
import { superValidate, message } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { deleteAllStripeWebhooks, registerStripeWebhook } from '@invoicelink/lib/payments';

export const load = (async ({ parent, locals }) => {
	await parent();
	const { user } = locals;

	// fetch users integrations
	const userIntegrations = await prisma.integration.findFirst({
		where: {
			userId: user?.id
		},
		include: {
			stripe: true
		}
	});

	const form = await superValidate(userIntegrations?.stripe[0], zod(schema));

	return {
		user,
		title: 'Stripe Settings',
		form
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	create: async ({ request, locals, url }) => {
		const { user } = locals;
		const form = await superValidate(request, zod(schema));

		if (!form.valid) {
			return message(form, 'Invalid integration details');
		}

		// delete any existing webhooks
		await deleteAllStripeWebhooks(form.data.secretKey);

		try {
			// check if the user has an integration already
			const userIntegration = await prisma.integration.findFirst({
				where: {
					userId: user?.id
				}
			});

			// register a new webhook for the user
			const webhook = await registerStripeWebhook({
				secretKey: form.data.secretKey,
				url: `${url.origin}/api/stripe/notify/${user?.id}`
			});

			if (userIntegration) {
				const res = await prisma.stripe.create({
					data: {
						integration: {
							connect: {
								id: userIntegration.id
							}
						},
						secretKey: form.data.secretKey,
						webhookSecret: webhook.secret
					}
				});
				form.data.id = res.id;
				return message(form, 'Stripe integration created');
			} else {
				const res = await prisma.integration.create({
					data: {
						user: {
							connect: {
								id: user?.id
							}
						},
						stripe: {
							create: {
								secretKey: form.data.secretKey,
								webhookSecret: webhook.secret
							}
						}
					},
					include: {
						stripe: true
					}
				});
				form.data.id = res.stripe[0].id;
				return message(form, 'Stripe integration created');
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
				await prisma.stripe.delete({
					where: {
						id: form.data.id
					}
				});

				// delete any webhooks
				await deleteAllStripeWebhooks(form.data.secretKey);

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
	update: async ({ request, url, locals }) => {
		const { user } = locals;
		const form = await superValidate(request, zod(schema));
		if (!form.valid) {
			return message(form, 'Invalid integration details');
		}

		try {
			// delete any existing webhooks
			await deleteAllStripeWebhooks(form.data.secretKey);

			if (form.data.id) {
				// register a new webhook for the user
				const webhook = await registerStripeWebhook({
					secretKey: form.data.secretKey,
					url: `${url.origin}/api/stripe/notify/${user?.id}`
				});

				await prisma.stripe.update({
					where: {
						id: form.data.id
					},
					data: {
						secretKey: form.data.secretKey,
						webhookSecret: webhook.secret
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
