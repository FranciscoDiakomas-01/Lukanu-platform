/*
  Warnings:

  - Added the required column `client` to the `Purschase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Purschase" ADD COLUMN     "client" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profileUrl" SET DEFAULT 'https://github.com/shadcn.png';
