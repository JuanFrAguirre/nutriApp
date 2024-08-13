'use server';

import { DishProduct } from '@/interfaces/interfaces';
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

export const getProductById = async (id: string) => {
  try {
    const product = await prisma.product.findFirst({ where: { id } });

    return product as DishProduct;
  } catch (error) {
    console.error(error);
    return {} as DishProduct;
  }
};

export const deleteProductById = async (id: string) => {
  try {
    await prisma.product.delete({ where: { id } });

    return { ok: true, message: 'Product deleted successfully' };
  } catch (error) {
    console.error(error);
    return { ok: false, message: 'Error deleting product' };
  }
};

export const postProduct = async (product: DishProduct) => {
  try {
    const newProduct = await prisma.product.create({ data: product });

    return {
      ok: true,
      data: newProduct,
      message: 'Product created successfully',
    };
  } catch (error) {
    console.error(error);
    return { ok: false, message: 'Error creating a product' };
  }
};

export const editProduct = async (product: DishProduct) => {
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: product.id },
      data: product,
    });

    return {
      ok: true,
      data: updatedProduct,
      message: 'Product created successfully',
    };
  } catch (error) {
    console.error(error);
    return { ok: false, message: 'Error updating the product' };
  }
};
