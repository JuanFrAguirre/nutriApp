'use server';
import { DishProduct } from '@/interfaces/interfaces';
import prisma from '@/lib/prisma';

export const getDishes = async () => {
  try {
    const dishes = await prisma.dish.findMany({
      include: { Dish_Product: { include: { product: true } } },
      where: { userEmail: 'juanfranciscoaguirre95@gmail.com' },
    });
    return dishes;
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const getDishById = async () => {};
export const deleteDishById = async () => {};
export const createDish = async ({
  products,
  userEmail,
  title,
}: {
  products: DishProduct[];
  userEmail: string;
  title: string;
}) => {
  try {
    const dish = await prisma.dish.create({ data: { title, userEmail } });

    let dishProducts: any[] = [];
    products.forEach(async (product) => {
      const dishProduct = await prisma.dish_Product.create({
        data: {
          productId: product.id!,
          dishId: dish.id,
          userEmail,
          unitType: product.unitType!,
          portionWeight: product.portionWeight!,
        },
      });
      dishProducts.push(dishProduct);
    });

    return { ok: true, dish, dishProducts };
  } catch (error) {
    console.error(error);
    return { ok: false, message: 'There was an error creating the dish' };
  }
};
export const editDish = async () => {};
