import type { Client, Invoice, LineItem, Address, User } from '@prisma/client';

// place files you want to import through the `$lib` alias in this folder.
export type PaymentGateways = 'payfast' | 'paypal' | 'yoco';

export type FullInvoice = Invoice & {
	user: User;
	sendersAddress: Address;
	client: Client & {
		address: Address;
	};
	lineItems: LineItem[];
};
