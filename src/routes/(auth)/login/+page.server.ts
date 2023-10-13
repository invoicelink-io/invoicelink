import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { LuciaError } from 'lucia';
import { validateSignupForm } from './validation';

export const load: PageServerLoad = async ({ locals, url }) => {
	if (locals.session) {
		throw redirect(302, '/');
	} else {
		// get query params
		let message = url.searchParams.get('message');
		return { message };
	}
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const { email, password } = Object.fromEntries(await request.formData()) as Record<
			string,
			string
		>;

		const result = validateSignupForm({ email, password });

		if (result) {
			return fail(500, {
				data: { email, password: '' },
				errors: result.errors
			});
		}

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
				return fail(400, {
					data: {
						email,
						password: ''
					},
					errors: { email: 'User does not exist', password: '' }
				});
			}
			if (e instanceof LuciaError && e.message === 'AUTH_INVALID_PASSWORD') {
				// incorrect password
				return fail(400, {
					data: {
						email,
						password: ''
					},
					errors: { email: '', password: 'Incorrect password' }
				});
			}
			return fail(400, {
				data: {
					email,
					password: ''
				},
				errors: { email: '', password: 'Could not log you in' }
			});
		}
		throw redirect(302, '/');
	}
};
