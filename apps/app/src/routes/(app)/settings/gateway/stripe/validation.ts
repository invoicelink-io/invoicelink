import { z } from 'zod';

// Stripe secret key must start with 'sk_'
const secretKeyStartsWith = 'sk_';

// Name has a default value just to display something in the form.
export const schema = z.object({
	id: z.string().optional(),
	secretKey: z.string().startsWith(secretKeyStartsWith, {
		message: `Secret key must start with ${secretKeyStartsWith}`
	})
});
