import NO_IMAGE from '../public/No_Image_Available.jpg';
import NUTRI_APP_IMAGE from '../public/nutriApp/SCR-20240811-o1q.png';
import { DishProduct, DishWithProducts } from './interfaces/interfaces';

export const DEFAULT_IMAGE = NO_IMAGE;
export const APP_IMAGE = NUTRI_APP_IMAGE;

export const renderSelectedNutritionalValueFromDish = (
  value: 'calories' | 'proteins' | 'carbohydrates' | 'fats',
  dish: DishWithProducts,
) => {
  return customRound(
    dish.Dish_Product.reduce(
      (acc, curr) => acc + curr.product[value] * curr.portionWeight * 0.01,
      0,
    ),
  );
};

export const renderSelectedNutritionalValueFromProduct = (
  value: 'calories' | 'proteins' | 'carbohydrates' | 'fats',
  product: DishProduct,
) => {
  return customRound(
    product[value] * (product.portionWeight ?? product.presentationSize) * 0.01,
  );
};

export const customRound = (value: number | string) => {
  if (isNaN(Number(value))) return value;
  return value.toLocaleString('es-AR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};
