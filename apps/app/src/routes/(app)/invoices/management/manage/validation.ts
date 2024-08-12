import { z } from 'zod';
import { currencyEnumSchema } from '$lib/validation';
const StatusSchema = z.enum(['PENDING', 'PAID', 'EXPIRED', 'OVERDUE']);

export const schema = z.object({
	id: z.string(),
	description: z.string().nullable(),
	serial: z.string(),
	issueDate: z.date(),
	dueDate: z.date().nullable(),
	sendersAddressId: z.string(),
	sendersAddress: z.object({
		id: z.string(),
		line1: z.string(),
		line2: z.string().nullable(),
		line3: z.string().nullable(),
		postalCode: z.string(),
		userId: z.string().nullable()
	}),
	clientId: z.string(),
	client: z.object({
		id: z.string(),
		name: z.string(),
		phone: z.string().nullable(),
		email: z.string().nullable(),
		userId: z.string(),
		createdAt: z.date(),
		updatedAt: z.date(),
		vatNumber: z.string().nullable(),
		addressId: z.string(),
		address: z.object({
			id: z.string(),
			line1: z.string(),
			line2: z.string().nullable(),
			line3: z.string().nullable(),
			postalCode: z.string(),
			userId: z.string().nullable()
		})
	}),
	status: StatusSchema,
	userId: z.string(),
	user: z.object({
		id: z.string(),
		name: z.string().nullable(),
		email: z.string().nullable(),
		username: z.string().nullable(),
		avatarUrl: z.string().nullable(),
		vatNumber: z.string().nullable(),
		currency: currencyEnumSchema,
		bankAccount: z.array(
			z.object({
				id: z.string(),
				userId: z.string(),
				createdAt: z.date(),
				updatedAt: z.date(),
				accountHolder: z.string(),
				accountNo: z.string(),
				accountType: z.string(),
				bankName: z.string(),
				branchCode: z.string()
			})
		)
	}),
	yocoCheckoutId: z.string().nullable(),
	stripeCheckoutId: z.string().nullable(),
	invoiceStyleId: z.string().nullable(),
	updatedAt: z.date(),
	createdAt: z.date(),
	lineItems: z.array(
		z.object({
			id: z.string(),
			description: z.string(),
			quantity: z.number(),
			amount: z.number(),
			invoiceId: z.string(),
			createdAt: z.date(),
			updatedAt: z.date()
		})
	),
	subtotal: z.number(),
	tax: z.number(),
	taxPercentage: z.number(),
	total: z.number()
});
