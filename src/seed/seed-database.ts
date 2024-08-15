import prisma from '../lib/prisma';
import {
  seedCalendarEntries,
  seedDishes,
  seedDishProducts,
  seedEntryDishes,
  seedProducts,
} from './seed-data';

const main = async () => {
  try {
    await prisma.entry_Dish.deleteMany();
    await prisma.dish_Product.deleteMany();
    await prisma.calendarEntry.deleteMany();
    await prisma.dish.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();

    await prisma.user.create({
      data: {
        name: 'Juan Francisco Aguirre',
        email: 'juanfranciscoaguirre95@gmail.com',
      },
    });

    await prisma.product.createMany({ data: seedProducts });
    await prisma.dish.createMany({ data: seedDishes });
    await prisma.dish_Product.createMany({
      data: seedDishProducts,
    });

    await prisma.calendarEntry.createMany({
      data: seedCalendarEntries,
    });
    await prisma.entry_Dish.createMany({
      data: seedEntryDishes,
    });

    console.log('seed ok!');
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }
  await main();
})();
