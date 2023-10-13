import { z } from 'zod';

export const registerSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email address' }),
	password: z.string({ required_error: 'Password is required' }).trim()
});

export function validateSignupForm(data: loginFormData): null | {
	data: loginFormData;
	errors: loginFormData;
} {
	try {
		registerSchema.parse(data);
		return null;
	} catch (err: any) {
		const { fieldErrors: errors } = err.flatten();
		const { password, ...rest } = data;

		// extract the first error message for each field
		for (const field in errors) {
			errors[field] = errors[field][0];
		}

		return {
			data: { ...rest, password: '' },
			errors
		};
	}
}

type loginFormData = {
	email: string;
	password: string;
};
