import { z } from 'zod';

const publicKeyStartsWith = 'pk_';
const secretKeyStartsWith = 'sk_';

// Name has a default value just to display something in the form.
export const schema = z.object({
	id: z.string().optional(),
	publicKey: z.string().startsWith(publicKeyStartsWith, {
		message: `Public Key must start with ${publicKeyStartsWith}`
	}),
	secretKey: z.string().startsWith(secretKeyStartsWith, {
		message: `Secret Key must start with ${secretKeyStartsWith}`
	})
});
