import { z } from 'zod';

export const profileSchema = z.object({
	name: z.string(),
	email: z.string()
});

export const addressSchema = z.object({
	id: z.string(),
	line1: z.string(),
	line2: z.string().nullable(),
	line3: z.string().nullable(),
	postalCode: z.string()
});
