'use client';
import { logout } from '@/actions';
import { useSidemenuStore } from '@/store';
import { useCalculatorStore } from '@/store/calculator-store';
import { useLoadingStore } from '@/store/global-loading-store';
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
  const { setIsLoading } = useLoadingStore();

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;

  const pathname = usePathname();

  const handleLogout = useCallback(async () => {
    setIsLoading(true);
    await logout();
    closeMenu();
    setIsLoading(false);
    window.location.replace('/');
  }, [closeMenu]);

  const links = useMemo(
    () => [
      {
        text: 'Registros',
        href: '/calendar',
        onClick: () => closeMenu(),
        icon: <IoCalendarOutline size={25} />,
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
        text: 'Calculadora',
        href: '/calculator',
        onClick: () => closeMenu(),
        icon: <IoCalculatorOutline size={25} />,
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
        <div className="fixed top-0 left-0 z-20 w-screen h-screen bg-black/35"></div>
      )}

      {/* Blur */}
      {isSideMenuOpen && (
        <div
          className="fixed top-0 left-0 z-20 w-screen h-screen transition-all fade-in backdrop-filter backdrop-blur-[3px]"
          onClick={closeMenu}
        ></div>
      )}

      {/* Sidemenu */}
      <nav
        className={clsx(
          'fixed max-md:py-5 md:pb-5 right-0 md:top-0 max-md:bottom-2 max-md:right-2 max-md:w-auto md:w-[500px] h-auto bg-gradient-to-br from-white to-green-100 z-20 shadow-2xl transform transition-all duration-300 max-md:rounded-xl overflow-y-auto rounded-bl-xl',
          {
            'translate-x-full max-md:translate-x-[100vw] -right-10 max-md:translate-y-[25%] ':
              !isSideMenuOpen,
          },
        )}
      >
        {!isAuthenticated ? null : (
          <h2 className="items-center justify-center p-2 text-2xl font-semibold text-center max-md:mb-3 md:mb-px md:h-20 md:flex text-primary ">
            Hola, {session?.user?.name?.split(' ')[0]}!
          </h2>
        )}
        <div className="flex flex-col gap-px">
          {links.map((link, i) =>
            link.type === 'link' ? (
              <Link
                key={link.text}
                href={link.href || ''}
                className={clsx(
                  'py-3 px-5 flex gap-4 hover:text-white hover:bg-gradient-to-r from-secondary to-primary',
                  pathname === link.href &&
                    'text-white bg-gradient-to-r from-secondary to-primary',
                )}
                onClick={link.onClick}
                tabIndex={!isSideMenuOpen ? -1 : undefined}
              >
                {link.icon}
                <p className="text-xl">{link.text}</p>
              </Link>
            ) : (
              <button
                key={link.text}
                className={clsx(
                  'p-2 px-5 flex gap-4 hover:text-white hover:bg-secondary transition-all',
                )}
                onClick={link.onClick}
                disabled={!isSideMenuOpen}
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
