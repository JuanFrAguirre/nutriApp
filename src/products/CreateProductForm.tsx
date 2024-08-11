'use client';

import { postProduct } from '@/actions';
import { INITIAL_STATE, useNewProductStore } from '@/store/new-product-store';
import _ from 'lodash';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';

export const CreateProductForm = () => {
  const clearNewProduct = useNewProductStore((store) => store.clearNewProduct);
  const setNewProduct = useNewProductStore((store) => store.setNewProduct);
  const newProduct = useNewProductStore((store) => store.newProduct);

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const updateNewProduct = useCallback(
    (field: string, value: string) =>
      setNewProduct({ ...newProduct, [field]: value.trim() }),
    [newProduct, setNewProduct],
  );

  const handleNewProductCreation = useCallback(async () => {
    const product = await postProduct(newProduct);
    router.push('/products');
  }, [newProduct, router]);

  const isFormClean = useMemo(
    () => _.isEqual(newProduct, INITIAL_STATE),
    [newProduct],
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
    <form className="flex flex-col gap-10 w-full px-4 grow max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="title">
          Título *
        </label>
        <input
          type="text"
          className="input"
          placeholder="Arroz"
          id="title"
          value={newProduct.title}
          onChange={(e) => updateNewProduct('title', e.target.value)}
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
          value={newProduct.image}
          onChange={(e) => updateNewProduct('image', e.target.value)}
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
          value={newProduct.tags}
          onChange={(e) => updateNewProduct('tags', e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="presentationSize">
          Tamaño por unidad *
        </label>
        <input
          type="number"
          className="input"
          placeholder="120g"
          id="presentationSize"
          value={newProduct.presentationSize}
          onChange={(e) => updateNewProduct('presentationSize', e.target.value)}
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
              value={newProduct.calories}
              onChange={(e) => updateNewProduct('calories', e.target.value)}
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
              value={newProduct.proteins}
              onChange={(e) => updateNewProduct('proteins', e.target.value)}
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
            value={newProduct.carbohydrates}
            onChange={(e) => updateNewProduct('carbohydrates', e.target.value)}
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
            value={newProduct.fats}
            onChange={(e) => updateNewProduct('fats', e.target.value)}
          />
        </div>
      </div>

      {/* <div className="grid grid-cols-2 gap-4"> */}

      {/* <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="unitType">
            Tipo de unidad
          </label>
          <select
            id="unitType"
            className="input"
            value={newProduct.unitType}
            onChange={(e) => updateNewProduct('unitType', e.target.value)}
          >
            <option value="relative">Relativa</option>
            <option value="absolute">Absoluta</option>
          </select>
        </div> */}
      {/* </div> */}

      <div className="grow"></div>
      <div className="grid grid-cols-2 items-center gap-4">
        <button
          disabled={isFormClean}
          className={isFormClean ? 'btn-disabled' : 'btn-danger'}
          onClick={clearNewProduct}
          type="button"
        >
          Limpiar
        </button>
        <button
          disabled={isFormClean}
          className={isFormClean ? 'btn-disabled' : 'btn'}
          onClick={handleNewProductCreation}
          type="button"
        >
          Crear
        </button>
      </div>
    </form>
  );
};
