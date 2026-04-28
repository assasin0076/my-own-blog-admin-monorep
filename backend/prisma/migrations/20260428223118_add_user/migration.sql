/*
  Warnings:

  - You are about to drop the column `randomField` on the `Stuff` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Stuff" DROP COLUMN "randomField";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nick" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nick_key" ON "User"("nick");
