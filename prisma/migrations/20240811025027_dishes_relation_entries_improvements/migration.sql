/*
  Warnings:

  - You are about to drop the `_DishToDishProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `CalendarEntry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_DishToDishProduct" DROP CONSTRAINT "_DishToDishProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_DishToDishProduct" DROP CONSTRAINT "_DishToDishProduct_B_fkey";

-- AlterTable
ALTER TABLE "CalendarEntry" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "_DishToDishProduct";

-- CreateTable
CREATE TABLE "DishProduct_Dish" (
    "id" TEXT NOT NULL,
    "dishProductId" TEXT NOT NULL,
    "dishId" TEXT NOT NULL,

    CONSTRAINT "DishProduct_Dish_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DishProduct_Dish_dishProductId_dishId_key" ON "DishProduct_Dish"("dishProductId", "dishId");

-- AddForeignKey
ALTER TABLE "DishProduct_Dish" ADD CONSTRAINT "DishProduct_Dish_dishProductId_fkey" FOREIGN KEY ("dishProductId") REFERENCES "DishProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DishProduct_Dish" ADD CONSTRAINT "DishProduct_Dish_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
