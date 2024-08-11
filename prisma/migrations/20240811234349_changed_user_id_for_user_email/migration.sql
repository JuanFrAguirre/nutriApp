/*
  Warnings:

  - You are about to drop the column `userId` on the `CalendarEntry` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Dish` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Dish_Product` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Entry_Dish` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `CalendarEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Dish` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Dish_Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Entry_Dish` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CalendarEntry" DROP CONSTRAINT "CalendarEntry_userId_fkey";

-- DropForeignKey
ALTER TABLE "Dish" DROP CONSTRAINT "Dish_userId_fkey";

-- DropForeignKey
ALTER TABLE "Dish_Product" DROP CONSTRAINT "Dish_Product_userId_fkey";

-- DropForeignKey
ALTER TABLE "Entry_Dish" DROP CONSTRAINT "Entry_Dish_userId_fkey";

-- AlterTable
ALTER TABLE "CalendarEntry" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Dish" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Dish_Product" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Entry_Dish" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Dish_Product" ADD CONSTRAINT "Dish_Product_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry_Dish" ADD CONSTRAINT "Entry_Dish_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarEntry" ADD CONSTRAINT "CalendarEntry_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
