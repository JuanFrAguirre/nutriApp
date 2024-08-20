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
    <main className="relative flex flex-col items-center justify-center gap-10 mx-auto mt-10 mb-32 grow max-w-7xl">
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

      {!!dishes.length ? (
        <>
          {/* SM */}
          <div className="grid items-start w-full grid-cols-2 gap-4 px-2 sm:hidden">
            <div className="grid items-start gap-4">
              {twoCols().first.map((dish) => (
                <Dish key={dish.id} dish={dish} />
              ))}
            </div>
            <div className="grid items-start gap-4">
              {twoCols().second.map((dish) => (
                <Dish key={dish.id} dish={dish} />
              ))}
            </div>
          </div>

          {/* MD */}
          <div className="grid items-start w-full grid-cols-3 gap-4 px-2 max-sm:hidden md:hidden">
            <div className="grid items-start gap-4">
              {threeCols().first.map((dish) => (
                <Dish key={dish.id} dish={dish} />
              ))}
            </div>
            <div className="grid items-start gap-4">
              {threeCols().second.map((dish) => (
                <Dish key={dish.id} dish={dish} />
              ))}
            </div>
            <div className="grid items-start gap-4">
              {threeCols().third.map((dish) => (
                <Dish key={dish.id} dish={dish} />
              ))}
            </div>
          </div>

          {/* LG */}
          <div className="grid items-start w-full grid-cols-4 gap-4 px-2 max-md:hidden">
            <div className="grid items-start gap-4">
              {fourCols().first.map((dish) => (
                <Dish key={dish.id} dish={dish} />
              ))}
            </div>
            <div className="grid items-start gap-4">
              {fourCols().second.map((dish) => (
                <Dish key={dish.id} dish={dish} />
              ))}
            </div>
            <div className="grid items-start gap-4">
              {fourCols().third.map((dish) => (
                <Dish key={dish.id} dish={dish} />
              ))}
            </div>
            <div className="grid items-start gap-4">
              {fourCols().fourth.map((dish) => (
                <Dish key={dish.id} dish={dish} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-10 p-4 grow">
          <p className="text-lg font-light text-center">
            Aún no hay comidas agregadas. Crea alguna para comenzar a trackear
            tu día a día.
          </p>
          <Link href={'/products'} className="btn">
            Crear una comida
          </Link>
        </div>
      )}

      <div className="grow"></div>
    </main>
  );
}
