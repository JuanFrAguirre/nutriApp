'use client';

import { editProduct } from '@/actions';
import { DishProduct } from '@/interfaces/interfaces';
import clsx from 'clsx';
import _ from 'lodash';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CgSpinner } from 'react-icons/cg';
import { ALLOWED_IMAGE_SOURCES } from './CreateProductForm';

interface Props {
  product: DishProduct;
}

interface FormInputs {
  title: string;
  tags: string;
  image: string;
  presentationSize: number;
  calories: number;
  proteins: number;
  carbohydrates: number;
  fats: number;
}

export const EditProductForm = ({ product }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { isValid, isDirty },
    reset,
  } = useForm<FormInputs>({
    defaultValues: product,
  });

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleSubmitEditProduct = useCallback(
    async (data: FormInputs) => {
      const {
        title,
        tags,
        image,
        presentationSize,
        calories,
        proteins,
        carbohydrates,
        fats,
      } = data;

      await editProduct({
        ...product,
        title,
        tags,
        image: ALLOWED_IMAGE_SOURCES.includes(image) ? image : '',
        presentationSize: Number(presentationSize),
        calories: Number(calories),
        proteins: Number(proteins),
        carbohydrates: Number(carbohydrates),
        fats: Number(fats),
      });
      window.location.reload();
    },
    [product],
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
    <form
      className="flex flex-col gap-10 w-full px-4 grow max-w-7xl mx-auto"
      onSubmit={handleSubmit(handleSubmitEditProduct)}
    >
      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="title">
          Título *
        </label>
        <input
          {...register('title', { required: true })}
          type="text"
          className="input"
          placeholder="Arroz"
          id="title"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="image">
          URL de imagen
        </label>
        <input
          {...register('image')}
          type="text"
          className="input"
          placeholder="https://sitio-de-la-image.com/123"
          id="image"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="tags">
          Etiquetas (solo separadas por comas)
        </label>
        <input
          {...register('tags')}
          type="text"
          className="input"
          placeholder="arroz,mercadona,congelado"
          id="tags"
        />
      </div>

      <div className="flex flex-col gap-4">
        <label className="font-semibold" htmlFor="presentationSize">
          Tamaño por unidad *<br />
          <small>(en gramos)</small>
        </label>
        <input
          type="number"
          step={0.01}
          className="input"
          placeholder="120g"
          id="presentationSize"
          {...register('presentationSize', { required: true })}
        />
      </div>

      <div className="space-y-4">
        <p className="font-semibold">
          Información nutricional
          <br />
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
              step={0.01}
              {...register('calories', { required: true })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="proteins">
              Proteínas *
            </label>
            <input
              {...register('proteins', { required: true })}
              type="number"
              step={0.01}
              className="input"
              placeholder="34g"
              id="proteins"
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
            {...register('carbohydrates', { required: true })}
            type="number"
            step={0.01}
            className="input"
            placeholder="34g"
            id="carbohydrates"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="fats">
            Grasas *
          </label>
          <input
            {...register('fats', { required: true })}
            type="number"
            step={0.01}
            className="input"
            placeholder="34g"
            id="fats"
          />
        </div>
      </div>

      <div className="grow"></div>
      <div className="grid grid-cols-2 items-center gap-4">
        <button
          className={clsx(!isDirty || !isValid ? 'btn-disabled' : 'btn-danger')}
          type="button"
          onClick={() => reset()}
          disabled={!isDirty || !isValid}
        >
          Restablecer
        </button>
        <button
          className={clsx(!isDirty || !isValid ? 'btn-disabled' : 'btn')}
          type="submit"
          disabled={!isDirty || !isValid}
        >
          Guardar
        </button>
      </div>
    </form>
  );
};
