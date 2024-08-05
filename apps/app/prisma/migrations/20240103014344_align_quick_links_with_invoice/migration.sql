/*
  Warnings:

  - You are about to drop the column `amount` on the `QuickLink` table. All the data in the column will be lost.
  - Added the required column `sendersAddressId` to the `QuickLink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `QuickLink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tax` to the `QuickLink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `QuickLink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuickLink" DROP COLUMN "amount",
ADD COLUMN     "sendersAddressId" TEXT NOT NULL,
ADD COLUMN     "subtotal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tax" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "QuickLink" ADD CONSTRAINT "QuickLink_sendersAddressId_fkey" FOREIGN KEY ("sendersAddressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
