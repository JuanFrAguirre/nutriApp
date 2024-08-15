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
        'border bg-white/75 border-stone-50 shadow rounded-xl flex flex-col relative ',
      )}
      id={dish.id}
    >
      {/* Dish buttons */}
      <div className="absolute top-0 right-0">
        <DishButtons dish={dish} />
      </div>

      {/* Dish card */}
      <div className="max-sm:py-2 py-3">
        <p className="sm:text-lg text-secondary line-clamp-2 mx-2 mr-6 break-words ">
          {/* h-12 sm:h-14 */}
          {dish.title}
        </p>
      </div>
      <div className="auto-rows-min grid grid-cols-2 sm:grid-cols-3 gap-2 place-items-center overflow-y-auto grow px-3 border-t border-stone-200 pt-2 sm:pt-3  mb-2 sm:mb-3">
        {/* h-[200px] sm:-[250px] */}
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
    </article>
  );
};
