import { z } from 'zod';

export const schema = z.object({
	id: z.string().optional(),
	// Max amount capped abridged invoice limit
	amount: z.number().min(50).max(5_000).default(100),
	serial: z.string(),
	description: z.string().max(100).optional()
});

export const deleteSchema = z.object({
	id: z.string()
});
