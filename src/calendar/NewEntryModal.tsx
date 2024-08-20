'use client';
import { getDishes, getProducts } from '@/actions';
import { createCalendarEntry } from '@/actions/calendar-entries-actions/calendar-entries-actions';
import { DishProduct, DishWithProducts } from '@/interfaces/interfaces';
import { useCalendarEntryStore } from '@/store/calendar-entry-store';
import { DEFAULT_IMAGE } from '@/utils';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CgSpinnerAlt } from 'react-icons/cg';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { createCalendarEntryFromProduct } from '../actions/calendar-entries-actions/calendar-entries-actions';
import Link from 'next/link';

interface Props {
  isNewEntryModalOpen: boolean;
  closeNewEntryModal: () => void;
}

interface FormInputs {
  quantity: number;
  date: string;
}

export const NewEntryModal = ({
  isNewEntryModalOpen,
  closeNewEntryModal,
}: Props) => {
  const [dishes, setDishes] = useState<DishWithProducts[]>([]);
  const [products, setProducts] = useState<DishProduct[]>();
  const { date, setDate } = useCalendarEntryStore();
  const [selectedDish, setSelectedDish] = useState({} as DishWithProducts);
  const [selectedProduct, setSelectedProduct] = useState<DishProduct>();
  const [selectedTab, setSelectedTab] = useState<'dishes' | 'products'>(
    'dishes',
  );
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    setValue,
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      quantity: 1,
      date: date,
    },
  });

  const getUserDishes = useCallback(async () => {
    const dishesData = await getDishes();
    if (!dishesData) setDishes([]);
    setDishes(dishesData);
    setSelectedDish(dishesData[0]);
  }, []);

  const onEntrySubmit = async (data: FormInputs) => {
    const { date, quantity } = data;
    if (selectedTab === 'dishes') {
      let newEntry = await createCalendarEntry(
        selectedDish.id,
        date,
        Number(quantity),
      );
      if (!newEntry || !newEntry.ok) {
        return;
      }
    }
    if (selectedTab === 'products') {
      let newEntry = await createCalendarEntryFromProduct(
        selectedProduct?.id!,
        date,
        Number(quantity),
      );
    }
    closeNewEntryModal();
    reset();
    setDate(date);
    router.refresh();
  };

  const getProductsData = async () => {
    try {
      setLoading(true);
      let productsData = await getProducts();
      setProducts(productsData);
      setSelectedProduct(productsData[0]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    closeNewEntryModal();
    reset();
  };

  useEffect(() => {
    getUserDishes();
  }, [getUserDishes]);

  useEffect(() => {
    setValue('date', date);
  }, [date, setValue]);

  useEffect(() => {
    if (selectedTab === 'products' && !products?.length) {
      getProductsData();
    }
  }, [selectedTab, products?.length]);

  return (
    <>
      {isNewEntryModalOpen && (
        <div className="fixed top-0 left-0 z-20 w-screen h-screen bg-black/35"></div>
      )}

      {/* Blur */}
      {isNewEntryModalOpen && (
        <div
          className="fixed top-0 left-0 z-20 w-screen h-screen transition-all fade-in backdrop-filter backdrop-blur-[3px]"
          onClick={closeNewEntryModal}
        ></div>
      )}

      {isNewEntryModalOpen && (
        <form
          className={clsx(
            'fixed my-auto bg-gradient-to-br from-stone-50 to bg-green-50 mx-auto w-[80%] max-w-6xl h-auto max-h-[80%] z-20 rounded-xl shadow-2xl flex overflow-y-auto',
          )}
          onSubmit={handleSubmit(onEntrySubmit)}
        >
          <div className="py-4 space-y-4 grow">
            <section className="space-y-2">
              <div className="flex items-center justify-center gap-5">
                <button
                  className={clsx(
                    'transform transition',
                    selectedTab === 'dishes'
                      ? 'btn scale-110'
                      : 'btn-secondary',
                  )}
                  onClick={() => setSelectedTab('dishes')}
                  type="button"
                >
                  <p>Tus comidas</p>
                </button>
                <button
                  className={clsx(
                    'transform transition',
                    selectedTab === 'products'
                      ? 'btn scale-110'
                      : 'btn-secondary',
                  )}
                  onClick={() => setSelectedTab('products')}
                  type="button"
                >
                  <p>Productos</p>
                </button>
              </div>
              <div className="flex flex-col gap-4 h-[300px] border-y overflow-y-auto py-4 px-4">
                {selectedTab === 'dishes' && (
                  <>
                    {!!dishes.length ? (
                      dishes.map((dish) => (
                        <button
                          key={dish.id}
                          className={clsx(
                            'grid grid-cols-12 gap-2 border-2 p-2 rounded-xl items-center relative',
                            selectedDish.id === dish.id && 'border-secondary',
                          )}
                          type="button"
                          onClick={() => setSelectedDish(dish)}
                        >
                          {selectedDish.id === dish.id ? (
                            <div className="absolute -top-3 -right-2.5 bg-secondary rounded-full text-white">
                              <IoCheckmarkOutline size={25} className="p-1" />
                            </div>
                          ) : null}
                          <p className="col-span-4 font-medium text-left">
                            {dish.title}
                          </p>
                          <div className="grid grid-cols-3 gap-0.5 border-l pl-2 col-span-8">
                            {dish.Dish_Product.map((product) => (
                              <Image
                                className="border rounded-md"
                                width={100}
                                height={100}
                                alt={product.product.title}
                                src={product.product.image || DEFAULT_IMAGE}
                                key={product.id}
                              />
                            ))}
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-10 grow">
                        <p className="font-light">
                          Aún no tienes comidas agregadas. Crea alguna para
                          poder seleccionarlas aquí.
                        </p>
                        <Link href={'/products'} className="btn">
                          Crear una comida
                        </Link>
                      </div>
                    )}
                  </>
                )}
                {selectedTab === 'products' && (
                  <>
                    {loading ? (
                      <div className="flex items-center justify-center ">
                        <CgSpinnerAlt size={50} className="text-secondary" />
                      </div>
                    ) : products?.length && selectedProduct ? (
                      products?.map((product) => (
                        <button
                          type="button"
                          onClick={() => setSelectedProduct(product)}
                          key={product.id}
                          className={clsx(
                            'flex justify-between items-center border-2 p-2 rounded-xl gap-2 relative',
                            selectedProduct.id === product.id &&
                              'border-secondary',
                          )}
                        >
                          {selectedProduct.id === product.id ? (
                            <div className="absolute -top-3 -right-2.5 bg-secondary rounded-full text-white">
                              <IoCheckmarkOutline size={25} className="p-1" />
                            </div>
                          ) : null}
                          <p className="font-medium text-left">
                            {product.title}
                          </p>
                          <Image
                            className="border rounded-xl"
                            height={50}
                            width={50}
                            alt={product.title}
                            src={product.image || DEFAULT_IMAGE}
                          />
                        </button>
                      ))
                    ) : (
                      <p>No Products</p>
                    )}
                  </>
                )}
              </div>
            </section>
            <section className="px-4 space-y-2 overflow-hidden">
              <p className="text-sm font-medium text-center md:text-lg">
                Información del registro
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label
                    className="font-medium text-center text-secondary md:text-lg"
                    htmlFor="quantity"
                  >
                    Cantidad
                  </label>
                  <input
                    type="number"
                    className="input"
                    id="quantity"
                    min={1}
                    required
                    {...register('quantity', {
                      required: true,
                      min: 0,
                      max: 100,
                    })}
                  />
                  <small className="text-red-500">
                    {errors.quantity?.type === 'min' && errors.quantity.message}
                  </small>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    className="font-medium text-center text-secondary md:text-lg"
                    htmlFor="date"
                  >
                    Fecha
                  </label>
                  <input
                    type="date"
                    className="input"
                    id="date"
                    required
                    {...register('date', { required: true })}
                  />
                  <small className="text-red-500">{errors.date?.message}</small>
                </div>
              </div>
            </section>

            <section className="flex justify-center gap-4">
              <button className={'btn-danger'} onClick={handleCancel}>
                Cancelar
              </button>
              <button
                className={clsx(
                  isValid &&
                    ((selectedTab === 'dishes' && !!dishes.length) ||
                      (selectedTab === 'products' && !!products?.length))
                    ? 'btn-primary'
                    : 'btn-disabled',
                )}
                type="submit"
                disabled={
                  !isValid ||
                  (selectedTab === 'dishes' && !dishes.length) ||
                  (selectedTab === 'products' && !products?.length)
                }
              >
                Confirmar
              </button>
            </section>
          </div>
        </form>
      )}
    </>
  );
};
