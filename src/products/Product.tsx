'use client';
import { DishProduct } from '@/interfaces/interfaces';
import { useCalculatorStore } from '@/store/calculator-store';
import { renderSelectedNutritionalValueFromProduct } from '@/utils';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { HiPencilSquare } from 'react-icons/hi2';
import { ImSpinner2 } from 'react-icons/im';
import { IoAddOutline, IoCheckmarkOutline } from 'react-icons/io5';
import { LiaTrashAlt } from 'react-icons/lia';
import NO_IMAGE from '../../public/No_Image_Available.jpg';

interface Props {
  product: DishProduct;
  isOnCalculatorPage?: boolean;
  className?: string;
}

export const Product = ({
  product,
  isOnCalculatorPage = false,
  className,
}: Props) => {
  const addProductToCalculator = useCalculatorStore(
    (store) => store.addProductToCalculator,
  );
  const removeProductFromCalculator = useCalculatorStore(
    (store) => store.removeProductFromCalculator,
  );
  const editProductFromCalculator = useCalculatorStore(
    (store) => store.editProductFromCalculator,
  );
  const products = useCalculatorStore((store) => store.products);

  const [calcProduct, setCalcProduct] = useState(product);
  const [unitType, setUnitType] = useState(calcProduct.unitType || 'relative');
  const [portionWeight, setPortionWeight] = useState(product.presentationSize);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const updatedProduct = products.find((p) => p.id === product.id);
    if (updatedProduct) {
      setCalcProduct(updatedProduct);
      setPortionWeight(
        updatedProduct.portionWeight || product.presentationSize,
      );
    }
  }, [products, product.id, product.presentationSize]);

  const isProductInCalculator = useMemo(
    () =>
      products.find((calculatorProduct) => product.id === calculatorProduct.id),
    [product, products],
  );

  const navigateToEditProduct = (e: any) => {
    e.stopPropagation();
    router.push(`/products/${product.id}`);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading)
    return (
      <div className="w-full grow flex justify-center items-center min-h-[227px] bg-white border animate-pulse rounded">
        <ImSpinner2 className="animate-spin text-primary" size={40} />
      </div>
    );

  return (
    <div
      id={product.id}
      key={calcProduct.id}
      className={clsx(
        className,
        'p-3 border rounded-xl flex flex-col gap-2 bg-white/75 shadow relative transition-all',
        isProductInCalculator && !isOnCalculatorPage
          ? 'border-primary !bg-secondary/15'
          : 'border-stone-50',
        isOnCalculatorPage ? 'cursor-default' : 'cursor-pointer',
      )}
      onClick={
        !isOnCalculatorPage
          ? !isProductInCalculator
            ? () => addProductToCalculator(product)
            : () => removeProductFromCalculator(product)
          : () => {}
      }
    >
      {/* Buttons for adding to/removing from calculator and editing product */}
      {!isOnCalculatorPage && (
        <>
          <button className="absolute -top-3 -right-1.5 rounded-full overflow-hidden">
            {isProductInCalculator ? (
              <IoCheckmarkOutline
                size={30}
                className="p-1 text-white transition-all shadow bg-primary hover:bg-secondary"
              />
            ) : (
              <IoAddOutline
                size={30}
                className="p-1 text-white transition-all shadow bg-primary hover:bg-secondary"
              />
            )}
          </button>

          <button
            className="absolute top-6 -right-1.5 rounded-full overflow-hidden"
            onClick={navigateToEditProduct}
          >
            <HiPencilSquare
              size={30}
              className="text-white bg-brandOrange hover:bg-yellow-400 p-1.5 transition-all shadow"
            />
          </button>
        </>
      )}

      {/* Delete product from calculator on calculator page */}
      {isOnCalculatorPage && (
        <button
          // className="absolute -top-2.5 -right-2 rounded-full overflow-hidden"
          className="absolute overflow-hidden -top-px -right-px rounded-tr-xl rounded-bl-xl"
          onClick={() => removeProductFromCalculator(product)}
        >
          <LiaTrashAlt
            size={35}
            className="p-1 text-white transition-all bg-red-500 shadow hover:bg-red-700"
          />
        </button>
      )}

      <p className="pr-4 text-left grow text-secondary">{product.title}</p>

      <Image
        src={calcProduct.image || NO_IMAGE}
        alt={calcProduct.title}
        width={500}
        height={500}
        className="w-30 h-30 rounded-xl"
      />

      {isOnCalculatorPage ? (
        <>
          <div className="flex gap-2">
            <button
              onClick={() => setUnitType('relative')}
              className={clsx(
                unitType === 'relative' && 'border-primary',
                'border tracking-tight leading-5 rounded p-1',
              )}
            >
              <small>Unidades relativas</small>
            </button>
            <button
              onClick={() => setUnitType('absolute')}
              className={clsx(
                unitType === 'absolute' && 'border-primary',
                'border tracking-tight leading-5 rounded p-1',
              )}
            >
              <small>Unidades absolutas</small>
            </button>
          </div>

          {unitType === 'relative' && (
            <div className="flex w-full">
              <select
                className="w-full input"
                value={
                  calcProduct?.portionWeight
                    ? calcProduct.portionWeight / calcProduct.presentationSize
                    : 1
                }
                onChange={(e) => {
                  setPortionWeight(
                    Number(e.target.value) * calcProduct.presentationSize,
                  );
                  editProductFromCalculator({
                    ...calcProduct,
                    portionWeight:
                      Number(e.target.value) * calcProduct.presentationSize,
                    unitType: 'relative',
                  });
                }}
              >
                <option value="0.16">1/6 de unidad (16%)</option>
                <option value="0.2">1/5 de unidad (20%)</option>
                <option value="0.25">1/4 de unidad (25%)</option>
                <option value="0.33">1/3 de unidad (33%)</option>
                <option value="0.4">2/5 de unidad (40%)</option>
                <option value="0.5">1/2 de unidad (50%)</option>
                <option value="0.6">3/5 de unidad (60%)</option>
                <option value="0.66">2/3 de unidad (66%)</option>
                <option value="0.75">3/4 de unidad (75%)</option>
                <option value="0.8">4/5 de unidad (80%)</option>
                <option value="0.83">5/6 de unidad (83%)</option>
                <option value="1">1 unidad</option>
                <option value="2">2 unidades</option>
                <option value="3">3 unidades</option>
                <option value="4">4 unidades</option>
                <option value="5">5 unidades</option>
              </select>
            </div>
          )}

          {unitType === 'absolute' && (
            <div className="flex w-full">
              <input
                className="w-full text-center input"
                placeholder="Peso en gramos..."
                type="number"
                min={1}
                max={10000}
                value={calcProduct.portionWeight}
                onChange={(e) => {
                  setPortionWeight(Number(e.target.value));
                  editProductFromCalculator({
                    ...calcProduct,
                    portionWeight: Number(e.target.value),
                    unitType: 'absolute',
                  });
                }}
              />
            </div>
          )}

          <div className="flex flex-col items-stretch w-full space-y-1">
            <small className="text-secondary">
              Valor nutricional x {portionWeight}g
            </small>

            <p className="flex justify-between">
              Calorías
              <span className="sm:hidden grow h-px bg-stone-200/75 self-end mx-1 mb-1.5"></span>
              <span className="text-secondary">
                {renderSelectedNutritionalValueFromProduct(
                  'calories',
                  calcProduct,
                )}
                kcal
              </span>
            </p>
            <p className="flex justify-between">
              Proteínas
              <span className="sm:hidden grow h-px bg-stone-200/75 self-end mx-1 mb-1.5"></span>
              <span className="text-secondary">
                {renderSelectedNutritionalValueFromProduct(
                  'proteins',
                  calcProduct,
                )}
                g
              </span>
            </p>
            <p className="flex justify-between">
              Carbos
              <span className="sm:hidden grow h-px bg-stone-200/75 self-end mx-1 mb-1.5"></span>
              <span className="text-secondary">
                {renderSelectedNutritionalValueFromProduct(
                  'carbohydrates',
                  calcProduct,
                )}
                g
              </span>
            </p>
            <p className="flex justify-between">
              Grasas
              <span className="sm:hidden grow h-px bg-stone-200/75 self-end mx-1 mb-1.5"></span>
              <span className="text-secondary">
                {renderSelectedNutritionalValueFromProduct('fats', calcProduct)}
                g
              </span>
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
};
