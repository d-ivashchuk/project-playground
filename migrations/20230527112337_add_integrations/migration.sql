-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "emailIntegrationId" TEXT,
ADD COLUMN     "slackIntegrationId" TEXT;

-- CreateTable
CREATE TABLE "SlackIntegration" (
    "id" TEXT NOT NULL,
    "webhookUrl" TEXT NOT NULL,
    "channel" TEXT NOT NULL,

    CONSTRAINT "SlackIntegration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailIntegration" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "EmailIntegration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_slackIntegrationId_fkey" FOREIGN KEY ("slackIntegrationId") REFERENCES "SlackIntegration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_emailIntegrationId_fkey" FOREIGN KEY ("emailIntegrationId") REFERENCES "EmailIntegration"("id") ON DELETE SET NULL ON UPDATE CASCADE;
