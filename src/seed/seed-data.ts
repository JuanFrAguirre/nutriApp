import { Dish } from '@prisma/client';
import {
  DishProduct,
  DishProductDB,
  DishWithProducts,
} from '../interfaces/interfaces';

export const seedProducts: DishProduct[] = [
  {
    id: '04b3055b-00b7-4145-8a89-d0161678a066',
    title: 'Bases de pizza extrafinas',
    tags: 'bases,pizza,extrafinas,hacendado,masa',
    presentationSize: 140,
    image:
      'https://prod-mercadona.imgix.net/images/389b21fc80a59fe8b2d1c192618b45b9.jpg',
    calories: 283,
    proteins: 6.5,
    fats: 4.4,
    carbohydrates: 53.4,
  },
  {
    id: '0616f573-074a-4ddb-a670-0b8d5371d5c8',
    title: 'Mayonesa Light (1 cda.)',
    tags: 'mayonesa,light,hacendado',
    presentationSize: 15,
    image:
      'https://prod-mercadona.imgix.net/images/5e0c902d69b4c16ed124e230a9ad62fc.jpg',
    calories: 294,
    proteins: 0.7,
    fats: 31,
    carbohydrates: 6.5,
  },
  {
    id: '1315b687-5672-4fb5-b8b3-705eaba7f0ee',
    title: 'Queso rallado sin lactosa',
    tags: 'queso,rallado,hacendado,lacteos',
    presentationSize: 150,
    image:
      'https://prod-mercadona.imgix.net/images/1789e099c343b7a0eda70dd1a38a9c63.jpg',
    calories: 357,
    proteins: 24,
    fats: 29,
    carbohydrates: 0.1,
  },
  {
    id: '25eaf02e-acfa-4071-8dca-2e7ab8f1f32c',
    title: 'Huevos',
    tags: 'huevos,gallina,maple,hacendado',
    presentationSize: 60,
    image:
      'https://prod-mercadona.imgix.net/images/0bc91ebbda6db1b5da00f19c1d9dd5e5.jpg',
    calories: 150,
    proteins: 12.5,
    fats: 11.1,
    carbohydrates: 0.5,
  },
  {
    id: '2ece6a8e-dc41-467b-8321-bd345dacfb04',
    title: 'Tomate Perita',
    tags: 'tomates,verdura,vegetales',
    presentationSize: 120,
    image:
      'https://prod-mercadona.imgix.net/images/4c49ad43f84adb17d7bc8f3bd05148b9.jpg',
    calories: 22,
    proteins: 1,
    fats: 0.2,
    carbohydrates: 4.7,
  },
  {
    id: '394dd583-59d1-415a-ae88-2144b76e3513',
    title: 'Yogur griego sabor natural Auchan',
    tags: 'yogur,griego,auchan,alcampo,natural,lacteos',
    presentationSize: 125,
    image:
      'https://www.compraonline.alcampo.es/images-v3/37ea0506-72ec-4543-93c8-a77bb916ec12/58423097-e908-46ac-877e-ba7b36c41b09/1280x1280.webp',
    calories: 104,
    proteins: 3.1,
    fats: 8,
    carbohydrates: 4.2,
  },
  {
    id: '436aecf4-97a8-4c04-a7be-569ddfc16268',
    title: 'Relleno fajitas ultracongelado',
    tags: 'relleno,fajitas,pollo,cebolla,pimientos,hacendado,fajitas,mexican,texmex',
    presentationSize: 300,
    image:
      'https://prod-mercadona.imgix.net/images/616e77243843f37f7568ef21d1b4fd13.jpg',
    calories: 74,
    proteins: 8.9,
    fats: 0.8,
    carbohydrates: 7,
  },
  {
    id: '486cb674-7fad-4ec3-b58e-3274e9dd0bed',
    title: 'Maxi tortillas trigo',
    tags: 'tortillas,hacendado,maxi,wrap,burrito,mexican,texmex,trigo',
    presentationSize: 60,
    image:
      'https://prod-mercadona.imgix.net/images/9bbd7b9434f81a70eb1514d235587d1f.jpg',
    calories: 303,
    proteins: 8,
    fats: 6.4,
    carbohydrates: 51,
  },
  {
    id: '4f6c4d2b-bd8d-48c5-b031-84d47299dfcf',
    title: 'Lechuga Iceberg',
    tags: 'lechuga,hacendado,vegetales,verduras',
    presentationSize: 250,
    image:
      'https://prod-mercadona.imgix.net/images/580c669243865a140be58304751de37b.jpg',
    calories: 16,
    proteins: 0.7,
    fats: 0.6,
    carbohydrates: 1.5,
  },
  {
    id: '5159c531-2300-4a6b-acb3-28ca2f17fbfc',
    title: 'Salsa Piri Piri (1 chorrito)',
    tags: 'piri piri,salsa,picante,mexican,texmex,carrefour',
    presentationSize: 5,
    image: 'https://static.carrefour.es/hd_510x_/img_pim_food/208949_00_1.jpg',
    calories: 30,
    proteins: 0.9,
    fats: 1.4,
    carbohydrates: 2.7,
  },
  {
    id: '68face14-6f7f-49d0-b1be-07305c8b31fd',
    title: 'Chili con carne',
    tags: 'chili,carne,hacendado,mexican,texmex,picante,burrito,wrap',
    presentationSize: 420,
    image:
      'https://prod-mercadona.imgix.net/images/23f1baf002c760cb149df11895be7370.jpg',
    calories: 114,
    proteins: 8.2,
    fats: 4.7,
    carbohydrates: 7.7,
  },
  {
    id: '6d530c17-6c73-4cad-9d7b-ef23f582499f',
    title: 'Copa de chocolate con crema',
    tags: 'postre,natillas,auchan,alcampo,chocolate,crema',
    presentationSize: 115,
    image:
      'https://www.compraonline.alcampo.es/images-v3/37ea0506-72ec-4543-93c8-a77bb916ec12/34acbc9f-201a-4d02-92e1-afd6b855fc91/1280x1280.webp',
    calories: 119,
    proteins: 2.9,
    fats: 3.4,
    carbohydrates: 19,
  },
  {
    id: '7b9d9f28-7892-4762-9f5f-187ea3d73db4',
    title: 'Pollo asado troceado',
    tags: 'pollo,hacendado,listo,troceado,asado,pechugas',
    presentationSize: 1300,
    image:
      'https://prod-mercadona.imgix.net/images/740f37e56cd4957e60f947b26576dbdc.jpg',
    calories: 189,
    proteins: 19,
    fats: 12,
    carbohydrates: 0.7,
  },
  {
    id: '968880ef-150e-4e1f-9342-f0368267d64a',
    title: 'Brocoli ultracongelado',
    tags: 'brocoli,verduras,vegetales,hacendado,congelados,ultracongelados',
    presentationSize: 1000,
    image:
      'https://prod-mercadona.imgix.net/images/80c2a7b63c3d5981a3561925baa7c4ab.jpg',
    calories: 29,
    proteins: 3,
    fats: 0.4,
    carbohydrates: 1.8,
  },
  {
    id: '99bb1ba7-622a-40e5-a30a-04787ce3f8f3',
    title: 'Aceite de girasol (1 cda.)',
    tags: 'aceite,girasol,auchan,alcampo',
    presentationSize: 15,
    image:
      'https://www.compraonline.alcampo.es/images-v3/37ea0506-72ec-4543-93c8-a77bb916ec12/ecebc6e1-32e4-45c9-b020-ba3a5be26ae6/1280x1280.webp',
    calories: 900,
    proteins: 0,
    fats: 100,
    carbohydrates: 0,
  },
  {
    id: 'a6f5e955-340e-4d78-92b5-780305e7b7f7',
    title: 'Yogur griego sabor fresa',
    tags: 'yogur,griego,hacendado,fresa,lacteos',
    presentationSize: 125,
    image:
      'https://prod-mercadona.imgix.net/images/6940a5f2344e8bec96b108757e9ae369.jpg',
    calories: 139,
    proteins: 3.3,
    fats: 7.8,
    carbohydrates: 13.8,
  },
  {
    id: 'a8a48e93-83b7-450b-a2bf-9d8a11b56793',
    title: 'Arroz congelado',
    tags: 'arroz,congelados,ultracongelados,hacendado',
    presentationSize: 166.66,
    image:
      'https://prod-mercadona.imgix.net/images/53cbde8ddadb5640989b4a3a8d85e289.jpg',
    calories: 126,
    proteins: 2.7,
    fats: 0.3,
    carbohydrates: 28,
  },
  {
    id: 'ad505af7-701c-4b69-8066-2a18d709cf5a',
    title: 'Rúcula',
    tags: 'rucula,vegetales',
    presentationSize: 50,
    image:
      'https://prod-mercadona.imgix.net/images/83a2c7a099eeace37c9fd9081cfc8e76.jpg',
    calories: 26,
    proteins: 4.3,
    fats: 0.5,
    carbohydrates: 0.8,
  },
  {
    id: 'ba698db7-ab5c-443d-be07-6eab3c0df7e9',
    title: 'Nachos',
    tags: 'nachos,hacendado,texmex,mexican,burrito,picante',
    presentationSize: 150,
    image:
      'https://prod-mercadona.imgix.net/images/5ea6209ff18125614b1c278484587d91.jpg',
    calories: 481,
    proteins: 8.2,
    fats: 22,
    carbohydrates: 61,
  },
  {
    id: 'd39ffc89-a6ac-4c2c-84e6-6aa5a7d4d350',
    title: 'Bases de pizza extrafinas',
    tags: 'bases,pizza,extrafinas,hacendado',
    presentationSize: 140,
    image:
      'https://prod-mercadona.imgix.net/images/389b21fc80a59fe8b2d1c192618b45b9.jpg',
    calories: 283,
    proteins: 6.5,
    fats: 4.4,
    carbohydrates: 53.4,
  },
  {
    id: 'e4d750aa-ffe8-4c1b-aa92-bd5e952e8934',
    title: 'Tiras de pollo',
    tags: 'tiras,pollo, horno',
    presentationSize: 140,
    image:
      'https://prod-mercadona.imgix.net/images/1647014bc3f60f2064b62bd729e5b71d.jpg',
    calories: 107,
    proteins: 23.4,
    fats: 1.2,
    carbohydrates: 0.6,
  },
];

