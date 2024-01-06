-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "invoiceStyleId" TEXT;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_invoiceStyleId_fkey" FOREIGN KEY ("invoiceStyleId") REFERENCES "InvoiceStyles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
