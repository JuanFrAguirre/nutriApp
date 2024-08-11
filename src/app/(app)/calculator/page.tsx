'use client';
import { Product } from '@/products';
import { useCalculatorStore } from '@/store/calculator-store';
import { redirect } from 'next/navigation';
import { IoAddOutline } from 'react-icons/io5';
import { LiaTrashAlt } from 'react-icons/lia';

export default function CalculatorPage() {
  const { products, clearCalculator } = useCalculatorStore();

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

  if (!products.length) {
    redirect('/products');
  }

  return (
    <main className="flex grow justify-center items-center flex-col gap-10 mb-52 md:mb-72 mt-10">
      <h1 className="text-3xl font-semibold text-secondary">Calculadora</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-w-7xl px-4 gap-4">
        {products.map((product) => (
          <Product key={product.id} product={product} isOnCalculatorPage />
        ))}
      </div>

      {/* Summary mobile */}
      <div className="fixed bg-white drop-shadow-2xl rounded-tr-[75px] border-stone-200 right-20 left-0 bottom-0 p-4 md:hidden">
        <p className="font-semibold text-secondary">Totales</p>
        <div className="grid grid-cols-10 gap-2 justify-items-left">
          <div className="col-span-4">
            <p className="text-left">
              Calorías: <br />
              <span className="text-secondary font-semibold">
                {getRenderableValue('calories')}kcal
              </span>
            </p>
            <p className="text-left">
              Proteínas: <br />
              <span className="text-secondary font-semibold">
                {getRenderableValue('proteins')}g
              </span>
            </p>
          </div>
          <div className="col-span-3">
            <p className="text-left">
              Carbos: <br />
              <span className="text-secondary font-semibold">
                {getRenderableValue('carbohydrates')}g
              </span>
            </p>
            <p className="text-left">
              Grasas: <br />
              <span className="text-secondary font-semibold">
                {getRenderableValue('fats')}g
              </span>
            </p>
          </div>
          <div className="flex flex-col gap-2 col-span-3 justify-self-center">
            <button
              onClick={clearCalculator}
              className="btn-primary p-1 flex max-sm:flex-col max-sm:items-center rounded-full justify-center items-center"
            >
              <IoAddOutline size={30} className="" />
            </button>
            <button
              onClick={clearCalculator}
              className="btn-danger p-1 flex max-sm:flex-col max-sm:items-center rounded-full justify-center items-center"
            >
              <LiaTrashAlt size={30} className="" />
            </button>
          </div>
        </div>
      </div>

      {/* Summary desktop */}
      <div className="max-md:hidden bg-white max-w-3xl mx-auto fixed bottom-0 w-full p-10 rounded-t-xl drop-shadow-xl border border-stone-100">
        <div className="flex">
          <div className="grow grid grid-cols-2">
            <div className="flex flex-col justify-between">
              <p className="text-left text-lg">
                Calorías: <br />
                <span className="text-secondary font-semibold">
                  {getRenderableValue('calories')}kcal
                </span>
              </p>
              <p className="text-left text-lg">
                Proteínas: <br />
                <span className="text-secondary font-semibold">
                  {getRenderableValue('proteins')}g
                </span>
              </p>
            </div>
            <div className="flex flex-col justify-between">
              <p className="text-left text-lg">
                Carbohidratos: <br />
                <span className="text-secondary font-semibold">
                  {getRenderableValue('carbohydrates')}g
                </span>
              </p>
              <p className="text-left text-lg">
                Grasas: <br />
                <span className="text-secondary font-semibold">
                  {getRenderableValue('fats')}g
                </span>
              </p>
            </div>
          </div>
          <div className="col-span-4 flex flex-col gap-5 justify-center px-4">
            <button
              onClick={clearCalculator}
              className="btn-primary flex justify-center items-center gap-2 p-4"
            >
              <IoAddOutline size={30} className="" />
              <p className="text-left">Crear una comida</p>
            </button>
            <button
              onClick={clearCalculator}
              className="btn-danger flex justify-center items-center gap-2 p-4"
            >
              <LiaTrashAlt size={30} className="" />
              <p className="text-left">Limpiar calculadora</p>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
