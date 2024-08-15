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

export const createCalendarEntry = async (
  dishId: string,
  date: string,
  userEmail: string,
  quantity?: number,
) => {
  try {
    const entry = await prisma.calendarEntry.create({
      data: { date, userEmail },
    });

    const dishEntry = await prisma.entry_Dish.create({
      data: {
        dishId,
        userEmail,
        quantity: quantity ?? 1,
        calendarEntryId: entry.id,
      },
    });

    return { ok: true, message: 'Entry created successfully', entry };
  } catch (error) {
    console.error({ error });
    return { ok: false, message: 'Error creating Calendar Entry', error };
  }
};
