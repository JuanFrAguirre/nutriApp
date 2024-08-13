import { auth } from '@/auth';
import { Confirmation, Sidebar, TopMenu } from '@/components';
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
      {children}
      <Sidebar />
      <Confirmation />
      <TopMenu />
    </>
  );
}
