import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { validateSignupForm } from './validation';
import { Argon2id } from 'oslo/password';

export const load: PageServerLoad = async ({ url, cookies }) => {
	const sessionId = cookies.get(lucia.sessionCookieName);
	if (sessionId) {
		const { session } = await lucia.validateSession(sessionId);
		if (session) {
			redirect(302, '/');
		}
	} else {
		// get query params
		const message = url.searchParams.get('message');
		return { message };
	}
};

export const actions: Actions = {
	default: async ({ request }) => {
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
			const user = await prisma.user.findUnique({
				where: {
					email
				},
				include: {
					passwords: true
				}
			});
			if (user) {
				const hashedPassword = user.passwords[0]?.hashedPassword;
				if (!hashedPassword) {
					throw new Error('AUTH_MISSING_PASSWORD');
				}
				const argon2id = new Argon2id();
				const valid = await argon2id.verify(hashedPassword, password);
				if (!valid) {
					throw new Error('AUTH_INVALID_PASSWORD');
				}

				// create session
				const session = await lucia.createSession(user.id, {});
				lucia.createSessionCookie(session.id);
			} else {
				throw new Error('AUTH_INVALID_KEY_ID');
			}
		} catch (e) {
			if (e instanceof Error && e.message === 'AUTH_INVALID_KEY_ID') {
				// invalid key
				return fail(400, {
					data: {
						email,
						password: ''
					},
					errors: { email: 'User does not exist', password: '' }
				});
			}
			if (e instanceof Error && e.message === 'AUTH_INVALID_PASSWORD') {
				// incorrect password
				return fail(400, {
					data: {
						email,
						password: ''
					},
					errors: { email: '', password: 'Incorrect password' }
				});
			}

			if (e instanceof Error && e.message === 'AUTH_MISSING_PASSWORD') {
				return fail(400, {
					data: {
						email,
						password: ''
					},
					errors: { email: '', password: 'No password login for this account.' }
				});
			}
			return fail(400, {
				data: {
					email,
					password: ''
				},
				errors: { email: 'Could not log you in', password: 'Could not log you in' }
			});
		}
		redirect(302, '/');
	}
};
