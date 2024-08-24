import { z } from 'zod';

// Name has a default value just to display something in the form.
export const schema = z.object({
	id: z.string().optional(),
	secretKey: z.string()
});
