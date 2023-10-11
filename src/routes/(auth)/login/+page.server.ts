import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { LuciaError } from 'lucia';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.session) {
		throw redirect(302, '/');
	}
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const { email, password } = Object.fromEntries(await request.formData()) as Record<
			string,
			string
		>;

		try {
			const key = await auth.useKey('email', email, password);
			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			});
			locals.auth.setSession(session);
		} catch (e: any) {
			console.error(e);
			if (e instanceof LuciaError && e.message === 'AUTH_INVALID_KEY_ID') {
				// invalid key
				return fail(400, { message: 'Invalid key' });
			}
			if (e instanceof LuciaError && e.message === 'AUTH_INVALID_PASSWORD') {
				// incorrect password
				return fail(400, { message: 'Incorrect password' });
			}
			return fail(400, { message: 'Could not login user.' });
		}
		throw redirect(302, '/');
	}
};
