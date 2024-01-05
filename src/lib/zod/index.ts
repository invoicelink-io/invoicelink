import { z } from 'zod';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
	'ReadUncommitted',
	'ReadCommitted',
	'RepeatableRead',
	'Serializable'
]);

export const UserScalarFieldEnumSchema = z.enum([
	'id',
	'name',
	'email',
	'username',
	'avatarUrl',
	'vatNumber'
]);

export const LastUsedSerialScalarFieldEnumSchema = z.enum(['id', 'serial', 'type', 'userId']);

export const AddressScalarFieldEnumSchema = z.enum([
	'id',
	'line1',
	'line2',
	'line3',
	'postalCode',
	'userId'
]);

export const BankAccountScalarFieldEnumSchema = z.enum([
	'id',
	'userId',
	'createdAt',
	'updatedAt',
	'accountHolder',
	'accountNo',
	'accountType',
	'bankName',
	'branchCode'
]);

export const SessionScalarFieldEnumSchema = z.enum(['id', 'userId', 'expiresAt']);

export const OauthAccountScalarFieldEnumSchema = z.enum(['providerId', 'providerUserId', 'userId']);

export const PasswordScalarFieldEnumSchema = z.enum(['id', 'hashedPassword', 'userId']);

export const VerificationTokenScalarFieldEnumSchema = z.enum([
	'id',
	'type',
	'expires',
	'token',
	'userId'
]);

export const IntegrationScalarFieldEnumSchema = z.enum(['id', 'createdAt', 'updatedAt', 'userId']);

export const PayfastScalarFieldEnumSchema = z.enum([
	'id',
	'integrationId',
	'merchantId',
	'merchantKey',
	'passphrase',
	'createdAt',
	'updatedAt',
	'active'
]);

export const YocoScalarFieldEnumSchema = z.enum([
	'id',
	'integrationId',
	'publicKey',
	'secretKey',
	'webhookSecret',
	'createdAt',
	'updatedAt',
	'active'
]);

export const QuickLinkScalarFieldEnumSchema = z.enum([
	'id',
	'createdAt',
	'updatedAt',
	'userId',
	'sendersAddressId',
	'subtotal',
	'tax',
	'total',
	'serial',
	'description',
	'status',
	'yocoCheckoutId'
]);

export const InvoiceScalarFieldEnumSchema = z.enum([
	'id',
	'createdAt',
	'updatedAt',
	'issueDate',
	'dueDate',
	'description',
	'userId',
	'subtotal',
	'tax',
	'total',
	'serial',
	'status',
	'sendersAddressId',
	'clientId',
	'yocoCheckoutId'
]);

export const LineItemScalarFieldEnumSchema = z.enum([
	'id',
	'createdAt',
	'updatedAt',
	'invoiceId',
	'description',
	'quantity',
	'amount'
]);

export const ClientScalarFieldEnumSchema = z.enum([
	'id',
	'createdAt',
	'updatedAt',
	'userId',
	'name',
	'vatNumber',
	'email',
	'phone',
	'addressId'
]);

export const InvoiceStylesScalarFieldEnumSchema = z.enum([
	'id',
	'name',
	'createdAt',
	'updatedAt',
	'userId',
	'baseFontSize',
	'baseSpacing',
	'baseDivider',
	'baseDividerColor',
	'issueDateAlign',
	'senderAddressAlign',
	'recipientAddressAlign',
	'invoiceType',
	'invoiceTypeFontSize',
	'invoiceTypeColor',
	'invoiceTypeCasing',
	'columnHeadingSize',
	'columnHeadingColor',
	'columnHeadingCasing',
	'columnHeadingDivider',
	'columnHeadingDividerColor',
	'lineItemDivider',
	'lineItemDividerColor',
	'logoAlt',
	'logoSrc',
	'previewSrc'
]);

export const SortOrderSchema = z.enum(['asc', 'desc']);

export const QueryModeSchema = z.enum(['default', 'insensitive']);

export const NullsOrderSchema = z.enum(['first', 'last']);

