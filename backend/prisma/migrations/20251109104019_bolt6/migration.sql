/*
  Warnings:

  - You are about to alter the column `currentPrice` on the `Ebook` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `oldProce` on the `Ebook` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `rating` on the `Ebook` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the column `courseId` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the `Option` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quiz` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wallet` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[code]` on the table `Ebook` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[iban]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `checkoutURL` to the `Ebook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Ebook` table without a default value. This is not possible if the table is not empty.
  - Made the column `sharePercent` on table `Ebook` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rating` on table `Ebook` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `moduleId` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Lesson" DROP CONSTRAINT "Lesson_courseId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Option" DROP CONSTRAINT "Option_questionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Question" DROP CONSTRAINT "Question_quizId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Quiz" DROP CONSTRAINT "Quiz_courseId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Wallet" DROP CONSTRAINT "Wallet_userId_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "formLink" TEXT,
ADD COLUMN     "totalModules" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Ebook" ADD COLUMN     "checkoutURL" TEXT NOT NULL,
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "isDigital" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "purshases" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "currentPrice" SET DATA TYPE INTEGER,
ALTER COLUMN "oldProce" SET DEFAULT 0,
ALTER COLUMN "oldProce" SET DATA TYPE INTEGER,
ALTER COLUMN "sharePercent" SET NOT NULL,
ALTER COLUMN "sharePercent" SET DEFAULT 0,
ALTER COLUMN "rating" SET NOT NULL,
ALTER COLUMN "rating" SET DEFAULT 0,
ALTER COLUMN "rating" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "courseId",
ADD COLUMN     "moduleId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "deepLink" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bank" TEXT,
ADD COLUMN     "iban" TEXT;

-- DropTable
DROP TABLE "public"."Option";

-- DropTable
DROP TABLE "public"."Question";

-- DropTable
DROP TABLE "public"."Quiz";

-- DropTable
DROP TABLE "public"."Wallet";

-- CreateTable
CREATE TABLE "Module" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "totalLessons" INTEGER NOT NULL DEFAULT 0,
    "order" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Afiliations" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "userid" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "purchaseCount" INTEGER NOT NULL DEFAULT 0,
    "purchases" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Afiliations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ebook_code_key" ON "Ebook"("code");

-- CreateIndex
CREATE UNIQUE INDEX "User_iban_key" ON "User"("iban");

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Afiliations" ADD CONSTRAINT "Afiliations_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Ebook"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Afiliations" ADD CONSTRAINT "Afiliations_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
