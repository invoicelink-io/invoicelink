import { z } from 'zod';
import { NODE_ENV } from '$env/static/private';

const publicKeyStartsWith = NODE_ENV === 'development' ? 'pk_' : 'pk_live_';
const secretKeyStartsWith = NODE_ENV === 'development' ? 'sk_' : 'sk_live_';

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
