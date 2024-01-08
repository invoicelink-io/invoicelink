import type {
	Client,
	Invoice,
	LineItem,
	Address,
	User,
	QuickLink,
	BankAccount
} from '@prisma/client';

// place files you want to import through the `$lib` alias in this folder.
export type PaymentGateways = 'payfast' | 'paypal' | 'yoco';

export type UserWithBankAccount = User & {
	bankAccount: BankAccount[];
};

export type ClientWithAddress = Client & {
	address: Address;
};

export type FullInvoice = Invoice & {
	user: UserWithBankAccount;
	sendersAddress: Address;
	client: ClientWithAddress;
	lineItems: LineItem[];
};

export type FullQuickLink = QuickLink & {
	user: UserWithBankAccount;
	sendersAddress: Address;
};
