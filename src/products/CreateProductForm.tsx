'use client';

import { postProduct } from '@/actions';
import { redirect } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CgSpinner } from 'react-icons/cg';

export const ALLOWED_IMAGE_SOURCES = [
  'prod-mercadona.imgix.net',
  'static.carrefour.es',
  'www.compraonline.alcampo.es',
];

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

export const CreateProductForm = () => {
  const {
    handleSubmit,
    register,
    formState: { isValid, isDirty },
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      title: '',
      tags: '',
      image: '',
      presentationSize: undefined,
      calories: undefined,
      proteins: undefined,
      carbohydrates: undefined,
      fats: undefined,
    },
  });

  const [loading, setLoading] = useState(true);

  const handleNewProductCreation = useCallback(async (data: FormInputs) => {
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
    const newProduct = await postProduct({
      title,
      tags,
      image: ALLOWED_IMAGE_SOURCES.includes(image) ? image : '',
      presentationSize: Number(presentationSize),
      calories: Number(calories),
      proteins: Number(proteins),
      carbohydrates: Number(carbohydrates),
      fats: Number(fats),
    });
    window.location.href = `/products#${newProduct?.data?.id}`;
  }, []);
  // }, []);

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
      onSubmit={handleSubmit(handleNewProductCreation)}
    >
      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="title">
          Título *
        </label>
        <input
          type="text"
          className="input"
          placeholder="Arroz"
          id="title"
          {...register('title', { required: true })}
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
          {...register('image')}
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
          {...register('tags')}
        />
      </div>

      <div className="flex flex-col gap-4">
        <label className="font-semibold" htmlFor="presentationSize">
          Tamaño por unidad *<br />
          <small>(en gramos)</small>
        </label>
        <input
          type="number"
          className="input"
          placeholder="120g"
          id="presentationSize"
          step={0.01}
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
              type="number"
              className="input"
              placeholder="50g"
              id="proteins"
              step={0.01}
              {...register('proteins', { required: true })}
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
            placeholder="25g"
            id="carbohydrates"
            step={0.01}
            {...register('carbohydrates', { required: true })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="fats">
            Grasas *
          </label>
          <input
            type="number"
            className="input"
            placeholder="10g"
            id="fats"
            step={0.01}
            {...register('fats', { required: true })}
          />
        </div>
      </div>

      <div className="grow"></div>
      <div className="grid grid-cols-2 items-center gap-4">
        <button
          disabled={!isDirty}
          className={!isDirty ? 'btn-disabled' : 'btn-danger'}
          onClick={() => reset()}
          type="button"
        >
          Limpiar
        </button>
        <button
          disabled={!isDirty || !isValid}
          className={!isDirty || !isValid ? 'btn-disabled' : 'btn'}
        >
          Crear
        </button>
      </div>
    </form>
  );
};
