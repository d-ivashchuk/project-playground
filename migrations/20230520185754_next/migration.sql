/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Result` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `screenshotUrl` to the `Run` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_runId_fkey";

-- AlterTable
ALTER TABLE "Run" ADD COLUMN     "diffUrl" TEXT,
ADD COLUMN     "screenshotUrl" TEXT NOT NULL;

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Result";
