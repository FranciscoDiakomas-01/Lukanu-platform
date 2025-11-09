/*
  Warnings:

  - You are about to drop the column `amount` on the `Purschase` table. All the data in the column will be lost.
  - Added the required column `digital` to the `Purschase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Purschase" DROP COLUMN "amount",
ADD COLUMN     "digital" BOOLEAN NOT NULL,
ALTER COLUMN "buyerId" DROP NOT NULL;
