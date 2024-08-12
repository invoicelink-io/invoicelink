/*
  Warnings:

  - A unique constraint covering the columns `[stripeCheckoutId]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripeCheckoutId]` on the table `QuickLink` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "stripeCheckoutId" TEXT;

-- AlterTable
ALTER TABLE "QuickLink" ADD COLUMN     "stripeCheckoutId" TEXT;

-- AlterTable
ALTER TABLE "Stripe" ADD COLUMN     "webhookSecret" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_stripeCheckoutId_key" ON "Invoice"("stripeCheckoutId");

-- CreateIndex
CREATE UNIQUE INDEX "QuickLink_stripeCheckoutId_key" ON "QuickLink"("stripeCheckoutId");
