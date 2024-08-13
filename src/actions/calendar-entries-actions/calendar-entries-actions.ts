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
      include: { Entry_Dish: { include: { Dish: true } } },
    });
    return entries;
  } catch (error) {
    console.error(error);
    return [];
  }
};
