'use client';
import { DishProduct } from '@/interfaces/interfaces';
import { useCalculatorStore } from '@/store/calculator-store';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { IoCheckmarkOutline } from 'react-icons/io5';

interface Props {
  product: DishProduct;
  isOnCalculatorPage?: boolean;
}

export const Product = ({ product, isOnCalculatorPage = false }: Props) => {
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

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading)
    return (
      <p>
        <CgSpinner className="animate-spin" />
      </p>
    );

  return (
    <button
      key={calcProduct.id}
      className={clsx(
        'p-3 border rounded shadow-md flex flex-col gap-2 bg-white/75 relative',
        isProductInCalculator && !isOnCalculatorPage && 'border-primary',
        isOnCalculatorPage && 'cursor-default',
      )}
      onClick={
        !isOnCalculatorPage
          ? !isProductInCalculator
            ? () => addProductToCalculator(product)
            : () => removeProductFromCalculator(product)
          : () => {}
      }
    >
      {isProductInCalculator && !isOnCalculatorPage && (
        <div className="absolute -top-3 -right-3 rounded-full overflow-hidden">
          <IoCheckmarkOutline size={35} className="text-white bg-primary p-1" />
        </div>
      )}
      <p className="grow text-secondary text-center">{product.title}</p>
      <Image
        src={calcProduct.image || ''}
        alt={calcProduct.title}
        width={500}
        height={500}
        className="w-30 h-30 rounded border-stone-200 border shadow-sm"
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
                className="w-full"
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
                <option
                  value="0.2"
                  selected={
                    calcProduct.unitType === 'relative' && portionWeight === 0.2
                  }
                >
                  1/5 unidad
                </option>
                <option
                  value="0.25"
                  selected={
                    calcProduct.unitType === 'relative' &&
                    portionWeight === 0.25
                  }
                >
                  1/4 unidad
                </option>
                <option
                  value="0.33"
                  selected={
                    calcProduct.unitType === 'relative' &&
                    portionWeight === 0.33
                  }
                >
                  1/3 unidad
                </option>
                <option
                  value="0.5"
                  selected={
                    calcProduct.unitType === 'relative' && portionWeight === 0.5
                  }
                >
                  1/2 unidad
                </option>
                <option
                  value="1"
                  selected={
                    (calcProduct.unitType === 'relative' &&
                      portionWeight === 1) ||
                    true
                  }
                >
                  1 unidad
                </option>
                <option
                  value="2"
                  selected={
                    calcProduct.unitType === 'relative' && portionWeight === 2
                  }
                >
                  2 unidades
                </option>
                <option
                  value="3"
                  selected={
                    calcProduct.unitType === 'relative' && portionWeight === 3
                  }
                >
                  3 unidades
                </option>
                <option
                  value="4"
                  selected={
                    calcProduct.unitType === 'relative' && portionWeight === 4
                  }
                >
                  4 unidades
                </option>
                <option
                  value="5"
                  selected={
                    calcProduct.unitType === 'relative' && portionWeight === 5
                  }
                >
                  5 unidades
                </option>
              </select>
            </div>
          )}

          {unitType === 'absolute' && (
            <div className="flex w-full">
              <input
                className="w-full text-center"
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

          <div className="space-y-1 flex flex-col items-stretch w-full">
            <small className="text-secondary">
              Valor nutricional x {portionWeight}g
            </small>

            <p className="flex justify-between">
              Calorías
              <span className="text-secondary">
                {(calcProduct.calories * portionWeight * 0.01).toFixed(2)}
                kcal
              </span>
            </p>
            <p className="flex justify-between">
              Proteínas
              <span className="text-secondary">
                {(calcProduct.proteins * portionWeight * 0.01).toFixed(2)}g
              </span>
            </p>
            <p className="flex justify-between">
              Carbos
              <span className="text-secondary">
                {(calcProduct.carbohydrates * portionWeight * 0.01).toFixed(2)}g
              </span>
            </p>
            <p className="flex justify-between">
              Grasas
              <span className="text-secondary">
                {(calcProduct.fats * portionWeight * 0.01).toFixed(2)}g
              </span>
            </p>
          </div>
        </>
      ) : null}
    </button>
  );
};
