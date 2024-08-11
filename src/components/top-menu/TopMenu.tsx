'use client';
import { useSidemenuStore } from '@/store';
import { IoMenuOutline } from 'react-icons/io5';

export const TopMenu = () => {
  const { openSideMenu } = useSidemenuStore();

  const closeMenu = () => {
    openSideMenu();
  };

  return (
    <nav>
      <button
        onClick={closeMenu}
        className="fixed flex items-center justify-center p-2 rounded-full shadow-lg bg-gradient-radial from-green-600 to-green-500 bottom-10 right-5 btn-primary"
      >
        <IoMenuOutline size={30} />
      </button>
    </nav>
  );
};
