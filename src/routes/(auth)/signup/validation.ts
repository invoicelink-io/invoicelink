import { z } from 'zod';

export const registerSchema = z
	.object({
		name: z
			.string({ required_error: 'Required' })
			.min(1, { message: 'Required' })
			.max(64, { message: 'Name must be less than 64 characters' })
			.trim(),
		email: z
			.string({ required_error: 'Email is required' })
			.min(1, { message: 'Email is required' })
			.max(64, { message: 'Email must be less than 64 characters' })
			.email({ message: 'Email must be a valid email address' }),
		password: z
			.string({ required_error: 'Password is required' })
			.min(6, { message: '6 or more characters required' })
			.max(32, { message: '32 character max exceeded' })
			.trim(),
		passwordConfirm: z
			.string({ required_error: 'Password is required' })
			.min(6, { message: '6 or more characters required' })
			.max(32, { message: '32 character max exceeded' })
			.trim()
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Password fields must match',
				path: ['passwordConfirm']
			});
		}
	});

export function validateSignupForm(data: signupFormData): null | {
	data: signupFormData;
	errors: signupFormData;
} {
	try {
		registerSchema.parse(data);
		return null;
	} catch (err: any) {
		const { fieldErrors: errors } = err.flatten();
		const { password, passwordConfirm, ...rest } = data;

		// extract the first error message for each field
		for (const field in errors) {
			errors[field] = errors[field][0];
		}

		return {
			data: { ...rest, password: '', passwordConfirm: '' },
			errors
		};
	}
}

type signupFormData = {
	name: string;
	email: string;
	password: string;
	passwordConfirm: string;
};
