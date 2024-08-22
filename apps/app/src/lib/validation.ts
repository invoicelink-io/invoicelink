import { z } from 'zod';

export const currencyEnumSchema = z.enum(['AED', 'CAD', 'EUR', 'GBP', 'INR', 'USD', 'ZAR']);

export const currencySchema = z.object({
	id: z.string().optional(),
	currency: currencyEnumSchema
});

export const userSchema = z.object({
	id: z.string().optional(),
	name: z.string()
});

export const addressSchema = z.object({
	id: z.string().optional(),
	line1: z.string(),
	line2: z.string().nullable(),
	line3: z.string().nullable(),
	postalCode: z.coerce.string()
});

export const bankSchema = z.object({
	id: z.string().optional(),
	accountHolder: z.string(),
	accountNo: z.string(),
	accountType: z.string(),
	bankName: z.string(),
	branchCode: z.string()
});

export const clientAddressSchema = z.object({
	// client
	id: z.string(),
	name: z.string(),
	vatNumber: z.string().nullable(),
	email: z.string().nullable(),
	phone: z.string().nullable(),
	addressId: z.string(),
	// Address
	line1: z.string(),
	line2: z.string().nullable(),
	line3: z.string().nullable(),
	postalCode: z.string()
});

export const quickLinkSchema = z.object({
	id: z.string().optional(),
	// Max amount capped abridged invoice limit
	amount: z.number().min(50).max(5_000).default(100),
	serial: z.string(),
	description: z.string().max(100).optional()
});

export const deleteSchema = z.object({
	id: z.string()
});
