import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';

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

	return {
		user: locals?.session?.user,
		title: 'Integrations',
		integrations: userIntegrations
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const userId = locals.session.user.userId;
		const formData = Object.fromEntries(await request.formData()) as Record<string, string>;

		// check if the user has an integration already
		const userIntegration = await prisma.integration.findFirst({
			where: {
				user_id: userId
			}
		});

		try {
			if (userIntegration) {
				// create the payfast integration
				await prisma.payfast.create({
					data: {
						integration: {
							connect: {
								id: userIntegration.id
							}
						},
						merchant_id: formData.merchant_id,
						merchant_key: formData.merchant_key,
						passphrase: formData.passphrase
					}
				});
			} else {
				await prisma.integration.create({
					data: {
						user: {
							connect: {
								id: userId
							}
						},
						payfast: {
							create: {
								merchant_id: formData.merchant_id,
								merchant_key: formData.merchant_key,
								passphrase: formData.passphrase
							}
						}
					}
				});
			}
			return {
				success: true
			};
		} catch (error) {
			console.error(error);
			return fail(400, {
				data: formData,
				errors: { message: 'Failed to create integration' }
			});
		}
	},
	delete: async ({ request, url }) => {
		const formData = Object.fromEntries(await request.formData()) as Record<string, string>;
		const payfastId = url.searchParams.get('id');
		if (payfastId) {
			try {
				await prisma.payfast.delete({
					where: {
						id: payfastId
					}
				});
			} catch (error) {
				console.error(error);
				return fail(400, {
					data: formData,
					errors: { message: 'Failed to delete integration' }
				});
			}
		}

		return {
			success: true
		};
	},
	update: async ({ request, url }) => {
		const formData = Object.fromEntries(await request.formData()) as Record<string, string>;
		const payfastId = url.searchParams.get('id');
		if (payfastId) {
			try {
				const res = await prisma.payfast.update({
					where: {
						id: payfastId
					},
					data: {
						merchant_id: formData.merchant_id,
						merchant_key: formData.merchant_key,
						passphrase: formData.passphrase
					}
				});

				return {
					success: true,
					data: {
						merchant_id: res.merchant_id,
						merchant_key: res.merchant_key,
						passphrase: res.passphrase
					}
				};
			} catch (error) {
				console.error(error);
				return fail(400, {
					data: formData,
					errors: { message: 'Failed to update integration' }
				});
			}
		}
	}
};
