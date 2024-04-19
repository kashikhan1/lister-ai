/*
  Warnings:

  - You are about to drop the column `PasswordResetTokenExpiry` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Article_title_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "PasswordResetTokenExpiry",
ADD COLUMN     "passwordResetTokenExpiry" TIMESTAMP(3);
