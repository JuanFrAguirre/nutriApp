/*
  Warnings:

  - You are about to drop the `DishProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DishProduct_Dish` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EntryDish` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DishProduct" DROP CONSTRAINT "DishProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "DishProduct" DROP CONSTRAINT "DishProduct_userId_fkey";

-- DropForeignKey
ALTER TABLE "DishProduct_Dish" DROP CONSTRAINT "DishProduct_Dish_dishId_fkey";

-- DropForeignKey
ALTER TABLE "DishProduct_Dish" DROP CONSTRAINT "DishProduct_Dish_dishProductId_fkey";

-- DropForeignKey
ALTER TABLE "EntryDish" DROP CONSTRAINT "EntryDish_calendarEntryId_fkey";

-- DropForeignKey
ALTER TABLE "EntryDish" DROP CONSTRAINT "EntryDish_dishId_fkey";

-- DropForeignKey
ALTER TABLE "EntryDish" DROP CONSTRAINT "EntryDish_userId_fkey";

-- DropTable
DROP TABLE "DishProduct";

-- DropTable
DROP TABLE "DishProduct_Dish";

-- DropTable
DROP TABLE "EntryDish";

-- CreateTable
CREATE TABLE "Dish_Product" (
    "id" TEXT NOT NULL,
    "unitType" "UnitType" NOT NULL,
    "portionWeight" DOUBLE PRECISION NOT NULL,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dishId" TEXT NOT NULL,

    CONSTRAINT "Dish_Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entry_Dish" (
    "id" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dishId" TEXT NOT NULL,
    "calendarEntryId" TEXT NOT NULL,

    CONSTRAINT "Entry_Dish_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Dish_Product" ADD CONSTRAINT "Dish_Product_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dish_Product" ADD CONSTRAINT "Dish_Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dish_Product" ADD CONSTRAINT "Dish_Product_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry_Dish" ADD CONSTRAINT "Entry_Dish_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry_Dish" ADD CONSTRAINT "Entry_Dish_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry_Dish" ADD CONSTRAINT "Entry_Dish_calendarEntryId_fkey" FOREIGN KEY ("calendarEntryId") REFERENCES "CalendarEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
