import { z } from 'zod';

// Name has a default value just to display something in the form.
export const schema = z.object({
	id: z.string().optional(),
	merchant_id: z
		.string()
		.min(8, {
			message: 'Merchant ID must be 8 characters'
		})
		.max(8, {
			message: 'Merchant ID must be 8 characters'
		}),
	merchant_key: z
		.string()
		.min(13, {
			message: 'Merchant Key must be 13 characters'
		})
		.max(13, {
			message: 'Merchant Key must be 13 characters'
		}),
	passphrase: z.string().optional()
});
