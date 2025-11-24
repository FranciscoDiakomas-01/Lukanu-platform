-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('ADMIN', 'REGULAR');

-- CreateEnum
CREATE TYPE "PAYSTATUS" AS ENUM ('PAID', 'CANCELED', 'PENDING', 'REJECTED');

-- CreateEnum
CREATE TYPE "LEVEL" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('ACTIVED', 'DESACTIVED', 'PENDING');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profileUrl" TEXT DEFAULT 'https://github.com/shadcn.png',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "iban" TEXT,
    "bank" TEXT,
    "role" "ROLE" NOT NULL DEFAULT 'REGULAR',
    "status" "STATUS" NOT NULL DEFAULT 'ACTIVED',
    "totalErned" INTEGER NOT NULL DEFAULT 0,
    "totalAvaliable" INTEGER NOT NULL DEFAULT 0,
    "totalTaked" INTEGER NOT NULL DEFAULT 0,
    "totalCourses" INTEGER NOT NULL DEFAULT 0,
    "totalBooks" INTEGER NOT NULL DEFAULT 0,
    "totalPendingPurchase" INTEGER NOT NULL DEFAULT 0,
    "totalActiveCourses" INTEGER NOT NULL DEFAULT 0,
    "totalDesactivedCourses" INTEGER NOT NULL DEFAULT 0,
    "totalUnreadNotification" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "videoURl" TEXT,
    "category" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "level" "LEVEL" NOT NULL,
    "formLink" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "totalLessons" INTEGER NOT NULL DEFAULT 0,
    "totalStudents" INTEGER NOT NULL DEFAULT 0,
    "status" "STATUS" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "videoURl" TEXT NOT NULL,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "STATUS" NOT NULL DEFAULT 'PENDING',
    "amount" INTEGER NOT NULL,
    "file" TEXT NOT NULL,
    "expiredAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ebook" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "coverUrl" TEXT,
    "fileURl" TEXT NOT NULL,
    "checkoutURL" TEXT NOT NULL,
    "metaData" JSONB,
    "currentPrice" INTEGER NOT NULL,
    "oldProce" INTEGER NOT NULL DEFAULT 0,
    "isShared" BOOLEAN NOT NULL DEFAULT false,
    "isDigital" BOOLEAN NOT NULL DEFAULT true,
    "sharePercent" INTEGER NOT NULL DEFAULT 0,
    "language" TEXT NOT NULL DEFAULT 'pt',
    "rating" INTEGER NOT NULL DEFAULT 0,
    "views" INTEGER NOT NULL DEFAULT 0,
    "purshases" INTEGER NOT NULL DEFAULT 0,
    "pages" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "edition" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Ebook_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "Purschase" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "buyerId" INTEGER,
    "ebookId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "payed" INTEGER NOT NULL,
    "afiliationCode" TEXT,
    "description" TEXT,
    "fileUrl" TEXT NOT NULL,
    "client" JSONB,
    "digital" BOOLEAN NOT NULL,
    "status" "PAYSTATUS" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Purschase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "deepLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Withdral" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "file" TEXT,
    "status" "STATUS" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Withdral_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_iban_key" ON "User"("iban");

-- CreateIndex
CREATE UNIQUE INDEX "Course_title_level_ownerId_key" ON "Course"("title", "level", "ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "Ebook_code_key" ON "Ebook"("code");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ebook" ADD CONSTRAINT "Ebook_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Afiliations" ADD CONSTRAINT "Afiliations_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Ebook"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Afiliations" ADD CONSTRAINT "Afiliations_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purschase" ADD CONSTRAINT "Purschase_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purschase" ADD CONSTRAINT "Purschase_ebookId_fkey" FOREIGN KEY ("ebookId") REFERENCES "Ebook"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Withdral" ADD CONSTRAINT "Withdral_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
