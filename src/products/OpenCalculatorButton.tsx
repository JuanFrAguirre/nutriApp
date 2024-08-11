'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { IoCalculatorOutline } from 'react-icons/io5';

export const OpenCalculatorButton = () => {
  const router = useRouter();

  const navigateToCalculator = () => {
    router.push('/calculator');
  };

  const { products } = useCalculatorStore();

  return (
    <button
      onClick={navigateToCalculator}
      className={clsx(
        'fixed flex items-center justify-center p-2 rounded-full shadow-lg bg-gradient-radial from-green-600 to-green-500 bottom-24 right-5 btn-primary z-90',
        !products.length && 'hidden',
      )}
    >
      <IoCalculatorOutline size={30} />
      {!!products.length && (
        <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex justify-center items-center">
          <small>{products.length}</small>
        </div>
      )}
    </button>
  );
};
