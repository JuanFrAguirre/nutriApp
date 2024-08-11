import { auth, signOut } from '@/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();

  if (!session) redirect('/auth/signin');

  redirect('/products');

  return (
    <main className="flex flex-col items-center justify-center gap-20 grow">
      <div className="flex flex-col gap-10">
        {session?.user ? (
          <form
            action={async () => {
              'use server';
              try {
                await signOut();
              } catch (error) {
                throw error;
              }
            }}
          >
            <button type="submit" className="btn">
              Sign Out
            </button>
          </form>
        ) : (
          <Link className="btn-primary" href={'/auth/signin'}>
            Iniciar sesión
          </Link>
        )}
      </div>
    </main>
  );
}
