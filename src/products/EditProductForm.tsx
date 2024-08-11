'use client';

import { editProduct } from '@/actions';
import { DishProduct } from '@/interfaces/interfaces';
import clsx from 'clsx';
import _ from 'lodash';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';

interface Props {
  product: DishProduct;
}

export const EditProductForm = ({ product }: Props) => {
  const [loading, setLoading] = useState(true);
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const router = useRouter();

  const handleUpdateProduct = useCallback(
    (field: string, value: string | number) =>
      setUpdatedProduct((prev) => ({ ...prev, [field]: value })),
    [],
  );

  const handleResetProduct = useCallback(
    () => setUpdatedProduct(product),
    [product],
  );

  const handleSubmitEditProduct = useCallback(async () => {
    await editProduct(updatedProduct);
    router.refresh();
  }, [updatedProduct, router]);

  const isProductClean = useMemo(
    () => _.isEqual(product, updatedProduct),
    [product, updatedProduct],
  );

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading)
    return (
      <>
        <CgSpinner className="text-primary animate-spin" size={50} />
        <div className="grow"></div>
      </>
    );

  return (
    <form className="flex flex-col gap-10 w-full px-4 grow">
      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="title">
          Título *
        </label>
        <input
          type="text"
          className="input"
          placeholder="Arroz"
          id="title"
          value={updatedProduct.title}
          onChange={(e) => handleUpdateProduct('title', e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="image">
          URL de imagen
        </label>
        <input
          type="text"
          className="input"
          placeholder="https://sitio-de-la-image.com/123"
          id="image"
          value={updatedProduct.image}
          onChange={(e) => handleUpdateProduct('image', e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="tags">
          Etiquetas (solo separadas por comas)
        </label>
        <input
          type="text"
          className="input"
          placeholder="arroz,mercadona,congelado"
          id="tags"
          value={updatedProduct.tags}
          onChange={(e) => handleUpdateProduct('tags', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <p className="font-semibold">
          Información nutricional
          <small> (cada 100g)</small>
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="calories">
              Calorías *
            </label>
            <input
              type="number"
              className="input"
              placeholder="123kcal"
              id="calories"
              value={updatedProduct.calories}
              onChange={(e) =>
                handleUpdateProduct('calories', Number(e.target.value))
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="proteins">
              Proteínas *
            </label>
            <input
              type="number"
              className="input"
              placeholder="34g"
              id="proteins"
              value={updatedProduct.proteins}
              onChange={(e) =>
                handleUpdateProduct('proteins', Number(e.target.value))
              }
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="carbohydrates">
            Carbos *
          </label>
          <input
            type="number"
            className="input"
            placeholder="34g"
            id="carbohydrates"
            value={updatedProduct.carbohydrates}
            onChange={(e) =>
              handleUpdateProduct('carbohydrates', Number(e.target.value))
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="fats">
            Grasas *
          </label>
          <input
            type="number"
            className="input"
            placeholder="34g"
            id="fats"
            value={updatedProduct.fats}
            onChange={(e) =>
              handleUpdateProduct('fats', Number(e.target.value))
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="presentationSize">
            Tamaño por unidad *
          </label>
          <input
            type="number"
            className="input"
            placeholder="120g"
            id="presentationSize"
            value={updatedProduct.presentationSize}
            onChange={(e) =>
              handleUpdateProduct('presentationSize', Number(e.target.value))
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="unitType">
            Tipo de unidad
          </label>
          <select
            id="unitType"
            className="input"
            value={updatedProduct.unitType}
            onChange={(e) => handleUpdateProduct('unitType', e.target.value)}
          >
            <option value="relative">Relativa</option>
            <option value="absolute">Absoluta</option>
          </select>
        </div>
      </div>

      <div className="grow"></div>
      <div className="grid grid-cols-2 items-center gap-4">
        <button
          className={clsx(isProductClean ? 'btn-disabled' : 'btn-danger')}
          type="button"
          onClick={handleResetProduct}
          disabled={isProductClean}
        >
          Restablecer
        </button>
        <button
          className={clsx(isProductClean ? 'btn-disabled' : 'btn')}
          type="button"
          onClick={handleSubmitEditProduct}
          disabled={isProductClean}
        >
          Guardar
        </button>
      </div>
    </form>
  );
};
