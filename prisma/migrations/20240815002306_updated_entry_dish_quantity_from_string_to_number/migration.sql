/*
  Warnings:

  - Changed the type of `quantity` on the `Entry_Dish` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Entry_Dish" DROP COLUMN "quantity",
ADD COLUMN     "quantity" INTEGER NOT NULL;
