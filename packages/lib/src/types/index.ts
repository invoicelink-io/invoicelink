import type {
  Client,
  Invoice,
  LineItem,
  Address,
  User,
  QuickLink,
  BankAccount,
} from "@prisma/client";

export type PaymentGateways = "payfast" | "yoco" | "stripe";

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
