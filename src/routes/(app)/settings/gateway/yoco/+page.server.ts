import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { schema } from './validation';
import { superValidate, message } from 'sveltekit-superforms/server';
import { deleteAllWebhooks, registerWebhook } from '$lib/utils/yoco';

export const load = (async ({ parent, locals }) => {
	await parent();
	const { user } = await locals.lucia.validate();

	// fetch users integrations
	const userIntegrations = await prisma.integration.findFirst({
		where: {
			userId: user?.id
		},
		include: {
			yoco: true
		}
	});

	const form = await superValidate(userIntegrations?.yoco[0], schema);

	return {
		user,
		title: 'Yoco Settings',
		form
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	create: async ({ request, locals, url }) => {
		const { user } = await locals.lucia.validate();
		const form = await superValidate(request, schema);

		if (!form.valid) {
			return message(form, 'Invalid integration details!');
		}

		// delete any existing webhooks
		await deleteAllWebhooks(form.data.secretKey);

		try {
			// check if the user has an integration already
			const userIntegration = await prisma.integration.findFirst({
				where: {
					userId: user?.id
				}
			});

			// register a new webhook for the user
			const webhook = await registerWebhook({
				secretKey: form.data.secretKey,
				userId: user?.id as string,
				url: `${url.origin}/api/yoco/notify/${user?.id}`
			});

			console.log(webhook);

			if (userIntegration) {
				const res = await prisma.yoco.create({
					data: {
						integration: {
							connect: {
								id: userIntegration.id
							}
						},
						publicKey: form.data.publicKey,
						secretKey: form.data.secretKey,
						webhookSecret: webhook.secret
					}
				});
				form.data.id = res.id;
				return message(form, 'Yoco integration created!');
			} else {
				const res = await prisma.integration.create({
					data: {
						user: {
							connect: {
								id: user?.id
							}
						},
						yoco: {
							create: {
								publicKey: form.data.publicKey,
								secretKey: form.data.secretKey,
								webhookSecret: webhook.secret
							}
						}
					},
					include: {
						yoco: true
					}
				});
				form.data.id = res.yoco[0].id;
				return message(form, 'Yoco integration created!');
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
				await prisma.yoco.delete({
					where: {
						id: form.data.id
					}
				});

				// delete any webhooks
				await deleteAllWebhooks(form.data.secretKey);

				form.data.id = undefined;
				form.data.publicKey = '';
				form.data.secretKey = '';
				return message(form, 'Integration deleted!');
			} catch (error) {
				console.error(error);
				return message(form, 'Failed to delete integration', {
					status: 400
				});
			}
		}
	},
	update: async ({ request, locals, url }) => {
		const { user } = await locals.lucia.validate();
		const form = await superValidate(request, schema);
		if (!form.valid) {
			return message(form, 'Invalid integration details!');
		}

		try {
			// delete any existing webhooks
			await deleteAllWebhooks(form.data.secretKey);

			if (form.data.id) {
				// register a new webhook for the user
				const webhook = await registerWebhook({
					secretKey: form.data.secretKey,
					userId: user?.id as string,
					url: `${url.origin}/api/yoco/notify/${user?.id}`
				});

				await prisma.yoco.update({
					where: {
						id: form.data.id
					},
					data: {
						publicKey: form.data.publicKey,
						secretKey: form.data.secretKey,
						webhookSecret: webhook.secret
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
