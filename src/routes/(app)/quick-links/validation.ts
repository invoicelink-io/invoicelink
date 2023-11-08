import { z } from 'zod';

export const schema = z.object({
	id: z.string().optional(),
	// TODO: Link max to tier level
	amount: z.number().min(5).max(10_000).default(100)
});
