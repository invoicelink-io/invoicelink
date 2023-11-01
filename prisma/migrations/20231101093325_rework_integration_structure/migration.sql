/*
  Warnings:

  - You are about to drop the column `active` on the `Integration` table. All the data in the column will be lost.
  - You are about to drop the column `gateway` on the `Integration` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Integration" DROP COLUMN "active",
DROP COLUMN "gateway";

-- AlterTable
ALTER TABLE "Payfast" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- DropEnum
DROP TYPE "Gateway";
