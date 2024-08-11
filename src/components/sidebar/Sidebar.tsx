'use client';
import { logout } from '@/actions';
import { useSidemenuStore } from '@/store';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import {
  IoAddCircleOutline,
  IoCalculatorOutline,
  IoCalendarOutline,
  IoCartOutline,
  IoLogOutOutline,
  IoPersonOutline,
  IoRestaurantOutline,
} from 'react-icons/io5';

export const Sidebar = () => {
  const { isSideMenuOpen, closeSideMenu: closeMenu } = useSidemenuStore();

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;

  const pathname = usePathname();

  const handleLogout = useCallback(async () => {
    await logout();
    closeMenu();
    window.location.replace('/');
  }, [closeMenu]);

  const links = useMemo(
    () => [
      {
        text: 'Productos',
        href: '/products',
        onClick: () => closeMenu(),
        icon: <IoCartOutline size={25} />,
        type: 'link',
      },
      {
        text: 'Agregar un producto',
        href: '/products/new',
        onClick: () => closeMenu(),
        icon: (
          <div className="relative w-[25px]">
            <IoCartOutline size={25} className="absolute" />
            <IoAddCircleOutline
              className="absolute -top-2 -right-2"
              size={15}
            />
          </div>
        ),

        type: 'link',
      },
      {
        text: 'Comidas',
        href: '/dishes',
        onClick: () => closeMenu(),
        icon: <IoRestaurantOutline size={25} />,
        type: 'link',
      },
      {
        text: 'Agregar una comida',
        href: '/dishes/new',
        onClick: () => closeMenu(),
        icon: (
          <div className="relative w-[25px]">
            <IoRestaurantOutline size={25} className="absolute" />
            <IoAddCircleOutline
              className="absolute -top-2 -right-2"
              size={15}
            />
          </div>
        ),
        type: 'link',
      },
      {
        text: 'Calculadora',
        href: '/calculator',
        onClick: () => closeMenu(),
        icon: <IoCalculatorOutline size={25} />,
        type: 'link',
      },
      {
        text: 'Calendario',
        href: '/calendar',
        onClick: () => closeMenu(),
        icon: <IoCalendarOutline size={25} />,
        type: 'link',
      },
      {
        text: 'Perfil',
        href: '/profile',
        onClick: () => closeMenu(),
        icon: <IoPersonOutline size={25} />,
        type: 'link',
      },
      {
        text: 'Cerrar sesión',
        onClick: () => {
          handleLogout();
        },
        icon: <IoLogOutOutline size={25} />,
        type: 'button',
      },
    ],
    [handleLogout, closeMenu],
  );

  return (
    <div className="">
      {/* Black background */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 z-10 w-screen h-screen bg-gradient-to-b to-black/30  from-white/30"></div>
      )}

      {/* Blur */}
      {isSideMenuOpen && (
        <div
          className="fixed top-0 left-0 z-10 w-screen h-screen transition-all fade-in backdrop-filter backdrop-blur-[3px]"
          onClick={closeMenu}
        ></div>
      )}

      {/* Sidemenu */}
      <nav
        className={clsx(
          'fixed p-5 right-0 bottom-0 max-sm:bottom-2 max-sm:right-2 max-sm:w-auto sm:w-[500px] max-sm:h-auto h-screen bg-gradient-to-b from-white to-green-50 z-20 shadow-2xl transform transition-all duration-300 max-sm:rounded-xl overflow-y-auto',
          {
            'translate-x-full max-sm:translate-x-[120%] max-sm:translate-y-[25%] ':
              !isSideMenuOpen,
          },
        )}
      >
        {!isAuthenticated ? null : (
          <h2 className="text-2xl p-2 mb-3 font-semibold text-primary text-center">
            Hola, {session?.user?.name?.split(' ')[0]}!
          </h2>
        )}
        <div className="flex flex-col gap-1 ">
          {links.map((link) =>
            link.type === 'link' ? (
              <Link
                key={link.text}
                href={link.href || ''}
                className={clsx(
                  'p-2 flex gap-4 hover:text-secondary',
                  pathname === link.href && 'text-secondary',
                )}
                onClick={link.onClick}
              >
                {link.icon}
                <p className="text-xl">{link.text}</p>
              </Link>
            ) : (
              <button
                key={link.text}
                className={clsx('p-2 flex gap-4 hover:text-secondary')}
                onClick={link.onClick}
              >
                {link.icon}
                <p className="text-xl">{link.text}</p>
              </button>
            ),
          )}
        </div>
      </nav>
    </div>
  );
};
