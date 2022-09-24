/*
  Warnings:

  - You are about to drop the column `used` on the `DeviceToken` table. All the data in the column will be lost.
  - Added the required column `userId` to the `DeviceToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DeviceToken" DROP COLUMN "used",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "DeviceToken" ADD CONSTRAINT "DeviceToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
