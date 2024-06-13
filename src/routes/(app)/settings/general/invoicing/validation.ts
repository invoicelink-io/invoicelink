import { z } from 'zod';

export const addressSchema = z.object({
	id: z.string(),
	line1: z.string(),
	line2: z.string().nullable(),
	line3: z.string().nullable(),
	postalCode: z.string()
});

export const bankSchema = z.object({
	id: z.string(),
	accountHolder: z.string(),
	accountNo: z.string(),
	accountType: z.string(),
	bankName: z.string(),
	branchCode: z.string()
});
