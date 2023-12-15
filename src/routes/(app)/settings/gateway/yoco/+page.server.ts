import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { schema } from './validation';
import { superValidate, message } from 'sveltekit-superforms/server';

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
	create: async ({ request, locals }) => {
		const { user } = await locals.lucia.validate();
		const form = await superValidate(request, schema);

		if (!form.valid) {
			return message(form, 'Invalid integration details!');
		}

		try {
			// check if the user has an integration already
			const userIntegration = await prisma.integration.findFirst({
				where: {
					userId: user?.id
				}
			});

			if (userIntegration) {
				const res = await prisma.yoco.create({
					data: {
						integration: {
							connect: {
								id: userIntegration.id
							}
						},
						publicKey: form.data.publicKey,
						secretKey: form.data.secretKey
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
								secretKey: form.data.secretKey
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
	update: async ({ request }) => {
		const form = await superValidate(request, schema);
		if (!form.valid) {
			return message(form, 'Invalid integration details!');
		}

		try {
			if (form.data.id) {
				await prisma.yoco.update({
					where: {
						id: form.data.id
					},
					data: {
						publicKey: form.data.publicKey,
						secretKey: form.data.secretKey
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
