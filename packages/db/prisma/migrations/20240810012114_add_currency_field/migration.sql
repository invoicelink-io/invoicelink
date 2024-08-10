-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('EUR', 'USD', 'ZAR');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'USD';
