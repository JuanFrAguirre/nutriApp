import prisma from '../lib/prisma';
import { seedProducts } from './seed-data';

const main = async () => {
  try {
    await prisma.user.deleteMany();
    await prisma.product.deleteMany();

    await prisma.user.create({
      data: {
        name: 'Juan Francisco Aguirre',
        email: 'juanfranciscoaguirre95@gmail.com',
      },
    });

    await prisma.product.createMany({ data: seedProducts });

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
