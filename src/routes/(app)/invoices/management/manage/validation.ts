import { z } from 'zod';
import { StatusSchema } from '$lib/zod';

export const schema = z.object({
	id: z.string(),
	issueDate: z.date(),
	dueDate: z.date().nullable(),
	description: z.string().nullable(),
	status: StatusSchema,
	userId: z.string(),
	subtotal: z.number(),
	tax: z.number(),
	total: z.number(),
	serial: z.string(),
	sendersAddressId: z.string(),
	clientId: z.string(),
	yocoCheckoutId: z.string().nullable(),
	invoiceStyleId: z.string().nullable()
});
