import NO_IMAGE from '../public/No_Image_Available.jpg';
import NUTRI_APP_IMAGE from '../public/nutriApp/SCR-20240811-o1q.png';
import {
  DishProduct,
  DishProductWithProducts,
  DishWithProducts,
} from './interfaces/interfaces';

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
    value === 'calories',
  );
};

export const renderSelectedNutritionalValueFromProductDish = (
  value: 'calories' | 'proteins' | 'carbohydrates' | 'fats',
  dishProduct: DishProductWithProducts,
) => {
  return customRound(
    dishProduct.product[value] * dishProduct.portionWeight! * 0.01,
    value === 'calories',
  );
};

export const renderSelectedNutritionalValueFromProduct = (
  value: 'calories' | 'proteins' | 'carbohydrates' | 'fats',
  product: DishProduct,
) => {
  return customRound(
    product[value] * product.portionWeight! * 0.01,
    value === 'calories',
  );
};

export const customRound = (value: number | string, round: boolean = false) => {
  if (isNaN(Number(value))) return value;
  if (round) return Math.round(Number(value));
  return Number(value).toLocaleString('es-AR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

export const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
