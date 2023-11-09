import type { Actions, PageServerLoad } from './$types';
import { superValidate, message } from 'sveltekit-superforms/server';
import { schema } from './validation';

export const load = (async ({ parent, locals }) => {
	await parent();
	// fetch users integrations
	const quickLink = {
		id: '123',
		amount: 250
	};

	const form = await superValidate(quickLink, schema);

	const links = await prisma.quickLink.findMany({
		where: {
			user_id: locals?.session?.user?.id
		},
		orderBy: {
			created_at: 'desc'
		}
	});

	return { user: locals?.session?.user, title: 'Quick Links', form, links };
}) satisfies PageServerLoad;

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const userId = locals.session.user.userId;
		const form = await superValidate(request, schema);

		if (!form.valid) {
			return message(form, 'Invalid quick link!');
		}

		try {
			// NOTE: Update this when adding more payment gateways
			// check if the user has an active integration
			const userIntegration = await prisma.integration.findFirst({
				where: {
					user_id: userId
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
			const res = await prisma.quickLink.create({
				data: {
					amount: form.data.amount,
					user_id: userId
				}
			});
			console.log(userIntegration);
			form.data.id = res.id;
			return message(form, 'Quick link created!');
		} catch (error) {
			console.error(error);
			return message(form, 'Failed to create quick link', {
				status: 400
			});
		}
	},
	delete: async ({ request, url }) => {
		const form = await superValidate(request, schema);
		console.log(url);
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
