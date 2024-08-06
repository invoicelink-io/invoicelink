/*
  Warnings:

  - You are about to drop the column `yocoCheckout` on the `QuickLink` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[yocoCheckoutId]` on the table `QuickLink` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "QuickLink" DROP COLUMN "yocoCheckout",
ADD COLUMN     "yocoCheckoutId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "QuickLink_yocoCheckoutId_key" ON "QuickLink"("yocoCheckoutId");
