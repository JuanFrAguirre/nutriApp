'use client';
import { deleteEntryDish } from '@/actions/calendar-entries-actions/calendar-entries-actions';
import { useConfirmationStore } from '@/store/confirmation-store';
import { useLoadingStore } from '@/store/global-loading-store';
import { Entry_Dish } from '@prisma/client';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';

interface Props {
  dish: Entry_Dish;
  entry: string;
}

export const EntryButtons = ({ dish, entry }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { openConfirmation } = useConfirmationStore();
  const { setIsLoading } = useLoadingStore();
  const router = useRouter();

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsAnimating(false);
      }, 100);
    } else setIsMenuOpen(true);
  };

  const handleDelete = async () => {
    const confirmed = await new Promise((resolve) => {
      toggleMenu();
      openConfirmation('Eliminar esta comida del registro?', () =>
        resolve(true),
      );
    });

    if (confirmed) {
      setIsLoading(true);
      await deleteEntryDish(dish.id);
      router.refresh();
    } else {
      openConfirmation('Ha ocurrido un error', () => {});
    }
    setIsLoading(false);
  };

  return (
    <>
      <button
        className="rounded-xl p-0.5 md:px-2 py-2.5 md:py-3.5 grid place-items-center group"
        onClick={toggleMenu}
        type="button"
      >
        <HiDotsVertical
          size={20}
          className="text-secondary transform transition group-hover:scale-[1.1]"
        />
      </button>

      <div
        className={clsx(
          'fixed inset-0 z-30  fade-in transition-all transform',
          isMenuOpen
            ? 'opacity-100 bg-black/10'
            : 'opacity-0 pointer-events-none bg-transparent',
        )}
        onClick={toggleMenu}
      />

      <div
        className={clsx(
          'absolute z-30 my-auto right-0 -top-6 -bottom-6 h-auto bg-white py-2 border border-stone-200 shadow rounded-xl min-w-[100px] space-y-1 transition-all duration-100 origin-right transform flex flex-col',
          isMenuOpen && !isAnimating
            ? 'scale-100 opacity-100'
            : 'scale-50 opacity-0 pointer-events-none',
          isMenuOpen || isAnimating
            ? 'pointer-events-auto'
            : 'pointer-events-none',
        )}
      >
        <Link
          href={`/dishes/${dish.id}`}
          className="block p-1 px-3 transition-all origin-center rounded hover:text-primary"
        >
          <p>Ver más</p>
        </Link>
        <button
          className="block p-1 px-3 text-left transition-all origin-center rounded hover:text-primary"
          onClick={handleDelete}
        >
          <p>Eliminar</p>
        </button>
      </div>
    </>
  );
};
