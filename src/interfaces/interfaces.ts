import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
export interface Product {
  id?: string;
  title: string;
  tags?: string | null;
  image?: string | null;
  calories: number;
  proteins: number;
  carbohydrates: number;
  fats: number;
  presentationSize: number;
}

export type UnitTypes = 'relative' | 'absolute';

export interface DishProduct extends Product {
  unitType?: UnitTypes;
  portionWeight?: number;
}

export type DishProductWithProducts = Prisma.Dish_ProductGetPayload<{
  include: { product: true };
}>;

export type DishWithProducts = Prisma.DishGetPayload<{
  include: { Dish_Product: { include: { product: true } } };
}>;
