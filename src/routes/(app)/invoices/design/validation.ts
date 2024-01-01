import { z } from 'zod';

export const schema = z.object({
	id: z.string(),
	userId: z.string(),
	name: z.string().min(3),
	createdAt: z.date(),
	updatedAt: z.date(),
	baseFontSize: z.string(),
	baseSpacing: z.string(),
	baseDivider: z.string(),
	baseDividerColor: z.string(),
	issueDateAlign: z.string(),
	senderAddressAlign: z.string(),
	recipientAddressAlign: z.string(),
	invoiceType: z.string(),
	invoiceTypeFontSize: z.string(),
	invoiceTypeColor: z.string(),
	invoiceTypeCasing: z.string(),
	columnHeadingSize: z.string(),
	columnHeadingColor: z.string(),
	columnHeadingCasing: z.string(),
	columnHeadingDivider: z.string(),
	columnHeadingDividerColor: z.string(),
	lineItemDivider: z.string(),
	lineItemDividerColor: z.string(),
	logoSrc: z.string().nullable(),
	logoAlt: z.string()
});
