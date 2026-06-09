-- CreateEnum
CREATE TYPE "UserPermissions" AS ENUM ('BLOCK_STUFF', 'ALL');

-- AlterTable
ALTER TABLE "Stuff" ADD COLUMN     "blockedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permissions" "UserPermissions"[];
