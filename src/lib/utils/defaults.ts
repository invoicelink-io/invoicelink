import type { FullInvoice } from '$lib/types';
import type { Address, BankAccount, Client, InvoiceStyles, LineItem } from '@prisma/client';

export const themes = ['light', 'dark', 'black', 'cupcake', 'dracula'];

export const defaultStyles: InvoiceStyles = {
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
	bankDetailsAlign: 'text-right',
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
};

export const defaultLineItem: LineItem = {
	id: '',
	description: 'Service rendered',
	quantity: 1,
	amount: 100,
	invoiceId: '',
	createdAt: new Date(),
	updatedAt: new Date()
};

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

export const defaultBankDetails: BankAccount = {
	id: '',
	userId: '',
	bankName: 'Bank Name',
	accountHolder: 'Account Holder',
	accountNo: 'Account Number',
	accountType: 'Account Type',
	branchCode: 'Branch Code',
	createdAt: new Date(),
	updatedAt: new Date()
};

export const defaultInvoice: FullInvoice = {
	// base invoice data
	id: '',
	createdAt: new Date(),
	updatedAt: new Date(),
	issueDate: new Date(),
	dueDate: null,
	description: 'Services Rendered',
	userId: '',
	subtotal: 100,
	taxPercentage: 0,
	tax: 0,
	total: 100,
	serial: 'INV-2023-00001',
	status: 'PENDING',
	sendersAddressId: '',
	clientId: '',
	yocoCheckoutId: null,
	invoiceStyleId: null,
	// user data
	user: {
		id: '',
		name: '',
		email: '',
		username: '',
		avatarUrl: '',
		vatNumber: '',
		bankAccount: [defaultBankDetails]
	},
	sendersAddress: {
		id: '',
		line1: '',
		line2: '',
		line3: '',
		postalCode: '',
		userId: ''
	},
	client: {
		...defaultClient,
		address: defaultAddress
	},
	lineItems: [defaultLineItem]
};
