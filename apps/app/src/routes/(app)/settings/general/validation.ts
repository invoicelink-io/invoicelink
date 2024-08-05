import { z } from 'zod';

export const profileSchema = z.object({
	name: z.string(),
	email: z.string().email()
});
