'use client';

import { useLoadingStore } from '@/store/global-loading-store';
import { ImSpinner2 } from 'react-icons/im';

export const LoadingSpinner = () => {
  const { isLoading, setIsLoading } = useLoadingStore();

  return (
    isLoading && (
      <>
        <div className="fixed inset-0 z-30 bg-white/10" />
        <div className="fixed inset-0 z-30 transition-all fade-in backdrop-filter backdrop-blur-[4px]" />
        <div className="fixed inset-0 z-30 grid place-items-center">
          <ImSpinner2 size={50} className="text-secondary animate-spin" />
        </div>
      </>
    )
  );
};
