import { z } from 'zod';
import { dev } from '$app/environment';

const publicKeyStartsWith = dev ? 'pk_' : 'pk_live_';
const secretKeyStartsWith = dev ? 'sk_' : 'sk_live_';

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
