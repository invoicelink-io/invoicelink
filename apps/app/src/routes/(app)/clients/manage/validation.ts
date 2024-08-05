import { z } from 'zod';

export const schema = z.object({
	// client
	id: z.string(),
	name: z.string(),
	vatNumber: z.string().nullable(),
	email: z.string().nullable(),
	phone: z.string().nullable(),
	addressId: z.string(),
	// Address
	line1: z.string(),
	line2: z.string().nullable(),
	line3: z.string().nullable(),
	postalCode: z.string()
});
