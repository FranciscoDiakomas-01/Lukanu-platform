/*
  Warnings:

  - Made the column `authorId` on table `Ebook` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Ebook" DROP CONSTRAINT "Ebook_authorId_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Ebook" ALTER COLUMN "authorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Ebook" ADD CONSTRAINT "Ebook_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
