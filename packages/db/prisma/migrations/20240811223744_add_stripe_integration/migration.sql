-- CreateTable
CREATE TABLE "Stripe" (
    "id" TEXT NOT NULL,
    "integrationId" TEXT NOT NULL,
    "publicKey" TEXT,
    "secretKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Stripe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stripe_id_key" ON "Stripe"("id");

-- AddForeignKey
ALTER TABLE "Stripe" ADD CONSTRAINT "Stripe_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "Integration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
