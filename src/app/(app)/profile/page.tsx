import { getCalendarEntries, getDishes } from '@/actions';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await auth();

  const { name, email, image } = session?.user!;

  const dishes = await getDishes();
  const entries = await getCalendarEntries();

  if (!session) redirect('/');

  return (
    <main className="flex grow gap-10 my-32 flex-col sm:flex-row items-center justify-center">
      <Image
        alt={name!}
        src={image!}
        width={500}
        height={500}
        className="w-40 h-40 rounded-full border-secondary border-2"
      />
      <div className="space-y-6">
        <p className="text-lg">
          <span className="text-secondary font-semibold">Nombre</span>
          <br />
          {name}
        </p>
        <p className="text-lg">
          <span className="text-secondary font-semibold">
            Correo electrónico
          </span>
          <br />
          {email}
        </p>
        <p className="text-lg">
          <span className="text-secondary font-semibold">
            Comidas guardadas
          </span>
          <br />
          {dishes.length}
        </p>
        <p className="text-lg">
          <span className="text-secondary font-semibold">Días trackeados</span>
          <br />
          {entries.length}
        </p>
      </div>
    </main>
  );
}
