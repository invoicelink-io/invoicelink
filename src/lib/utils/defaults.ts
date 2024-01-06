import type { FullInvoice } from '$lib/types';
import type { Address, Client, InvoiceStyles, LineItem } from '@prisma/client';

export const defaultStyles = {
	id: '',
	userId: 'test',
	name: '',
	createdAt: new Date(),
	updatedAt: new Date(),
	baseFontSize: 'text-sm',
	baseSpacing: 'py-4',
	baseDivider: 'hidden',
	baseDividerColor: '#e5e7eb',
	issueDateAlign: 'text-right',
	senderAddressAlign: 'text-left',
	recipientAddressAlign: 'text-right',
	invoiceType: 'Invoice',
	invoiceTypeFontSize: 'text-lg',
	invoiceTypeColor: '#6466f1',
	invoiceTypeCasing: 'capitalize',
	columnHeadingSize: 'text-sm',
	columnHeadingColor: '#6466f1',
	columnHeadingCasing: 'capitalize',
	columnHeadingDivider: 'hidden',
	columnHeadingDividerColor: '#e5e7eb',
	lineItemDivider: 'solid',
	lineItemDividerColor: '#e5e7eb',
	logoSrc: null,
	logoAlt: 'invoicelink.io',
	previewSrc: null
} satisfies InvoiceStyles;

export const defaultLineItem = {
	id: '',
	amount: 100,
	description: 'Service rendered',
	quantity: 1,
	invoiceId: '',
	createdAt: new Date(),
	updatedAt: new Date()
} satisfies LineItem;

export const defaultInvoice = {
	id: '',
	userId: '',
	description: 'Services Rendered',
	serial: 'INV-2023-00001',
	issueDate: new Date(),
	dueDate: new Date(),
	sendersAddressId: '',
	sendersAddress: {
		id: '',
		line1: '123 Main Road',
		line2: 'Suburb',
		line3: 'City',
		postalCode: '1234',
		userId: ''
	},
	clientId: '',
	client: {
		id: '',
		name: 'Client Name',
		email: '',
		phone: '',
		userId: '',
		createdAt: new Date(),
		updatedAt: new Date(),
		vatNumber: '',
		addressId: '',
		address: {
			id: '',
			line1: '123 Street',
			line2: 'Suburb',
			line3: 'City',
			postalCode: '9876',
			userId: ''
		}
	},
	status: 'PENDING',
	user: {
		id: '',
		name: 'Sender Name',
		email: '',
		username: '',
		avatarUrl: '',
		vatNumber: '',
		bankAccount: []
	},
	yocoCheckoutId: null,
	invoiceStyleId: null,
	createdAt: new Date(),
	updatedAt: new Date(),
	lineItems: [defaultLineItem],
	subtotal: 100,
	tax: 0,
	total: 100
} satisfies FullInvoice;

export const defaultClient: Client = {
	id: '',
	name: '',
	phone: '',
	email: '',
	userId: '',
	createdAt: new Date(),
	updatedAt: new Date(),
	vatNumber: '',
	addressId: ''
};

export const defaultAddress: Address = {
	id: '',
	line1: '',
	line2: '',
	line3: '',
	postalCode: '',
	userId: ''
};
