-- CreateTable
CREATE TABLE "DeviceCode" (
    "deviceCode" TEXT NOT NULL,
    "userCode" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresIn" INTEGER NOT NULL,
    "expired" BOOLEAN NOT NULL DEFAULT false,
    "used" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "DeviceCode_deviceCode_key" ON "DeviceCode"("deviceCode");
