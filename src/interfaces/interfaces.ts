export interface Product {
  id?: string;
  title: string;
  tags?: string;
  image?: string;
  calories: number;
  proteins: number;
  carbohydrates: number;
  fats: number;
  presentationSize: number;
}

export type UnitTypes = 'relative' | 'absolute';

export interface DishProduct extends Product {
  unitType?: UnitTypes;
  portionWeight?: number;
}
