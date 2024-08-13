import { DishProduct } from '@/interfaces/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  products: DishProduct[];
  addProductToCalculator: (product: DishProduct) => void;
  removeProductFromCalculator: (product: DishProduct) => void;
  editProductFromCalculator: (product: DishProduct) => void;
  clearCalculator: () => void;
}

export const useCalculatorStore = create<State>()(
  persist(
    (set, get) => ({
      products: [],
      addProductToCalculator: (product) => {
        const { products: calcProducts } = get();
        const productIsInCalculator = calcProducts.some(
          (item) => product.id === item.id,
        );

        if (!productIsInCalculator) {
          set({
            products: [
              ...calcProducts,
              {
                ...product,
                unitType: product.unitType ?? 'relative',
                portionWeight:
                  product.portionWeight ?? product.presentationSize,
              },
            ],
          });
          return;
        }
      },
      editProductFromCalculator: (product) => {
        const { products: calcProducts } = get();
        const updatedCalcProducts = calcProducts.map((item) =>
          item.id === product.id
            ? {
                ...product,
                unitType: product.unitType ?? 'relative',
                portionWeight:
                  product.portionWeight ?? product.presentationSize,
              }
            : item,
        );
        set({ products: updatedCalcProducts });
      },
      removeProductFromCalculator: (product) => {
        const { products } = get();
        set({ products: products.filter((item) => item.id !== product.id) });
      },
      clearCalculator: () => {
        set({ products: [] });
      },
    }),
    { name: 'calculator' },
  ),
);