export const SerialTypeSchema = z.enum(['QUICK_LINK', 'INVOICE']);

export type SerialTypeType = `${z.infer<typeof SerialTypeSchema>}`;

export const TokenSchema = z.enum(['EMAIL', 'PASSWORD']);

export type TokenType = `${z.infer<typeof TokenSchema>}`;

export const StatusSchema = z.enum(['PENDING', 'PAID', 'EXPIRED', 'OVERDUE']);

export type StatusType = `${z.infer<typeof StatusSchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
	id: z.string().cuid(),
	name: z.string().nullable(),
	email: z.string().nullable(),
	username: z.string().nullable(),
	avatarUrl: z.string().nullable(),
	vatNumber: z.string().nullable()
});

export type User = z.infer<typeof UserSchema>;

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
	sessions: SessionWithRelations[];
	passwords: PasswordWithRelations[];
	oauthAccounts: OauthAccountWithRelations[];
	address: AddressWithRelations[];
	verificationTokens: VerificationTokenWithRelations[];
	integrations: IntegrationWithRelations[];
	quickLinks: QuickLinkWithRelations[];
	lastUsedSerial: LastUsedSerialWithRelations[];
	invoiceStyles: InvoiceStylesWithRelations[];
	invoice: InvoiceWithRelations[];
	client: ClientWithRelations[];
	bankAccount: BankAccountWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations;

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(
	z.object({
		sessions: z.lazy(() => SessionWithRelationsSchema).array(),
		passwords: z.lazy(() => PasswordWithRelationsSchema).array(),
		oauthAccounts: z.lazy(() => OauthAccountWithRelationsSchema).array(),
		address: z.lazy(() => AddressWithRelationsSchema).array(),
		verificationTokens: z.lazy(() => VerificationTokenWithRelationsSchema).array(),
		integrations: z.lazy(() => IntegrationWithRelationsSchema).array(),
		quickLinks: z.lazy(() => QuickLinkWithRelationsSchema).array(),
		lastUsedSerial: z.lazy(() => LastUsedSerialWithRelationsSchema).array(),
		invoiceStyles: z.lazy(() => InvoiceStylesWithRelationsSchema).array(),
		invoice: z.lazy(() => InvoiceWithRelationsSchema).array(),
		client: z.lazy(() => ClientWithRelationsSchema).array(),
		bankAccount: z.lazy(() => BankAccountWithRelationsSchema).array()
	})
);

/////////////////////////////////////////
// LAST USED SERIAL SCHEMA
/////////////////////////////////////////

export const LastUsedSerialSchema = z.object({
	type: SerialTypeSchema,
	id: z.string().cuid(),
	serial: z.string(),
	userId: z.string()
});

export type LastUsedSerial = z.infer<typeof LastUsedSerialSchema>;

// LAST USED SERIAL RELATION SCHEMA
//------------------------------------------------------

export type LastUsedSerialRelations = {
	user: UserWithRelations;
};

export type LastUsedSerialWithRelations = z.infer<typeof LastUsedSerialSchema> &
	LastUsedSerialRelations;

export const LastUsedSerialWithRelationsSchema: z.ZodType<LastUsedSerialWithRelations> =
	LastUsedSerialSchema.merge(
		z.object({
			user: z.lazy(() => UserWithRelationsSchema)
		})
	);

/////////////////////////////////////////
// ADDRESS SCHEMA
/////////////////////////////////////////

export const AddressSchema = z.object({
	id: z.string().cuid(),
	line1: z.string(),
	line2: z.string().nullable(),
	line3: z.string().nullable(),
	postalCode: z.string(),
	userId: z.string().nullable()
});

export type Address = z.infer<typeof AddressSchema>;

// ADDRESS RELATION SCHEMA
//------------------------------------------------------

export type AddressRelations = {
	user?: UserWithRelations | null;
	client: ClientWithRelations[];
	invoice: InvoiceWithRelations[];
	quickLink: QuickLinkWithRelations[];
};

export type AddressWithRelations = z.infer<typeof AddressSchema> & AddressRelations;

export const AddressWithRelationsSchema: z.ZodType<AddressWithRelations> = AddressSchema.merge(
	z.object({
		user: z.lazy(() => UserWithRelationsSchema).nullable(),
		client: z.lazy(() => ClientWithRelationsSchema).array(),
		invoice: z.lazy(() => InvoiceWithRelationsSchema).array(),
		quickLink: z.lazy(() => QuickLinkWithRelationsSchema).array()
	})
);

/////////////////////////////////////////
// BANK ACCOUNT SCHEMA
/////////////////////////////////////////

export const BankAccountSchema = z.object({
	id: z.string().cuid(),
	userId: z.string(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	accountHolder: z.string(),
	accountNo: z.string(),
	accountType: z.string(),
	bankName: z.string(),
	branchCode: z.string()
});

export type BankAccount = z.infer<typeof BankAccountSchema>;

// BANK ACCOUNT RELATION SCHEMA
//------------------------------------------------------

export type BankAccountRelations = {
	user: UserWithRelations;
};

export type BankAccountWithRelations = z.infer<typeof BankAccountSchema> & BankAccountRelations;

export const BankAccountWithRelationsSchema: z.ZodType<BankAccountWithRelations> =
	BankAccountSchema.merge(
		z.object({
			user: z.lazy(() => UserWithRelationsSchema)
		})
	);

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
	id: z.string().cuid(),
	userId: z.string(),
	expiresAt: z.coerce.date()
});

export type Session = z.infer<typeof SessionSchema>;

// SESSION RELATION SCHEMA
//------------------------------------------------------

export type SessionRelations = {
	user: UserWithRelations;
};

export type SessionWithRelations = z.infer<typeof SessionSchema> & SessionRelations;

export const SessionWithRelationsSchema: z.ZodType<SessionWithRelations> = SessionSchema.merge(
	z.object({
		user: z.lazy(() => UserWithRelationsSchema)
	})
);

/////////////////////////////////////////
// OAUTH ACCOUNT SCHEMA
/////////////////////////////////////////

export const OauthAccountSchema = z.object({
	providerId: z.string(),
	providerUserId: z.string(),
	userId: z.string()
});

export type OauthAccount = z.infer<typeof OauthAccountSchema>;

// OAUTH ACCOUNT RELATION SCHEMA
//------------------------------------------------------

export type OauthAccountRelations = {
	user: UserWithRelations;
};

export type OauthAccountWithRelations = z.infer<typeof OauthAccountSchema> & OauthAccountRelations;

export const OauthAccountWithRelationsSchema: z.ZodType<OauthAccountWithRelations> =
	OauthAccountSchema.merge(
		z.object({
			user: z.lazy(() => UserWithRelationsSchema)
		})
	);

/////////////////////////////////////////
// PASSWORD SCHEMA
/////////////////////////////////////////

export const PasswordSchema = z.object({
	id: z.string().cuid(),
	hashedPassword: z.string(),
	userId: z.string()
});

export type Password = z.infer<typeof PasswordSchema>;

// PASSWORD RELATION SCHEMA
//------------------------------------------------------

export type PasswordRelations = {
	user: UserWithRelations;
};

export type PasswordWithRelations = z.infer<typeof PasswordSchema> & PasswordRelations;

export const PasswordWithRelationsSchema: z.ZodType<PasswordWithRelations> = PasswordSchema.merge(
	z.object({
		user: z.lazy(() => UserWithRelationsSchema)
	})
);

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
	type: TokenSchema,
	id: z.string().cuid(),
	expires: z.bigint(),
	token: z.string(),
	userId: z.string()
});

export type VerificationToken = z.infer<typeof VerificationTokenSchema>;

// VERIFICATION TOKEN RELATION SCHEMA
//------------------------------------------------------

export type VerificationTokenRelations = {
	user: UserWithRelations;
};

export type VerificationTokenWithRelations = z.infer<typeof VerificationTokenSchema> &
	VerificationTokenRelations;

export const VerificationTokenWithRelationsSchema: z.ZodType<VerificationTokenWithRelations> =
	VerificationTokenSchema.merge(
		z.object({
			user: z.lazy(() => UserWithRelationsSchema)
		})
	);

/////////////////////////////////////////
// INTEGRATION SCHEMA
/////////////////////////////////////////

export const IntegrationSchema = z.object({
	id: z.string().cuid(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	userId: z.string()
});

export type Integration = z.infer<typeof IntegrationSchema>;

// INTEGRATION RELATION SCHEMA
//------------------------------------------------------

export type IntegrationRelations = {
	user: UserWithRelations;
	payfast: PayfastWithRelations[];
	yoco: YocoWithRelations[];
};

export type IntegrationWithRelations = z.infer<typeof IntegrationSchema> & IntegrationRelations;

export const IntegrationWithRelationsSchema: z.ZodType<IntegrationWithRelations> =
	IntegrationSchema.merge(
		z.object({
			user: z.lazy(() => UserWithRelationsSchema),
			payfast: z.lazy(() => PayfastWithRelationsSchema).array(),
			yoco: z.lazy(() => YocoWithRelationsSchema).array()
		})
	);

/////////////////////////////////////////
// PAYFAST SCHEMA
/////////////////////////////////////////

export const PayfastSchema = z.object({
	id: z.string().cuid(),
	integrationId: z.string(),
	merchantId: z.string(),
	merchantKey: z.string(),
	passphrase: z.string().nullable(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	active: z.boolean()
});

export type Payfast = z.infer<typeof PayfastSchema>;

// PAYFAST RELATION SCHEMA
//------------------------------------------------------

export type PayfastRelations = {
	integration: IntegrationWithRelations;
};

export type PayfastWithRelations = z.infer<typeof PayfastSchema> & PayfastRelations;

export const PayfastWithRelationsSchema: z.ZodType<PayfastWithRelations> = PayfastSchema.merge(
	z.object({
		integration: z.lazy(() => IntegrationWithRelationsSchema)
	})
);

/////////////////////////////////////////
// YOCO SCHEMA
/////////////////////////////////////////

export const YocoSchema = z.object({
	id: z.string().cuid(),
	integrationId: z.string(),
	publicKey: z.string(),
	secretKey: z.string(),
	webhookSecret: z.string().nullable(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	active: z.boolean()
});

export type Yoco = z.infer<typeof YocoSchema>;

// YOCO RELATION SCHEMA
//------------------------------------------------------

export type YocoRelations = {
	integration: IntegrationWithRelations;
};

export type YocoWithRelations = z.infer<typeof YocoSchema> & YocoRelations;

export const YocoWithRelationsSchema: z.ZodType<YocoWithRelations> = YocoSchema.merge(
	z.object({
		integration: z.lazy(() => IntegrationWithRelationsSchema)
	})
);

/////////////////////////////////////////
// QUICK LINK SCHEMA
/////////////////////////////////////////

export const QuickLinkSchema = z.object({
	status: StatusSchema,
	id: z.string().cuid(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	userId: z.string(),
	sendersAddressId: z.string(),
	subtotal: z.number(),
	tax: z.number(),
	total: z.number(),
	serial: z.string(),
	description: z.string().nullable(),
	yocoCheckoutId: z.string().nullable()
});

export type QuickLink = z.infer<typeof QuickLinkSchema>;

// QUICK LINK RELATION SCHEMA
//------------------------------------------------------

export type QuickLinkRelations = {
	user: UserWithRelations;
	sendersAddress: AddressWithRelations;
};

export type QuickLinkWithRelations = z.infer<typeof QuickLinkSchema> & QuickLinkRelations;

export const QuickLinkWithRelationsSchema: z.ZodType<QuickLinkWithRelations> =
	QuickLinkSchema.merge(
		z.object({
			user: z.lazy(() => UserWithRelationsSchema),
			sendersAddress: z.lazy(() => AddressWithRelationsSchema)
		})
	);

/////////////////////////////////////////
// INVOICE SCHEMA
/////////////////////////////////////////

export const InvoiceSchema = z.object({
	status: StatusSchema,
	id: z.string().cuid(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	issueDate: z.coerce.date(),
	dueDate: z.coerce.date().nullable(),
	description: z.string().nullable(),
	userId: z.string(),
	subtotal: z.number(),
	tax: z.number(),
	total: z.number(),
	serial: z.string(),
	sendersAddressId: z.string(),
	clientId: z.string(),
	yocoCheckoutId: z.string().nullable()
});

export type Invoice = z.infer<typeof InvoiceSchema>;

// INVOICE RELATION SCHEMA
//------------------------------------------------------

export type InvoiceRelations = {
	user: UserWithRelations;
	lineItems: LineItemWithRelations[];
	sendersAddress: AddressWithRelations;
	client: ClientWithRelations;
};

export type InvoiceWithRelations = z.infer<typeof InvoiceSchema> & InvoiceRelations;

export const InvoiceWithRelationsSchema: z.ZodType<InvoiceWithRelations> = InvoiceSchema.merge(
	z.object({
		user: z.lazy(() => UserWithRelationsSchema),
		lineItems: z.lazy(() => LineItemWithRelationsSchema).array(),
		sendersAddress: z.lazy(() => AddressWithRelationsSchema),
		client: z.lazy(() => ClientWithRelationsSchema)
	})
);

/////////////////////////////////////////
// LINE ITEM SCHEMA
/////////////////////////////////////////

export const LineItemSchema = z.object({
	id: z.string().cuid(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	invoiceId: z.string(),
	description: z.string(),
	quantity: z.number().int(),
	amount: z.number()
});

export type LineItem = z.infer<typeof LineItemSchema>;

// LINE ITEM RELATION SCHEMA
//------------------------------------------------------

export type LineItemRelations = {
	invoice: InvoiceWithRelations;
};

export type LineItemWithRelations = z.infer<typeof LineItemSchema> & LineItemRelations;

export const LineItemWithRelationsSchema: z.ZodType<LineItemWithRelations> = LineItemSchema.merge(
	z.object({
		invoice: z.lazy(() => InvoiceWithRelationsSchema)
	})
);

/////////////////////////////////////////
// CLIENT SCHEMA
/////////////////////////////////////////

export const ClientSchema = z.object({
	id: z.string().cuid(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	userId: z.string(),
	name: z.string(),
	vatNumber: z.string().nullable(),
	email: z.string().nullable(),
	phone: z.string().nullable(),
	addressId: z.string()
});

export type Client = z.infer<typeof ClientSchema>;

// CLIENT RELATION SCHEMA
//------------------------------------------------------

export type ClientRelations = {
	user: UserWithRelations;
	address: AddressWithRelations;
	Invoice: InvoiceWithRelations[];
};

export type ClientWithRelations = z.infer<typeof ClientSchema> & ClientRelations;

export const ClientWithRelationsSchema: z.ZodType<ClientWithRelations> = ClientSchema.merge(
	z.object({
		user: z.lazy(() => UserWithRelationsSchema),
		address: z.lazy(() => AddressWithRelationsSchema),
		Invoice: z.lazy(() => InvoiceWithRelationsSchema).array()
	})
);

/////////////////////////////////////////
// INVOICE STYLES SCHEMA
/////////////////////////////////////////

export const InvoiceStylesSchema = z.object({
	id: z.string().cuid(),
	name: z.string(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	userId: z.string(),
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
	logoAlt: z.string(),
	logoSrc: z.string().nullable(),
	previewSrc: z.string().nullable()
});

export type InvoiceStyles = z.infer<typeof InvoiceStylesSchema>;

// INVOICE STYLES RELATION SCHEMA
//------------------------------------------------------

export type InvoiceStylesRelations = {
	user: UserWithRelations;
};

export type InvoiceStylesWithRelations = z.infer<typeof InvoiceStylesSchema> &
	InvoiceStylesRelations;

export const InvoiceStylesWithRelationsSchema: z.ZodType<InvoiceStylesWithRelations> =
	InvoiceStylesSchema.merge(
		z.object({
			user: z.lazy(() => UserWithRelationsSchema)
		})
	);
