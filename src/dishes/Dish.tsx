import { DishWithProducts } from '@/interfaces/interfaces';
import { DEFAULT_IMAGE, renderSelectedNutritionalValueFromDish } from '@/utils';
import clsx from 'clsx';
import Image from 'next/image';
import { useCallback } from 'react';
import { DishButtons } from './DishButtons';

interface Props {
  dish: DishWithProducts;
  className?: string;
}

export const Dish = ({ dish, className }: Props) => {
  return (
    <article
      className={clsx(
        className,
        'border bg-white/50 border-stone-50 shadow rounded-xl flex flex-col relative max-h-[360px] sm:max-h-[500px] md:max-h-[600px]',
      )}
      id={dish.id}
    >
      {/* Dish buttons */}
      <div className="absolute top-0 right-0">
        <DishButtons dish={dish} />
      </div>

      {/* Dish card */}
      <div className="max-sm:py-2 py-3">
        <p className="sm:text-lg text-secondary line-clamp-2 mx-2 mr-6 break-words h-12 sm:h-14">
          {dish.title}
        </p>
      </div>
      <div className="auto-rows-min grid grid-cols-2 sm:grid-cols-3 gap-2 place-items-center overflow-y-auto grow px-3 border-t border-stone-200 py-2 sm:py-3">
        {dish.Dish_Product.map((dishProduct) => (
          <Image
            className="border-stone-100 rounded-xl border shadow"
            width={100}
            height={100}
            alt={dishProduct.product.id}
            src={dishProduct.product.image ?? DEFAULT_IMAGE}
            key={dishProduct.product.id}
          />
        ))}
      </div>

      {/* <div className="px-4 grid sm:grid-cols-2 sm:justify-items-center gap-0 sm:gap-2 border-t border-stone-200 py-2 sm:py-2 text-center">
        <p className="max-sm:flex justify-between">
          Calorías <br />
          <span className="sm:hidden grow h-px bg-stone-200/75 self-end mx-1 mb-1.5"></span>
          <span className="text-secondary line-clamp-1">
            {renderSelectedNutritionalValueFromDish('calories', dish)}kcal
          </span>
        </p>
        <p className="max-sm:flex justify-between">
          Proteínas <br />
          <span className="sm:hidden grow h-px bg-stone-200/75 self-end mx-1 mb-1.5"></span>
          <span className="text-secondary line-clamp-1">
            {renderSelectedNutritionalValueFromDish('proteins', dish)}g
          </span>
        </p>
        <p className="max-sm:flex justify-between">
          Carbos <br />
          <span className="sm:hidden grow h-px bg-stone-200/75 self-end mx-1 mb-1.5"></span>
          <span className="text-secondary line-clamp-1">
            {renderSelectedNutritionalValueFromDish('carbohydrates', dish)}g
          </span>
        </p>
        <p className="max-sm:flex justify-between">
          Grasas <br />
          <span className="sm:hidden grow h-px bg-stone-200/75 self-end mx-1 mb-1.5"></span>
          <span className="text-secondary line-clamp-1">
            {renderSelectedNutritionalValueFromDish('fats', dish)}g
          </span>
        </p>
      </div> */}
    </article>
  );
};
