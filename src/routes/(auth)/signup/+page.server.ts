import { fail, redirect } from '@sveltejs/kit';
import { validateSignupForm } from './validation';
import type { PageServerLoad, Actions } from './$types';
import { Argon2id } from "oslo/password";
import { lucia } from '$lib/server/auth';

export const load = (async ({ locals }) => {
	const { session } = await locals.lucia.validate();
	if (session) {
		throw redirect(302, '/');
	}
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData()) as {
			name: string;
			email: string;
			password: string;
			passwordConfirm: string;
		};

		const result = validateSignupForm(formData);

		if (result) {
			// handle error then return
			const { password, passwordConfirm, ...rest } = formData;

			return fail(500, {
				data: { ...rest, password: '', passwordConfirm: '' },
				errors: result.errors
			});
		}

		// create the user
		const { name, email, password } = formData as Record<string, string>;
		try {
			const argon2id = new Argon2id();
			const hash = await argon2id.hash(password);
			await prisma.user.create({
				data: {
					name,
					email,
					passwords: {
						create: {
							hashedPassword: hash
						}
					}
				}
			})

		} catch (err: any) {
			console.error(err);
			const { password, passwordConfirm, ...rest } = formData;
			return fail(500, {
				data: { ...rest, password: '', passwordConfirm: '' },
				errors: {
					name: '',
					email: 'Email already in use',
					password: '',
					passwordConfirm: ''
				}
			});
		}

		throw redirect(302, '/login?message=Account created successfully!');
	}
};
