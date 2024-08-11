import { auth } from '@/auth';
import Image from 'next/image';

export default async function ProfilePage() {
  const session = await auth();

  const { name, email, image } = session?.user!;

  return (
    <main className="flex grow justify-center items-start gap-6 my-32 max-sm:flex-col max-sm:items-center max-sm:my-0">
      <Image
        alt={name!}
        src={image!}
        width={500}
        height={500}
        className="w-40 h-40 rounded-xl"
      />
      <div>
        <p className="text-2xl">
          <p className="text-secondary">Nombre:</p> {name}
        </p>
        <p className="text-2xl">
          <p className="text-secondary">Correo electrónico:</p> {email}
        </p>
      </div>
    </main>
  );
}
