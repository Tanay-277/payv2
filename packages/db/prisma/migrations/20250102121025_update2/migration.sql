/*
  Warnings:

  - The values [Processing] on the enum `OnRampStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OnRampStatus_new" AS ENUM ('Success', 'Failure', 'Pending');
ALTER TABLE "OnRampTransaction" ALTER COLUMN "status" TYPE "OnRampStatus_new" USING ("status"::text::"OnRampStatus_new");
ALTER TYPE "OnRampStatus" RENAME TO "OnRampStatus_old";
ALTER TYPE "OnRampStatus_new" RENAME TO "OnRampStatus";
DROP TYPE "OnRampStatus_old";
COMMIT;

-- CreateTable
CREATE TABLE "P2PTransaction" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "P2PTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "P2PTransaction_senderId_idx" ON "P2PTransaction"("senderId");

-- CreateIndex
CREATE INDEX "P2PTransaction_receiverId_idx" ON "P2PTransaction"("receiverId");

-- CreateIndex
CREATE INDEX "Merchant_email_idx" ON "Merchant"("email");

-- CreateIndex
CREATE INDEX "OnRampTransaction_userId_idx" ON "OnRampTransaction"("userId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_number_idx" ON "User"("number");

-- AddForeignKey
ALTER TABLE "P2PTransaction" ADD CONSTRAINT "P2PTransaction_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "P2PTransaction" ADD CONSTRAINT "P2PTransaction_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
