-- DropForeignKey
ALTER TABLE "Run" DROP CONSTRAINT "Run_jobId_fkey";

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "isPaused" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Run" ADD CONSTRAINT "Run_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
