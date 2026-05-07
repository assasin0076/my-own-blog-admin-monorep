/*
  Warnings:

  - Added the required column `authorId` to the `Stuff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stuff" ADD COLUMN     "authorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Stuff" ADD CONSTRAINT "Stuff_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
