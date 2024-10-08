import clsx from 'clsx';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/providers/AuthProvider';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nutri App Pro',
  description: 'Una aplicación para calcular y trackear tu alimentación.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(openSans.className, 'min-h-screen flex flex-col')}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
