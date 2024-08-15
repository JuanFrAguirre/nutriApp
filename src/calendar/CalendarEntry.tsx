'use client';

import { CalendarEntryWithAllData } from '@/interfaces/interfaces';
import {
  dateToString,
  DEFAULT_IMAGE,
  isSameDay,
  renderSelectedNutritionalValueFromCalendarEntries,
  stringToDate,
} from '@/utils';
import clsx from 'clsx';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { CgSpinnerAlt } from 'react-icons/cg';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { IoAddCircleOutline } from 'react-icons/io5';
import { NewEntryModal } from './NewEntryModal';
import { EntryButtons } from './EntryButtons';
import { customRound } from '../utils';

interface Props {
  entries: CalendarEntryWithAllData[];
}

const today = new Date();

export const CalendarEntry = ({ entries }: Props) => {
  const [date, setDate] = useState<string>(dateToString(today));
  const [selectedEntries, setSelectedEntries] = useState(
    {} as CalendarEntryWithAllData[],
  );
  const [loading, setLoading] = useState(true);
  const [isNewEntryModalOpen, setIsNewEntryModalOpen] = useState(false);

  const changeDate = useCallback((modifier: number) => {
    setDate((prev) => {
      const newDate = stringToDate(prev);
      newDate.setDate(stringToDate(prev).getDate() + modifier);
      return dateToString(newDate);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    setSelectedEntries(
      entries.filter((entry) => isSameDay(entry.date, stringToDate(date))) ??
        ({} as CalendarEntryWithAllData),
    );
    setLoading(false);
  }, [date, entries]);

  const openNewEntryModal = () => setIsNewEntryModalOpen(true);
  const closeNewEntryModal = () => setIsNewEntryModalOpen(false);

  const handleAddEntry = () => {
    openNewEntryModal();
  };

  return (
    <>
      <NewEntryModal
        isNewEntryModalOpen={isNewEntryModalOpen}
        closeNewEntryModal={closeNewEntryModal}
        date={date}
        setDate={setDate}
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

        <main className="grow space-y-2">
          <p className="font-semibold text-secondary text-center">Comidas</p>
          {loading ? (
            <div className="grow grid place-items-center">
              <CgSpinnerAlt size={50} className="animate-spin text-secondary" />
            </div>
          ) : !!selectedEntries.length ? (
            <div className="flex flex-col gap-4">
              {selectedEntries.map((entry, i) =>
                entry.Entry_Dish.map(({ Dish: dish }) => (
                  <article
                    key={dish.id}
                    className={clsx('flex gap-2 border-2 p-2 rounded-xl')}
                  >
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
                          dish={dish}
                          entry={selectedEntries[i].id}
                        />
                      </div>
                    </div>
                  </article>
                )),
              )}
            </div>
          ) : (
            <div className="grow flex items-center justify-center">
              <p className="text-center">Aún no hay registros para este día</p>
            </div>
          )}
          <p className="font-semibold text-secondary text-center">
            Valores diarios
          </p>
          {loading ? (
            <div className="grow grid place-items-center">
              <CgSpinnerAlt size={50} className="animate-spin text-secondary" />
            </div>
          ) : (
            <section>
              <div className="flex justify-between">
                <p>Calorías totales</p>
                <span className="border-b mx-2 mb-1.5 border-stone-300 grow min-w-2 self-stretch" />
                <p className="text-secondary font-medium">
                  {renderSelectedNutritionalValueFromCalendarEntries(
                    'calories',
                    selectedEntries,
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
                    selectedEntries,
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
                    selectedEntries,
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
                    selectedEntries,
                  )}
                  g
                </p>
              </div>
            </section>
          )}
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
