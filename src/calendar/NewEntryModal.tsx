'use client';
import { getDishes } from '@/actions';
import { createCalendarEntry } from '@/actions/calendar-entries-actions/calendar-entries-actions';
import { DishWithProducts } from '@/interfaces/interfaces';
import { DEFAULT_IMAGE } from '@/utils';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { FaCheckCircle } from 'react-icons/fa';
import { IoCheckmarkOutline } from 'react-icons/io5';

interface Props {
  isNewEntryModalOpen: boolean;
  closeNewEntryModal: () => void;
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
}

interface FormInputs {
  quantity: number;
  date: string;
}

export const NewEntryModal = ({
  isNewEntryModalOpen,
  closeNewEntryModal,
  date,
  setDate,
}: Props) => {
  const [dishes, setDishes] = useState<DishWithProducts[]>([]);
  const [selectedDish, setSelectedDish] = useState({} as DishWithProducts);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty, errors },
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

  useEffect(() => {
    getUserDishes();
  }, [getUserDishes]);

  const onEntrySubmit = async (data: FormInputs) => {
    const { date, quantity } = data;
    let newEntry = await createCalendarEntry(
      selectedDish.id,
      date,
      Number(quantity),
    );
    if (!newEntry.ok) {
      console.log(newEntry);
      return;
    }
    closeNewEntryModal();
    reset();
    setDate(date);
    router.refresh();
  };

  const handleCancel = () => {
    closeNewEntryModal();
    reset();
  };

  useEffect(() => {
    setValue('date', date);
  }, [date, setValue]);

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
            'fixed my-auto bg-gradient-to-br from-stone-50 to bg-green-50 mx-auto w-[80%] h-auto max-h-[80%] z-20 rounded-xl shadow-2xl flex overflow-y-auto',
          )}
          onSubmit={handleSubmit(onEntrySubmit)}
        >
          <div className="grow py-4 space-y-4">
            <section className="space-y-2">
              <p className="font-medium text-secondary md:text-lg text-center">
                Tus comidas
              </p>
              <div className="flex flex-col gap-4 max-h-[300px] border-b overflow-y-auto py-4 px-4">
                {dishes.map((dish) => (
                  <button
                    key={dish.id}
                    className={clsx(
                      'grid grid-cols-12 gap-2 border-2 p-2 rounded-xl items-center relative',
                      selectedDish.id === dish.id ? 'border-secondary' : '',
                    )}
                    type="button"
                    onClick={() => setSelectedDish(dish)}
                  >
                    {selectedDish.id === dish.id ? (
                      <div className="absolute -top-3 -right-2.5 bg-secondary rounded-full text-white">
                        <IoCheckmarkOutline size={25} className="p-1" />
                      </div>
                    ) : null}
                    <p className="font-medium text-left col-span-4">
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
                ))}
              </div>
            </section>
            <section className="space-y-2 px-4 overflow-hidden">
              <p className="font-medium text-secondary md:text-lg text-center">
                Información del registro
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label
                    className="font-medium text-secondary md:text-lg text-center"
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
                    className="font-medium text-secondary md:text-lg text-center"
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
              <button
                className={clsx(!isValid ? 'btn-disabled' : 'btn-danger')}
                onClick={handleCancel}
                disabled={!isValid}
              >
                Cancelar
              </button>
              <button
                className={clsx(!isValid ? 'btn-disabled' : 'btn-primary')}
                type="submit"
                disabled={!isValid}
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
