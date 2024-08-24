-- CreateTable
CREATE TABLE "Coinbase" (
    "id" TEXT NOT NULL,
    "integrationId" TEXT NOT NULL,
    "publicKey" TEXT,
    "secretKey" TEXT NOT NULL,
    "webhookSecret" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Coinbase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coinbase_id_key" ON "Coinbase"("id");

-- AddForeignKey
ALTER TABLE "Coinbase" ADD CONSTRAINT "Coinbase_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "Integration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
