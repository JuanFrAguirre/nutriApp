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

export const createCalendarEntry = async () => {
  const session = await auth();
  const userEmail = session?.user?.email!;

  try {
    const entry = await prisma.calendarEntry.create({
      data: { date: new Date('2024-08-19'), userEmail },
    });

    await prisma.entry_Dish.create({
      data: {
        dishId: '1797f8d0-e64a-4a6e-bef8-b996a534c507',
        userEmail,
        quantity: 1,
        calendarEntryId: entry.id,
      },
    });

    return { ok: true, message: 'Entry created successfully' };
  } catch (error) {
    console.error({ error });
    return { ok: false, message: 'Error creating Calendar Entry', error };
  }
};
// export const createCalendarEntry = async (
//   dishId: string,
//   date: string,
//   quantity: number,
// ) => {
//   const session = await auth();
//   const userEmail = session?.user?.email!;

//   try {
//     const entry = await prisma.calendarEntry.create({
//       data: { date: new Date(date), userEmail },
//     });

//     await prisma.entry_Dish.create({
//       data: {
//         dishId,
//         userEmail,
//         quantity: quantity,
//         calendarEntryId: entry.id,
//       },
//     });

//     return { ok: true, message: 'Entry created successfully' };
//   } catch (error) {
//     console.error({ error });
//     return { ok: false, message: 'Error creating Calendar Entry', error };
//   }
// };
