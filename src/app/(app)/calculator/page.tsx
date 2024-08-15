'use client';
import { createDish } from '@/actions';
import { Product } from '@/products';
import { useCalculatorStore } from '@/store/calculator-store';
import { useConfirmationStore } from '@/store/confirmation-store';
import { customRound } from '@/utils';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { IoRestaurantOutline } from 'react-icons/io5';
import { LiaTrashAlt } from 'react-icons/lia';

export default function CalculatorPage() {
  const { products: calcProducts, clearCalculator } = useCalculatorStore();
  const [products, setProducts] = useState(calcProducts);
  const { openConfirmation } = useConfirmationStore();
  const session = useSession();

  const [loading, setLoading] = useState(true);

  const openConfirmationAsync = useCallback(
    (message: string): Promise<string | null> => {
      return new Promise((resolve) => {
        openConfirmation(
          message,
          (text) => {
            if (!text) return resolve(null);
            resolve(text);
          },
          true,
        );
      });
    },
    [openConfirmation],
  );

  const handleCreateDish = useCallback(async () => {
    let title = await openConfirmationAsync('Nombre de la comida');

    if (!title) return;

    const newDish = await createDish({
      products,
      title,
      userEmail: session.data?.user?.email!,
    });

    setTimeout(() => {
      clearCalculator();
      window.location.href = `/dishes`;
    }, 1000);
  }, [products, session, openConfirmationAsync, clearCalculator]);

  const getRenderableValue = useCallback(
    (value: 'calories' | 'proteins' | 'fats' | 'carbohydrates') => {
      if (!products) return 0;
      return customRound(
        products.reduce(
          (acc, curr) =>
            acc +
            curr[value] *
              (curr.portionWeight
                ? curr.portionWeight
                : curr.presentationSize) *
              0.01,
          0,
        ),
      );
    },
    [products],
  );

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    setProducts(calcProducts);
  }, [calcProducts]);

  if (loading)
    return (
      <div className="w-full flex justify-center items-center h-screen fade-in transition-all">
        <CgSpinner size={50} className="animate-spin text-secondary" />
      </div>
    );

  return (
    <main className="flex grow justify-center items-center flex-col gap-10 mb-52 md:mb-72 mt-10">
      <h1 className="text-3xl font-semibold text-secondary">Calculadora</h1>
      {products.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-w-7xl max-sm:px-2 px-4 gap-4">
          {products.map((product) => (
            <Product key={product.id} product={product} isOnCalculatorPage />
          ))}
        </div>
      ) : (
        <div className="grow p-4 flex justify-center items-center flex-col gap-10">
          <p className="text-center font-light text-lg">
            Aún no hay productos. Agrega alguno para calcular y crear una
            comida.
          </p>
          <Link href={'/products'} className="btn">
            Agregar productos
          </Link>
        </div>
      )}

      {/* Summary mobile */}
      <div className="fixed bg-white shadow-2xl shadow-black rounded-tr-[75px] border border-stone-400 right-20 left-0 bottom-0 p-4 md:hidden space-y-2">
        <p className="font-semibold text-secondary">Totales</p>
        <div className="grid grid-cols-10 gap-2 justify-items-left">
          <div className="col-span-4">
            <p className="text-left">
              Calorías: <br />
              <span className="text-secondary font-semibold">
                {products.length
                  ? `${getRenderableValue('calories')}kcal`
                  : '-'}
              </span>
            </p>
            <p className="text-left">
              Proteínas: <br />
              <span className="text-secondary font-semibold">
                {products.length ? `${getRenderableValue('proteins')}g` : '-'}
              </span>
            </p>
          </div>
          <div className="col-span-3">
            <p className="text-left">
              Carbos: <br />
              <span className="text-secondary font-semibold">
                {products.length
                  ? `${getRenderableValue('carbohydrates')}g`
                  : '-'}
              </span>
            </p>
            <p className="text-left">
              Grasas: <br />
              <span className="text-secondary font-semibold">
                {products.length ? `${getRenderableValue('fats')}g` : '-'}
              </span>
            </p>
          </div>
          <div className="flex flex-col gap-2 col-span-3 justify-self-center">
            <button
              disabled={!products.length}
              onClick={handleCreateDish}
              className={clsx(
                'p-1 flex max-sm:flex-col max-sm:items-center rounded-full justify-center items-center',
                products.length ? 'btn-primary' : 'btn-disabled',
              )}
            >
              <IoRestaurantOutline size={30} className="p-1" />
            </button>
            <button
              disabled={!products.length}
              onClick={clearCalculator}
              className={clsx(
                'p-1 flex max-sm:flex-col max-sm:items-center rounded-full justify-center items-center',
                products.length ? 'btn-danger' : 'btn-disabled',
              )}
            >
              <LiaTrashAlt size={30} className="" />
            </button>
          </div>
        </div>
      </div>

      {/* Summary desktop */}
      <div className="max-md:hidden bg-white max-w-3xl mx-auto fixed bottom-0 w-full p-10 rounded-t-xl shadow-2xl shadow-black border border-stone-400">
        <div className="flex">
          <div className="grow grid grid-cols-2 justify-items-center">
            <div className="flex flex-col justify-between">
              <p className="text-left text-lg">
                Calorías: <br />
                <span className="text-secondary font-semibold">
                  {products.length
                    ? `${getRenderableValue('calories')}kcal`
                    : '-'}
                </span>
              </p>
              <p className="text-left text-lg">
                Proteínas: <br />
                <span className="text-secondary font-semibold">
                  {products.length ? `${getRenderableValue('proteins')}g` : '-'}
                </span>
              </p>
            </div>
            <div className="flex flex-col justify-between">
              <p className="text-left text-lg">
                Carbohidratos: <br />
                <span className="text-secondary font-semibold">
                  {products.length
                    ? `${getRenderableValue('carbohydrates')}g`
                    : '-'}
                </span>
              </p>
              <p className="text-left text-lg">
                Grasas: <br />
                <span className="text-secondary font-semibold">
                  {products.length ? `${getRenderableValue('fats')}g` : '-'}
                </span>
              </p>
            </div>
          </div>
          <div className="col-span-4 flex flex-col gap-5 justify-center px-4">
            <button
              disabled={!products.length}
              onClick={handleCreateDish}
              className={clsx(
                'flex justify-center items-center gap-2 p-4',
                products.length ? 'btn-primary' : 'btn-disabled',
              )}
            >
              <IoRestaurantOutline size={30} className="p-1" />
              <p className="text-left">Crear una comida</p>
            </button>
            <button
              disabled={!products.length}
              onClick={clearCalculator}
              className={clsx(
                'flex justify-center items-center gap-2 p-4',
                products.length ? 'btn-danger' : 'btn-disabled',
              )}
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
