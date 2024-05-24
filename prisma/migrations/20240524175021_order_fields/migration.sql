/*
  Warnings:

  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_payment` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "status_payment" TEXT NOT NULL;
