'use server';

import { DishProduct, Product } from '@/interfaces/interfaces';
import prisma from '@/lib/prisma';

export const getProducts = async () => {
  try {
    const products = await prisma.product.findMany({});

    return products as DishProduct[];
  } catch (error) {
    console.error(error);
    return [];
  }
};
