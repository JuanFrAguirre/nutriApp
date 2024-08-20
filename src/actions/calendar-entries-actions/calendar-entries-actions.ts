'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export const getCalendarEntries = async () => {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error('User data not registered');
    }
    const entries = await prisma.calendarEntry.findMany({
      where: { userEmail: session?.user?.email! },
      include: {
        Entry_Dish: {
          include: {
            Dish: { include: { Dish_Product: { include: { product: true } } } },
          },
        },
      },
    });
    return entries;
  } catch (error) {
    console.error({ error });
    return [];
  }
};

export const createCalendarEntryFromProduct = async (
  productId: string,
  date: string,
  quantity: number,
) => {
  const session = await auth();

  try {
    let product = await prisma.product.findFirst({ where: { id: productId } });
    if (!product) throw new Error('product not found');
    let dish = await prisma.dish.create({
      data: {
        title: product.title!,
        userEmail: session?.user?.email!,
        isProduct: true,
      },
    });
    let dishProduct = await prisma.dish_Product.create({
      data: {
        productId,
        userEmail: session?.user?.email!,
        unitType: 'relative',
        portionWeight: product?.presentationSize!,
        dishId: dish.id,
      },
    });

    await createCalendarEntry(dish.id, date, quantity);
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'Failed to create Calendar Entry with a product selected',
      error,
    };
  }
};

export const createCalendarEntry = async (
  dishId: string,
  date: string,
  quantity: number,
) => {
  const session = await auth();
  const userEmail = session?.user?.email!;

  try {
    let entry = await prisma.calendarEntry.findFirst({
      where: { date: new Date(date) },
    });
    let entryId = '';

    if (!entry) {
      const newEntry = await prisma.calendarEntry.create({
        data: { date: new Date(date), userEmail },
      });

      entryId = newEntry.id;
    } else {
      entryId = entry.id;
    }

    let entryDish = await prisma.entry_Dish.findFirst({ where: { dishId } });

    if (!entryDish) {
      await prisma.entry_Dish.create({
        data: {
          dishId,
          userEmail,
          quantity: Number(quantity),
          calendarEntryId: entryId,
        },
      });

      return { ok: true, message: 'EntryDish created successfully', entry };
    }

    let { id, quantity: existingQuantity } = entryDish;

    await prisma.entry_Dish.update({
      data: {
        ...entryDish,
        quantity: Number(existingQuantity) + Number(quantity),
      },
      where: { id },
    });

    return { ok: true, message: 'EntryDish updated successfully' };
  } catch (error) {
    console.error({ error });
    return { ok: false, message: 'Error creating Calendar Entry', error };
  }
};

export const deleteCalendarEntry = async (id: string) => {
  try {
    await prisma.entry_Dish.deleteMany({ where: { calendarEntryId: id } });
    await prisma.calendarEntry.delete({ where: { id } });

    return { ok: true, message: 'Entry deleted successfully' };
  } catch (error) {
    console.error({ error });
    return { ok: false, message: 'Error deleting Calendar Entry', error };
  }
};

export const deleteEntryDish = async (id: string) => {
  try {
    let entryDish = await prisma.entry_Dish.findFirst({ where: { id } });
    if (!entryDish) {
      return {
        ok: false,
        message: 'No EntryDish with that ID found',
      };
    }

    await prisma.entry_Dish.delete({ where: { id } });

    return { ok: true, message: 'EntryDish deleted successfully' };
  } catch (error) {
    console.error(error);
    return { ok: false, message: 'Error deleting EntryDish' };
  }
};

export const modifyEntryDishQuantity = async (id: string, quantity: number) => {
  try {
    let entryDish = await prisma.entry_Dish.findFirst({ where: { id } });
    if (!entryDish)
      return {
        ok: false,
        message: 'No EntryDish with that ID found',
      };
    await prisma.entry_Dish.update({
      where: { id },
      data: { quantity: { increment: quantity } },
    });
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: `Error modifying EntryDish's quantity`,
    };
  }
};
