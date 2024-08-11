/*
  Warnings:

  - The `unitType` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "unitType",
ADD COLUMN     "unitType" TEXT NOT NULL DEFAULT 'relative';
