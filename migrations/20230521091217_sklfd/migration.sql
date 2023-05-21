/*
  Warnings:

  - The primary key for the `Run` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Run" DROP CONSTRAINT "Run_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Run_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Run_id_seq";
