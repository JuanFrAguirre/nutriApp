import { auth } from '@/auth';
import { Confirmation, LoadingSpinner, Sidebar, TopMenu } from '@/components';
import { redirect } from 'next/navigation';

export default async function AppLayoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) redirect('/auth/signin');

  return (
    <>
      <TopMenu />
      <div className="md:mt-20 xl:mt-24">{children}</div>
      <Sidebar />
      <Confirmation />
      <LoadingSpinner />
    </>
  );
}