export const seedDishes = [
  {
    id: '1797f8d0-e64a-4a6e-bef8-b996a534c507',
    title: 'Arroz con tomate',
    userEmail: 'juanfranciscoaguirre95@gmail.com',
  },
  {
    id: '5fac6383-a2b9-4f45-9a0e-e9ea9e621a53',
    title: 'Arroz con pollo, verduras y huevo',
    userEmail: 'juanfranciscoaguirre95@gmail.com',
  },
];

export const seedDishProducts: DishProductDB[] = [
  {
    id: 'a65b2266-5ab0-4727-aa45-d2dfe59fc98e',
    dishId: '1797f8d0-e64a-4a6e-bef8-b996a534c507',
    portionWeight: 166.66,
    unitType: 'relative',
    productId: 'a8a48e93-83b7-450b-a2bf-9d8a11b56793',
    userEmail: 'juanfranciscoaguirre95@gmail.com',
  },
  {
    id: '69cf4542-9a05-40a5-a75a-545c0a51af3c',
    dishId: '1797f8d0-e64a-4a6e-bef8-b996a534c507',
    portionWeight: 15,
    unitType: 'relative',
    productId: '99bb1ba7-622a-40e5-a30a-04787ce3f8f3',
    userEmail: 'juanfranciscoaguirre95@gmail.com',
  },
  {
    id: 'dfc73eab-90b4-4866-86b5-d5fd1bf77777',
    dishId: '1797f8d0-e64a-4a6e-bef8-b996a534c507',
    portionWeight: 120,
    unitType: 'relative',
    productId: '2ece6a8e-dc41-467b-8321-bd345dacfb04',
    userEmail: 'juanfranciscoaguirre95@gmail.com',
  },
  {
    id: 'b09770a7-900f-4d79-886e-57645050d7a4',
    dishId: '5fac6383-a2b9-4f45-9a0e-e9ea9e621a53',
    portionWeight: 166.66,
    unitType: 'relative',
    productId: 'a8a48e93-83b7-450b-a2bf-9d8a11b56793',
    userEmail: 'juanfranciscoaguirre95@gmail.com',
  },
  {
    id: '0176c61f-cfd7-47f7-85d7-5dbb2356d22f',
    dishId: '5fac6383-a2b9-4f45-9a0e-e9ea9e621a53',
    portionWeight: 150,
    unitType: 'relative',
    productId: '436aecf4-97a8-4c04-a7be-569ddfc16268',
    userEmail: 'juanfranciscoaguirre95@gmail.com',
  },
  {
    id: '5872b6b9-6d4b-4f48-a6d5-2161e81a6b71',
    dishId: '5fac6383-a2b9-4f45-9a0e-e9ea9e621a53',
    portionWeight: 180,
    unitType: 'relative',
    productId: '25eaf02e-acfa-4071-8dca-2e7ab8f1f32c',
    userEmail: 'juanfranciscoaguirre95@gmail.com',
  },
];

