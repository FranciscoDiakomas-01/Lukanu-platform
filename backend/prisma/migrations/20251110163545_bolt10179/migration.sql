/*
  Warnings:

  - You are about to drop the column `moduleId` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the `Module` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `courseId` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Lesson" DROP CONSTRAINT "Lesson_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Module" DROP CONSTRAINT "Module_courseId_fkey";

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "videoURl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "moduleId",
ADD COLUMN     "courseId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."Module";

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
