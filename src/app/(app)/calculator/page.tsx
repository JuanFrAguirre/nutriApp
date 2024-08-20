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
import { ImSpinner2 } from 'react-icons/im';
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
      <div className="flex items-center justify-center w-full h-screen transition-all fade-in">
        <ImSpinner2 size={50} className="animate-spin text-secondary" />
      </div>
    );

  return (
    <main className="flex flex-col items-center justify-center gap-10 mt-10 grow mb-52 md:mb-72">
      <h1 className="text-3xl font-semibold text-secondary">Calculadora</h1>
      {products.length ? (
        <div className="grid grid-cols-2 gap-4 px-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-w-7xl max-sm:px-2">
          {products.map((product) => (
            <Product key={product.id} product={product} isOnCalculatorPage />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-10 p-4 grow">
          <p className="text-lg font-light text-center">
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
              <span className="font-semibold text-secondary">
                {products.length
                  ? `${getRenderableValue('calories')}kcal`
                  : '-'}
              </span>
            </p>
            <p className="text-left">
              Proteínas: <br />
              <span className="font-semibold text-secondary">
                {products.length ? `${getRenderableValue('proteins')}g` : '-'}
              </span>
            </p>
          </div>
          <div className="col-span-3">
            <p className="text-left">
              Carbos: <br />
              <span className="font-semibold text-secondary">
                {products.length
                  ? `${getRenderableValue('carbohydrates')}g`
                  : '-'}
              </span>
            </p>
            <p className="text-left">
              Grasas: <br />
              <span className="font-semibold text-secondary">
                {products.length ? `${getRenderableValue('fats')}g` : '-'}
              </span>
            </p>
          </div>
          <div className="flex flex-col col-span-3 gap-2 justify-self-center">
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
      <div className="fixed bottom-0 w-full max-w-3xl p-10 mx-auto bg-white border shadow-2xl max-md:hidden rounded-t-xl shadow-black border-stone-400">
        <div className="flex">
          <div className="grid grid-cols-2 grow justify-items-center">
            <div className="flex flex-col justify-between">
              <p className="text-lg text-left">
                Calorías: <br />
                <span className="font-semibold text-secondary">
                  {products.length
                    ? `${getRenderableValue('calories')}kcal`
                    : '-'}
                </span>
              </p>
              <p className="text-lg text-left">
                Proteínas: <br />
                <span className="font-semibold text-secondary">
                  {products.length ? `${getRenderableValue('proteins')}g` : '-'}
                </span>
              </p>
            </div>
            <div className="flex flex-col justify-between">
              <p className="text-lg text-left">
                Carbohidratos: <br />
                <span className="font-semibold text-secondary">
                  {products.length
                    ? `${getRenderableValue('carbohydrates')}g`
                    : '-'}
                </span>
              </p>
              <p className="text-lg text-left">
                Grasas: <br />
                <span className="font-semibold text-secondary">
                  {products.length ? `${getRenderableValue('fats')}g` : '-'}
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center col-span-4 gap-5 px-4">
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