export const seedCalendarEntries = [
  {
    id: 'd1856f6a-04bd-4f04-a881-f8ce31dc1cb5',
    date: '2024-08-15T17:26:07.651Z',
    userEmail: 'juanfranciscoaguirre95@gmail.com',
  },
  {
    id: 'f25b7567-7a2d-478e-8cf9-3116d6f0e4b5',
    date: '2024-08-15T18:23:07.430Z',
    userEmail: 'juanfranciscoaguirre95@gmail.com',
  },
  {
    id: '76af70bf-731c-4f10-b982-2dd58d5a0e3f',
    date: '2024-08-16T17:26:07.651Z',
    userEmail: 'juanfranciscoaguirre95@gmail.com',
  },
  {
    id: '114d0e17-b0fb-4b71-8f15-3ecd9080437d',
    date: '2024-08-14T18:23:07.430Z',
    userEmail: 'juanfranciscoaguirre95@gmail.com',
  },
];

export const seedEntryDishes = [
  {
    id: '5fdbf3b4-2c62-4b4c-a1ff-10212daea33c',
    dishId: '1797f8d0-e64a-4a6e-bef8-b996a534c507',
    calendarEntryId: 'd1856f6a-04bd-4f04-a881-f8ce31dc1cb5',
    userEmail: 'juanfranciscoaguirre95@gmail.com',
    quantity: 1,
  },
  {
    id: '14418ace-60c4-4082-a0e3-320bd065710e',
    dishId: '5fac6383-a2b9-4f45-9a0e-e9ea9e621a53',
    calendarEntryId: 'f25b7567-7a2d-478e-8cf9-3116d6f0e4b5',
    userEmail: 'juanfranciscoaguirre95@gmail.com',
    quantity: 1,
  },
  {
    id: 'a5021a78-c449-4349-969a-118631f069cd',
    dishId: '5fac6383-a2b9-4f45-9a0e-e9ea9e621a53',
    calendarEntryId: '76af70bf-731c-4f10-b982-2dd58d5a0e3f',
    userEmail: 'juanfranciscoaguirre95@gmail.com',
    quantity: 1,
  },
  {
    id: '2c7b0b3f-fe12-4a60-99f7-612cbb3e5124',
    dishId: '1797f8d0-e64a-4a6e-bef8-b996a534c507',
    calendarEntryId: '114d0e17-b0fb-4b71-8f15-3ecd9080437d',
    userEmail: 'juanfranciscoaguirre95@gmail.com',
    quantity: 1,
  },
];
