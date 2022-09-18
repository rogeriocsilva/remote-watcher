/*
  Warnings:

  - You are about to drop the `DeviceCode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "DeviceCode";

-- CreateTable
CREATE TABLE "DeviceToken" (
    "deviceCode" TEXT NOT NULL,
    "userCode" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresIn" INTEGER NOT NULL,
    "expired" BOOLEAN NOT NULL DEFAULT false,
    "used" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "DeviceToken_deviceCode_key" ON "DeviceToken"("deviceCode");
