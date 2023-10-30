-- CreateEnum
CREATE TYPE "Gateway" AS ENUM ('PAYFAST');

-- CreateTable
CREATE TABLE "Integration" (
    "id" TEXT NOT NULL,
    "gateway" "Gateway" NOT NULL,
    "url" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Integration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payfast" (
    "id" TEXT NOT NULL,
    "integration_id" TEXT NOT NULL,
    "merchant_id" TEXT NOT NULL,
    "merchant_key" TEXT NOT NULL,
    "passphrase" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payfast_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Integration_id_key" ON "Integration"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Payfast_id_key" ON "Payfast"("id");

-- AddForeignKey
ALTER TABLE "Integration" ADD CONSTRAINT "Integration_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payfast" ADD CONSTRAINT "Payfast_integration_id_fkey" FOREIGN KEY ("integration_id") REFERENCES "Integration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
