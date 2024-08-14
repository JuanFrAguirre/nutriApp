'use client';
import { logout } from '@/actions';
import { frankfurter } from '@/fonts/fonts';
import { OpenCalculatorButton } from '@/products';
import { useSidemenuStore } from '@/store';
import { useCalculatorStore } from '@/store/calculator-store';
import { APP_IMAGE } from '@/utils';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  IoAddCircleOutline,
  IoCalculatorOutline,
  IoCalendarOutline,
  IoCartOutline,
  IoLogOutOutline,
  IoMenuOutline,
  IoPersonOutline,
  IoRestaurantOutline,
} from 'react-icons/io5';

export const TopMenu = () => {
  const { openSideMenu, isSideMenuOpen, closeSideMenu } = useSidemenuStore();
  const { products } = useCalculatorStore();

  const toggleMenu = () => {
    isSideMenuOpen ? closeSideMenu() : openSideMenu();
  };

  const pathname = usePathname();

  return (
    <div className="z-20">
      {/* Desktop (from 768px) */}
      <section className="max-md:hidden fixed top-0 left-0 right-0 h-20 bg-secondary">
        <div className="flex items-center justify-between max-w-7xl mx-auto h-full max-2xl:p-4">
          <Link href={'/'} className="flex gap-4 items-center group">
            <Image
              height={100}
              width={100}
              alt="NutriAppPro"
              src={APP_IMAGE}
              className="rounded-full w-[50px] h-[42px] object-contain"
            />
            <h2
              className={clsx(
                frankfurter.className,
                'text-3xl font-medium text-white group-hover:scale-[1.05] origin-top transform transition-all',
              )}
            >
              Nutri App Pro
            </h2>
          </Link>

          {/* Desktop up to 1024px */}
          <nav className="flex gap-5 items-center text-white lg:hidden">
            {!!products.length && (
              <Link
                href={'/calculator'}
                className="p-2 relative group hover:scale-[1.1] transform transition-all"
              >
                <IoCalculatorOutline size={30} className="" />
                <p className="absolute top-0 right-0 bg-red-500 text-xs w-5 h-5 rounded-full grid place-items-center">
                  {products.length}
                </p>
              </Link>
            )}
            <button
              className="flex items-center justify-center p-2 hover:scale-[1.1] transform transition-all"
              onClick={toggleMenu}
            >
              <IoMenuOutline size={40} />
            </button>
          </nav>

          {/* Desktop from 1024px + */}
          <nav className="max-lg:hidden flex items-center text-white gap-4">
            <Link
              href={'/products'}
              className="flex xl:flex-col-reverse hover:scale-[1.1] transform transition-all xl:gap-0.5 items-center gap-2  p-2"
            >
              <span className="max-xl:hidden">Productos</span>
              <IoCartOutline size={30} className="xl:hidden" />
              <IoCartOutline size={30} className="max-xl:hidden" />
            </Link>

            {/*  */}

            <Link
              href={'/products/new'}
              className="flex xl:flex-col-reverse hover:scale-[1.1] transform transition-all xl:gap-0.5 items-center gap-2  p-2 relative"
            >
              <span className="max-xl:hidden">Agregar producto</span>
              <IoCartOutline size={30} className="xl:hidden" />
              <IoCartOutline size={30} className="max-xl:hidden" />
              <IoAddCircleOutline
                className="absolute -top-1 -right-1 xl:top-0 xl:right-11"
                size={20}
              />
            </Link>

            {/*  */}

            <Link
              href={'/dishes'}
              className="flex xl:flex-col-reverse hover:scale-[1.1] transform transition-all xl:gap-0.5 items-center gap-2  p-2"
            >
              <span className="max-xl:hidden">Comidas</span>
              <IoRestaurantOutline size={30} className="xl:hidden" />
              <IoRestaurantOutline size={30} className="max-xl:hidden" />
            </Link>

            {/*  */}

            <Link
              href={'/calculator'}
              className="flex xl:flex-col-reverse hover:scale-[1.1] transform transition-all xl:gap-0.5 items-center gap-2  p-2 relative"
            >
              <span className="max-xl:hidden">Calculadora</span>
              <IoCalculatorOutline size={30} className="xl:hidden" />
              <IoCalculatorOutline size={30} className="max-xl:hidden" />
              {!!products.length && (
                <p className="absolute top-0 right-0 xl:right-7 bg-red-500 rounded-full w-5 h-5 grid place-items-center text-sm">
                  {products.length}
                </p>
              )}
            </Link>

            {/*  */}

            <Link
              href={'/calendar'}
              className="flex xl:flex-col-reverse hover:scale-[1.1] transform transition-all xl:gap-0.5 items-center gap-2  p-2"
            >
              <span className="max-xl:hidden">Registros</span>
              <IoCalendarOutline size={30} className="xl:hidden" />
              <IoCalendarOutline size={30} className="max-xl:hidden" />
            </Link>

            {/*  */}

            <Link
              href={'/profile'}
              className="flex xl:flex-col-reverse hover:scale-[1.1] transform transition-all xl:gap-0.5 items-center gap-2  p-2"
            >
              <span className="max-xl:hidden">Perfil</span>
              <IoPersonOutline size={30} className="xl:hidden" />
              <IoPersonOutline size={30} className="max-xl:hidden" />
            </Link>

            {/*  */}

            <button
              onClick={() => logout()}
              className="flex xl:flex-col-reverse hover:scale-[1.1] transform transition-all xl:gap-0.5 items-center gap-2  p-2"
            >
              <span className="max-xl:hidden">Cerrar Sesión</span>
              <IoLogOutOutline size={30} className="xl:hidden" />
              <IoLogOutOutline size={30} className="max-xl:hidden" />
            </button>
          </nav>
        </div>
      </section>

      {/* Mobile and tablet (up to 768px) */}
      <button
        onClick={toggleMenu}
        className="fixed flex items-center justify-center p-2 rounded-full shadow shadow-green-700/75 bottom-10 md:hidden right-5 btn-primary z-90 fade-in transition-all border border-green-600"
      >
        <IoMenuOutline size={30} />
      </button>
      {!['/calculator', '/products/new', '/dishes/new'].includes(pathname) && (
        <OpenCalculatorButton />
      )}
    </div>
  );
};
