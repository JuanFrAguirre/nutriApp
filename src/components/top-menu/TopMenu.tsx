'use client';
import { OpenCalculatorButton } from '@/products';
import { useSidemenuStore } from '@/store';
import { usePathname } from 'next/navigation';
import { IoMenuOutline } from 'react-icons/io5';

export const TopMenu = () => {
  const { openSideMenu } = useSidemenuStore();

  const closeMenu = () => {
    openSideMenu();
  };

  const pathname = usePathname();

  return (
    <nav>
      <button
        onClick={closeMenu}
        className="fixed flex items-center justify-center p-2 rounded-l-[18px] rounded-r-none shadow shadow-green-700/75 max-md:bottom-10 md:top-10 right-0 btn-primary z-90 fade-in transition-all pr-4 border border-green-600"
      >
        <IoMenuOutline size={30} />
      </button>
      {!['/calculator', '/products/new', '/dishes/new'].includes(pathname) && (
        <OpenCalculatorButton />
      )}
    </nav>
  );
};
