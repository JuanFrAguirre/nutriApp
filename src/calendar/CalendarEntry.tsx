'use client';

import { modifyEntryDishQuantity } from '@/actions/calendar-entries-actions/calendar-entries-actions';
import { CalendarEntryWithAllData } from '@/interfaces/interfaces';
import { useCalendarEntryStore } from '@/store/calendar-entry-store';
import {
  dateToString,
  DEFAULT_IMAGE,
  isSameDay,
  renderSelectedNutritionalValueFromCalendarEntries,
  stringToDate,
} from '@/utils';
import clsx from 'clsx';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { CgSpinnerAlt } from 'react-icons/cg';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import {
  IoAddCircleOutline,
  IoAddOutline,
  IoRemoveOutline,
} from 'react-icons/io5';
import { EntryButtons } from './EntryButtons';
import { NewEntryModal } from './NewEntryModal';

interface Props {
  entries: CalendarEntryWithAllData[];
}

const today = new Date();

export const CalendarEntry = ({ entries }: Props) => {
  const { date, setDate } = useCalendarEntryStore();
  const [selectedEntry, setSelectedEntry] = useState(
    {} as CalendarEntryWithAllData,
  );
  const [loading, setLoading] = useState(true);
  const [isNewEntryModalOpen, setIsNewEntryModalOpen] = useState(false);
  const router = useRouter();

  const changeDate = useCallback(
    (modifier: number) => {
      const newDate = stringToDate(date);
      newDate.setDate(stringToDate(date).getDate() + modifier);
      setDate(dateToString(newDate));
    },
    [date, setDate],
  );

  useEffect(() => {
    setLoading(true);
    setSelectedEntry(
      entries.find((entry) => isSameDay(entry.date, stringToDate(date))) ??
        ({} as CalendarEntryWithAllData),
    );
    setLoading(false);
  }, [date, entries]);

  const openNewEntryModal = () => setIsNewEntryModalOpen(true);
  const closeNewEntryModal = () => setIsNewEntryModalOpen(false);

  const handleAddEntry = () => {
    openNewEntryModal();
  };

  const handleModifyQuantity = async (id: string, quantity: number) => {
    await modifyEntryDishQuantity(id, quantity);
    router.refresh();
  };

  return (
    <>
      <NewEntryModal
        isNewEntryModalOpen={isNewEntryModalOpen}
        closeNewEntryModal={closeNewEntryModal}
      />
      <div
        className={clsx(
          'grow bg-white/75 p-4 rounded-xl w-[90%] max-w-[400px] flex flex-col min-h-[600px] border-2 relative shadow-xl',
          isSameDay(stringToDate(date), today)
            ? 'border-secondary'
            : 'border-stone-200',
        )}
      >
        {/* Today's indicator */}
        {isSameDay(stringToDate(date), today) && (
          <div className="absolute -top-4 right-0 left-0 flex justify-center">
            <span className="px-1 border-secondary rounded-md border-2 bg-secondary text-white">
              Hoy
            </span>
          </div>
        )}

        {/* Header */}
        <header className="flex justify-between mb-5 pb-5 border-b border-stone-400">
          <button onClick={() => changeDate(-1)}>
            <FaArrowLeft size={15} />
          </button>
          <div>
            <input
              type="date"
              className="bg-transparent"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button onClick={() => changeDate(1)}>
            <FaArrowRight size={15} />
          </button>
        </header>

        <main className="grow space-y-2 mb-4">
          <p className="font-semibold text-secondary text-center">Comidas</p>
          {loading ? (
            <div className="grow grid place-items-center">
              <CgSpinnerAlt size={50} className="animate-spin text-secondary" />
            </div>
          ) : !isEmpty(selectedEntry.Entry_Dish) ? (
            <div className="flex flex-col gap-4 max-h-[300px] py-2 overflow-y-auto">
              {selectedEntry.Entry_Dish.map((entryDish, i) => {
                const { Dish: dish } = entryDish;
                return (
                  <article
                    key={dish.id}
                    className={clsx(
                      'flex flex-col gap-4 border-2 p-3 rounded-xl',
                    )}
                  >
                    {dish.isProduct ? (
                      <div key={dish.id} className="flex items-center gap-2">
                        <div
                          className={clsx(
                            'flex justify-between items-center rounded-xl gap-2 relative grow',
                          )}
                        >
                          <p className="font-medium text-left">{dish.title}</p>
                          <Image
                            className="border rounded-xl"
                            height={75}
                            width={75}
                            alt={dish.title}
                            src={
                              dish.Dish_Product[0].product.image ||
                              DEFAULT_IMAGE
                            }
                          />
                        </div>
                        <div className="relative">
                          <EntryButtons
                            dish={entryDish}
                            entry={selectedEntry.id}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-12 gap-2 items-center">
                        <p className="font-medium text-left col-span-4">
                          {dish.title}
                        </p>
                        <div className="grid grid-cols-3 gap-0.5 border-l pl-2 col-span-7">
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

                        {/* Menu */}
                        <div className="relative">
                          <EntryButtons
                            dish={entryDish}
                            entry={selectedEntry.id}
                          />
                        </div>
                      </div>
                    )}

                    <div className="h-px bg-stone-200" />

                    {entryDish && (
                      <div className="flex justify-center items-center gap-4">
                        <button
                          className={
                            entryDish.quantity <= 1
                              ? 'btn-disabled'
                              : 'btn-primary'
                          }
                          onClick={() => {
                            if (entryDish.quantity <= 1) return;
                            handleModifyQuantity(entryDish.id, -1);
                          }}
                          disabled={entryDish.quantity <= 1}
                        >
                          <IoRemoveOutline />
                        </button>
                        <p className="">
                          {entryDish.quantity} unidad
                          {entryDish.quantity === 1 ? '' : 'es'}
                        </p>
                        <button
                          className="btn-primary"
                          onClick={() => {
                            handleModifyQuantity(entryDish.id, 1);
                          }}
                        >
                          <IoAddOutline />
                        </button>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="grow flex items-center justify-center">
              <p className="text-center">Aún no hay registros para este día</p>
            </div>
          )}
          {!isEmpty(selectedEntry.Entry_Dish) && (
            <p className="font-semibold text-secondary text-center">
              Valores diarios
            </p>
          )}
          {loading ? (
            <></>
          ) : !isEmpty(selectedEntry.Entry_Dish) ? (
            <section>
              <div className="flex justify-between">
                <p>Calorías totales</p>
                <span className="border-b mx-2 mb-1.5 border-stone-300 grow min-w-2 self-stretch" />
                <p className="text-secondary font-medium">
                  {renderSelectedNutritionalValueFromCalendarEntries(
                    'calories',
                    selectedEntry,
                  )}
                  kcal
                </p>
              </div>
              <div className="flex justify-between">
                <p>Proteínas totales</p>
                <span className="border-b mx-2 mb-1.5 border-stone-300 grow min-w-2 self-stretch" />
                <p className="text-secondary font-medium">
                  {renderSelectedNutritionalValueFromCalendarEntries(
                    'proteins',
                    selectedEntry,
                  )}
                  g
                </p>
              </div>
              <div className="flex justify-between">
                <p>Carbohidratos totales</p>
                <span className="border-b mx-2 mb-1.5 border-stone-300 grow min-w-2 self-stretch" />
                <p className="text-secondary font-medium">
                  {renderSelectedNutritionalValueFromCalendarEntries(
                    'carbohydrates',
                    selectedEntry,
                  )}
                  g
                </p>
              </div>
              <div className="flex justify-between">
                <p>Grasas totales</p>
                <span className="border-b mx-2 mb-1.5 border-stone-300 grow min-w-2 self-stretch" />
                <p className="text-secondary font-medium">
                  {renderSelectedNutritionalValueFromCalendarEntries(
                    'fats',
                    selectedEntry,
                  )}
                  g
                </p>
              </div>
            </section>
          ) : null}
        </main>

        <footer className="flex justify-end">
          <button
            className="flex items-center btn-primary gap-2"
            onClick={handleAddEntry}
          >
            <p>Añadir registro</p>
            <IoAddCircleOutline size={35} />
          </button>
        </footer>
      </div>
    </>
  );
};
