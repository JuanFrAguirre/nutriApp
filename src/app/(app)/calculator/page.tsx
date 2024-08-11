'use client';
import { Product } from '@/products';
import { useCalculatorStore } from '@/store/calculator-store';
import { IoAddOutline } from 'react-icons/io5';
import { LiaTrashAlt } from 'react-icons/lia';

export default function CalculatorPage() {
  const { products, clearCalculator } = useCalculatorStore();

  // const getTotals = useCallback(() => {
  //   const totals: any = products.reduce((acc, curr): any => ({
  //     calories: acc.calories + curr.calories,
  //     proteins: acc.proteins + curr.proteins,
  //     carbohydrates: acc.carbohydrates + curr.carbohydrates,
  //     fats: acc.fats + curr.fats,
  //   }));
  //   return totals;
  // }, [products]);

  // useEffect(() => {
  //   getTotals();
  // }, [products, getTotals]);

  const getRenderableValue = (
    value: 'calories' | 'proteins' | 'fats' | 'carbohydrates',
  ) =>
    products
      .reduce(
        (acc, curr) =>
          acc +
          curr[value] *
            (curr.portionWeight ? curr.portionWeight : curr.presentationSize) *
            0.01,
        0,
      )
      .toFixed(2);

  return (
    <main className="flex grow justify-center items-center flex-col gap-10 mb-52 mt-10">
      <h1 className="text-3xl font-semibold text-secondary">Calculadora</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-w-7xl px-4 gap-4">
        {products.map((product) => (
          <Product key={product.id} product={product} isOnCalculatorPage />
        ))}
      </div>

      {/* Summary */}
      <div className="fixed bg-white shadow-lg rounded-tr-md border border-stone-200 right-20 left-1 bottom-1 p-4">
        <p>Totales</p>
        <div className="grid grid-cols-3 justify-items-center">
          <div>
            <p>Calorías: {getRenderableValue('calories')}g</p>
            <p>Proteínas: {getRenderableValue('proteins')}g</p>
          </div>
          <div>
            <p>Carbos: {getRenderableValue('carbohydrates')}g</p>
            <p>Grasas: {getRenderableValue('fats')}g</p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={clearCalculator}
              className="btn-primary p-1 flex max-sm:flex-col max-sm:items-center rounded-full justify-center items-center"
            >
              <IoAddOutline size={30} className="" />
              {/* <small>Crear comida</small> */}
            </button>
            <button
              onClick={clearCalculator}
              className="btn-primary p-1 flex max-sm:flex-col max-sm:items-center bg-red-500 rounded-full justify-center items-center"
            >
              <LiaTrashAlt size={30} className="" />
              {/* <small>Limpiar</small> */}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
