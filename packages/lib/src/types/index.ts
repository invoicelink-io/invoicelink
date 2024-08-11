import type {
  Client,
  Invoice,
  LineItem,
  Address,
  User,
  QuickLink,
  BankAccount,
} from "@invoicelink/db";

export type PaymentGateways = "payfast" | "yoco";

// TODO: Fix the omit type
export type UserWithBankAccount = Omit<User, "currency"> & {
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
