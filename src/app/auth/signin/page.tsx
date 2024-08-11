import { auth, providerMap, signIn } from '@/auth';
import { frankfurter } from '@/fonts/fonts';
import clsx from 'clsx';
import { AuthError } from 'next-auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { FaGithub, FaGoogle } from 'react-icons/fa';

import Logo from '../../../../public/nutriApp/SCR-20240811-o1q.png';

export default async function SignInPage() {
  const session = await auth();

  if (session?.user) redirect('/');
  return (
    <div className="flex flex-col py-20 justify-between items-center gap-10 grow px-10 max-w-xl mx-auto">
      <div className="space-y-10 flex flex-col items-center">
        <Image
          alt="NutriAppPro"
          src={Logo}
          width={300}
          height={300}
          className="rounded-full"
        />
        <h1 className="text-3xl sm:text-4xl space-y-5 font-bold text-center">
          Bienvenido a <br className="sm:hidden" />
          <span
            className={clsx(
              frankfurter.className,
              'font-normal tracking-wide text-primary text-4xl sm:text-5xl',
            )}
          >
            Nutri App Pro
          </span>
        </h1>
      </div>
      <div className="flex flex-col items-center gap-10 w-full">
        {Object.values(providerMap).map((provider) => (
          <form
            key={provider.id}
            action={async () => {
              'use server';
              try {
                await signIn(provider.id);
                redirect('/');
              } catch (error) {
                if (error instanceof AuthError) {
                  return redirect(`/`);
                }
                throw error;
              }
            }}
            className="w-full"
          >
            <button
              type="submit"
              className={clsx('btn-primary w-full', {
                'bg-blue-600': provider.name.toLowerCase() === 'google',
                'bg-black': provider.name.toLowerCase() === 'github',
              })}
            >
              <div className="flex flex-row gap-2 max-sm:px-4 sm:gap-4 items-center justify-between sm:justify-center py-1">
                {provider.name.toLowerCase() === 'google' && (
                  <FaGoogle size={30} />
                )}
                {provider.name.toLowerCase() === 'github' && (
                  <FaGithub size={30} />
                )}
                <span>Iniciar sesión con {provider.name}</span>
              </div>
            </button>
          </form>
        ))}
      </div>

      {/* <div className="flex flex-col w-full gap-10">
        <div className="flex justify-between items-center gap-4">
          <div className="h-0.5 grow bg-gray-300 w-full" />
          <p>o</p>
          <div className="h-0.5 grow bg-gray-300 w-full" />
        </div>
        <Link
          href={'/auth/new-account'}
          className="btn-primary bg-primary text-center py-3"
        >
          Crear cuenta
        </Link>
      </div> */}
    </div>
  );
}
