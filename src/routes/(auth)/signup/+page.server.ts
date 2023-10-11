import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { auth } from '$lib/server/lucia';

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) {
		throw redirect(302, '/');
	}
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request }) => {
		const { name, email, password } = Object.fromEntries(await request.formData()) as Record<
			string,
			string
		>;

		console.log({ name, email, password });
		// TODO: Validate user input
		try {
			await auth.createUser({
				key: {
					providerId: 'email',
					providerUserId: email,
					password: password
				},
				attributes: {
					name: name,
					email: email
				}
			});
		} catch (error) {
			return fail(400, { message: 'Could not register user' });
		}

		throw redirect(302, '/login');
	}
};
