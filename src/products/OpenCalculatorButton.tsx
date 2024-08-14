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
        'fixed flex items-center justify-center p-2 rounded-l-[18px] rounded-r-none shadow shadow-green-700/75 bottom-24 md:hidden right-0 btn-primary z-90 fade-in transition-all pr-4 border border-green-600',
        !products.length && 'hidden',
      )}
    >
      <div className="relative">
        <IoCalculatorOutline size={30} />
        {!!products.length && (
          <div className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-5 h-5 flex justify-center items-center">
            <small>{products.length}</small>
          </div>
        )}
      </div>
    </button>
  );
};
