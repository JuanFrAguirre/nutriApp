import { DishProduct } from '@/interfaces/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  newProduct: DishProduct;
  setNewProduct: (product: DishProduct) => void;
  clearNewProduct: () => void;
}

export const INITIAL_STATE: DishProduct = {
  title: '',
  tags: '',
  image: '',
  calories: 0,
  proteins: 0,
  carbohydrates: 0,
  fats: 0,
  presentationSize: 100,
  unitType: 'relative',
};

export const useNewProductStore = create<State>()(
  persist(
    (set, get) => ({
      newProduct: INITIAL_STATE,
      setNewProduct: (product) => set({ newProduct: product }),
      clearNewProduct: () => {
        set({
          newProduct: INITIAL_STATE,
        });
      },
    }),
    { name: 'new-product' },
  ),
);
