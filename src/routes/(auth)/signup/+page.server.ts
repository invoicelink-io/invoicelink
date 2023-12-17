import { fail, redirect } from '@sveltejs/kit';
import { validateSignupForm } from './validation';
import type { PageServerLoad, Actions } from './$types';
import { Argon2id } from 'oslo/password';
import { prisma } from '$lib/server/prisma';

export const load = (async ({ locals }) => {
	const { session } = locals;
	if (session) {
		redirect(302, '/');
	}
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData()) as {
			name: string;
			email: string;
			password: string;
			passwordConfirm: string;
		};

		const result = validateSignupForm(formData);

		if (result) {
			// handle error then return
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
			});
		} catch (err: unknown) {
			console.error(err);

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

		redirect(302, '/login?message=Account created successfully!');
	}
};
