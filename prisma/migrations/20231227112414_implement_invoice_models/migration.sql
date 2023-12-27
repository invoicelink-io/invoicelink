-- AlterTable
ALTER TABLE "User" ADD COLUMN     "vatNumber" TEXT;

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "tax" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "serial" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "sendersAddressId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "yocoCheckoutId" TEXT,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LineItem" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "LineItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "vatNumber" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "addressId" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceStyles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "baseFontSize" TEXT NOT NULL,
    "baseSpacing" TEXT NOT NULL,
    "baseDivider" TEXT NOT NULL,
    "baseDividerColor" TEXT NOT NULL,
    "issueDateAlign" TEXT NOT NULL,
    "senderAddressAlign" TEXT NOT NULL,
    "recipientAddressAlign" TEXT NOT NULL,
    "invoiceType" TEXT NOT NULL,
    "invoiceTypeFontSize" TEXT NOT NULL,
    "invoiceTypeColor" TEXT NOT NULL,
    "invoiceTypeCasing" TEXT NOT NULL,
    "columnHeadingSize" TEXT NOT NULL,
    "columnHeadingColor" TEXT NOT NULL,
    "columnHeadingCasing" TEXT NOT NULL,
    "columnHeadingDivider" TEXT NOT NULL,
    "columnHeadingDividerColor" TEXT NOT NULL,
    "lineItemDivider" TEXT NOT NULL,
    "lineItemDividerColor" TEXT NOT NULL,
    "logoAlt" TEXT NOT NULL,
    "logoSrc" TEXT,

    CONSTRAINT "InvoiceStyles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_id_key" ON "Invoice"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_yocoCheckoutId_key" ON "Invoice"("yocoCheckoutId");

-- CreateIndex
CREATE UNIQUE INDEX "LineItem_id_key" ON "LineItem"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Client_id_key" ON "Client"("id");

-- CreateIndex
CREATE UNIQUE INDEX "InvoiceStyles_id_key" ON "InvoiceStyles"("id");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_sendersAddressId_fkey" FOREIGN KEY ("sendersAddressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineItem" ADD CONSTRAINT "LineItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceStyles" ADD CONSTRAINT "InvoiceStyles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
