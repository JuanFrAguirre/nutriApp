'use client';

import { getCalendarEntries } from '@/actions';
import { CalendarEntryWithAllData } from '@/interfaces/interfaces';
import { isSameDay } from '@/utils';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { IoAddCircleOutline } from 'react-icons/io5';

interface Props {
  entries: CalendarEntryWithAllData[];
}

const today = new Date();

export const CalendarEntry = ({ entries }: Props) => {
  const [date, setDate] = useState(new Date());
  const [selectedEntry, setSelectedEntry] = useState(
    {} as CalendarEntryWithAllData,
  );

  const changeDate = useCallback((modifier: number) => {
    setDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + modifier);
      return newDate;
    });
  }, []);

  useEffect(() => {
    setSelectedEntry(
      entries.find((entry) => isSameDay(entry.date, date)) ??
        ({} as CalendarEntryWithAllData),
    );
  }, [date, entries]);

  const handleAddEntry = () => {};

  return (
    <div
      className={clsx(
        'grow bg-white/75 p-4 rounded-xl w-[90%] max-w-[400px] flex flex-col min-h-[600px] border-2 relative shadow-xl',
        isSameDay(date, today) ? 'border-secondary' : 'border-stone-200',
      )}
    >
      {/* Today's indicator */}
      {isSameDay(date, today) && (
        <div className="absolute -top-4 right-0 left-0 flex justify-center">
          <span className="px-1 border-secondary rounded-md border-2 bg-secondary text-white">
            Hoy
          </span>
        </div>
      )}

      {/* Header */}
      <header className="flex justify-between mb-4 pb-4 border-b border-stone-400">
        <button onClick={() => changeDate(-1)}>
          <FaArrowLeft size={15} />
        </button>
        <p className="capitalize font-medium">
          {date.toLocaleDateString('es-AR', {
            weekday: 'long',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
          })}
        </p>
        <button onClick={() => changeDate(1)}>
          <FaArrowRight size={15} />
        </button>
      </header>

      {selectedEntry.Entry_Dish ? (
        <main className="grow">
          <p>Comidas</p>

          {selectedEntry.Entry_Dish.map((entryDish) => (
            <p key={entryDish.id}>{entryDish.Dish.title}</p>
          ))}
        </main>
      ) : (
        <div className="grow flex items-center justify-center">
          <p className="text-center">Aún no hay registros para este día</p>
        </div>
      )}

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
  );
};
