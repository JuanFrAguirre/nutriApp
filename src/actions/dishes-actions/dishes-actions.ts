'use server';
import { auth } from '@/auth';
import { DishProduct, DishWithProducts } from '@/interfaces/interfaces';
import prisma from '@/lib/prisma';

export const getDishes = async () => {
  const session = await auth();

  try {
    const dishes = await prisma.dish.findMany({
      include: { Dish_Product: { include: { product: true } } },
      where: { userEmail: session?.user?.email!, isProduct: false },
    });
    return dishes;
  } catch (error) {
    console.error({ error });
    return [];
  }
};

export const getDishById = async (dishId: string) => {
  try {
    const dish = await prisma.dish.findFirst({
      where: { id: dishId },
      include: { Dish_Product: { include: { product: true } } },
    });

    return dish;
  } catch (error) {
    console.error({ error });
    return {} as DishWithProducts;
  }
};

export const deleteDishById = async (dishId: string) => {
  try {
    await prisma.dish_Product.deleteMany({ where: { dishId } });
    await prisma.dish.delete({ where: { id: dishId } });

    return { ok: true, message: 'Dish deleted successfully' };
  } catch (error) {
    console.error({ error });
    return { ok: false, message: 'Error deleting this dish' };
  }
};

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
    console.error({ error });
    return { ok: false, message: 'There was an error creating the dish' };
  }
};

export const editDish = async () => {};
