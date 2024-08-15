import { getDishes } from '@/actions';
import { Dish } from '@/dishes';
import { DishWithProducts } from '@/interfaces/interfaces';
import Link from 'next/link';
import { IoMdAddCircleOutline } from 'react-icons/io';
import {
  IoAddCircle,
  IoAddCircleOutline,
  IoAddOutline,
  IoRestaurantOutline,
} from 'react-icons/io5';

export default async function DishesPage() {
  const dishes = await getDishes();

  const twoCols = () => {
    const cols: { first: DishWithProducts[]; second: DishWithProducts[] } = {
      first: [],
      second: [],
    };
    dishes.forEach((item, i) => {
      if (i % 2 === 0) cols.first.push(item);
      if (i % 2 === 1) cols.second.push(item);
    });
    return cols;
  };
  const threeCols = () => {
    const cols: {
      first: DishWithProducts[];
      second: DishWithProducts[];
      third: DishWithProducts[];
    } = {
      first: [],
      second: [],
      third: [],
    };
    dishes.forEach((item, i) => {
      if (i % 3 === 0) cols.first.push(item);
      if (i % 3 === 1) cols.second.push(item);
      if (i % 3 === 2) cols.third.push(item);
    });
    return cols;
  };
  const fourCols = () => {
    const cols: {
      first: DishWithProducts[];
      second: DishWithProducts[];
      third: DishWithProducts[];
      fourth: DishWithProducts[];
    } = {
      first: [],
      second: [],
      third: [],
      fourth: [],
    };
    dishes.forEach((item, i) => {
      if (i % 4 === 0) cols.first.push(item);
      if (i % 4 === 1) cols.second.push(item);
      if (i % 4 === 2) cols.third.push(item);
      if (i % 4 === 3) cols.fourth.push(item);
    });
    return cols;
  };

  return (
    <main className="flex grow justify-center items-center flex-col gap-10 mb-32 mt-10 max-w-7xl mx-auto relative">
      {/* <Link
        className="absolute top-0 right-0 btn-primary p-2"
        href={'/products'}
      >
        <IoAddCircleOutline size={35} />
      </Link> */}
      <Link
        href={'/products'}
        className="fixed flex items-center justify-center p-2 rounded-full shadow shadow-green-700/75 bottom-24 md:hidden right-[18px] btn-primary z-90 fade-in transition-all border border-green-600"
      >
        <IoRestaurantOutline size={30} />
        <IoAddOutline
          size={20}
          className="-top-1.5 -right-1.5 bg-red-500 absolute rounded-full"
        />
      </Link>
      <h1 className="text-3xl font-semibold text-secondary">
        Tus comidas guardadas
      </h1>
      {/* OLD */}
      {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 justify-between max-w-7xl max-sm:px-2 px-4 w-full">
        {dishes.map((dish) => (
          <Dish key={dish.id} dish={dish} className="" />
          ))}
          </div> */}

      {/* SM */}
      <div className="grid grid-cols-2 sm:hidden px-2 w-full gap-4 items-start">
        <div className="grid gap-4 items-start">
          {twoCols().first.map((dish) => (
            <Dish key={dish.id} dish={dish} />
          ))}
        </div>
        <div className="grid gap-4 items-start">
          {twoCols().second.map((dish) => (
            <Dish key={dish.id} dish={dish} />
          ))}
        </div>
      </div>

      {/* MD */}
      <div className="grid grid-cols-3 max-sm:hidden md:hidden px-2 w-full gap-4 items-start">
        <div className="grid gap-4 items-start">
          {threeCols().first.map((dish) => (
            <Dish key={dish.id} dish={dish} />
          ))}
        </div>
        <div className="grid gap-4 items-start">
          {threeCols().second.map((dish) => (
            <Dish key={dish.id} dish={dish} />
          ))}
        </div>
        <div className="grid gap-4 items-start">
          {threeCols().third.map((dish) => (
            <Dish key={dish.id} dish={dish} />
          ))}
        </div>
      </div>

      {/* LG */}
      <div className="grid grid-cols-4 max-md:hidden px-2 w-full gap-4 items-start">
        <div className="grid gap-4 items-start">
          {fourCols().first.map((dish) => (
            <Dish key={dish.id} dish={dish} />
          ))}
        </div>
        <div className="grid gap-4 items-start">
          {fourCols().second.map((dish) => (
            <Dish key={dish.id} dish={dish} />
          ))}
        </div>
        <div className="grid gap-4 items-start">
          {fourCols().third.map((dish) => (
            <Dish key={dish.id} dish={dish} />
          ))}
        </div>
        <div className="grid gap-4 items-start">
          {fourCols().fourth.map((dish) => (
            <Dish key={dish.id} dish={dish} />
          ))}
        </div>
      </div>

      <div className="grow"></div>
    </main>
  );
}
