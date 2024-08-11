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
        className="fixed flex items-center justify-center p-2 rounded-full shadow-lg bg-gradient-radial from-green-600 to-green-500 bottom-10 right-5 btn-primary z-90"
      >
        <IoMenuOutline size={30} />
      </button>
      {pathname !== '/calculator' && <OpenCalculatorButton />}
    </nav>
  );
};
