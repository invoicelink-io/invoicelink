import type {
	Client,
	Invoice,
	LineItem,
	Address,
	User,
	QuickLink,
	BankAccount,
} from '@invoicelink/db';

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

export type WelcomeStore = {
	currency: string;
	user: {
		id: string;
		name: string;
		username: string;
	};
	address: {
		line1: string;
		line2: string;
		line3: string;
		postalCode: string;
	};
	bankDetails: {
		accountHolder: string;
		accountNo: string;
		accountType: string;
		bankName: string;
		branchCode: string;
	};
};
