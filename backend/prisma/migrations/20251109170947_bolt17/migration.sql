/*
  Warnings:

  - Added the required column `description` to the `Purschase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payed` to the `Purschase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Purschase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Purschase" ADD COLUMN     "afiliationCode" TEXT,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "payed" INTEGER NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL;
