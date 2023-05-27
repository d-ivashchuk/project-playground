-- AlterTable
ALTER TABLE "EmailIntegration" ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SlackIntegration" ALTER COLUMN "webhookUrl" DROP NOT NULL,
ALTER COLUMN "channel" DROP NOT NULL;
