import { DishWithProducts } from '@/interfaces/interfaces';
import { DEFAULT_IMAGE } from '@/utils';
import clsx from 'clsx';
import Image from 'next/image';
import { useCallback } from 'react';

interface Props {
  dish: DishWithProducts;
  className?: string;
}

export const Dish = ({ dish, className }: Props) => {
  const renderSelectedNutritionalValue = (
    value: 'calories' | 'proteins' | 'carbohydrates' | 'fats',
  ) => {
    return dish.Dish_Product.reduce(
      (acc, curr) => acc + curr.product[value],
      0,
    ).toLocaleString('es-ar', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  return (
    <article
      className={clsx(
        className,
        'py-4 border bg-white/50 border-stone-50 shadow rounded-xl flex flex-col',
      )}
      id={dish.id}
    >
      <p className="sm:text-lg text-secondary line-clamp-2 mx-2 pb-4 mr-4">
        {dish.title}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 justify-items-center overflow-y-auto max-h-[200px] p-3 border-y border-stone-200">
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
      <div className="grow"></div>

      <div className="p-4 pb-0 grid sm:grid-cols-2 sm:justify-items-center gap-0 sm:gap-2 border-t border-stone-200">
        <p className="max-sm:flex justify-between">
          Calorías <br />
          <div className="sm:hidden grow h-px bg-stone-200/75 self-end mx-1 mb-1.5"></div>
          <span className="text-secondary">
            {renderSelectedNutritionalValue('calories')}kcal
          </span>
        </p>
        <p className="max-sm:flex justify-between">
          Proteínas <br />
          <div className="sm:hidden grow h-px bg-stone-200/75 self-end mx-1 mb-1.5"></div>
          <span className="text-secondary">
            {renderSelectedNutritionalValue('proteins')}g
          </span>
        </p>
        <p className="max-sm:flex justify-between">
          Carbos <br />
          <div className="sm:hidden grow h-px bg-stone-200/75 self-end mx-1 mb-1.5"></div>
          <span className="text-secondary">
            {renderSelectedNutritionalValue('carbohydrates')}g
          </span>
        </p>
        <p className="max-sm:flex justify-between">
          Grasas <br />
          <div className="sm:hidden grow h-px bg-stone-200/75 self-end mx-1 mb-1.5"></div>
          <span className="text-secondary">
            {renderSelectedNutritionalValue('fats')}g
          </span>
        </p>
      </div>
    </article>
  );
};
