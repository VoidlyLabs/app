'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import HeaderWidget from '@/widgets/header/header.widget.tsx';
import FooterWidget from '@/widgets/footer/footer.widget.tsx';

export interface AppShellProps {
  children: React.ReactNode;
}

const authRoutes = ['/signin', '/register'];

const AppShell = ({ children }: AppShellProps) => {
  const pathname = usePathname();
  const isAuthRoute = authRoutes.some((route) => pathname.endsWith(route));

  if (isAuthRoute) {
    return <main className={'min-h-screen'}>{children}</main>;
  }

  return (
    <>
      <HeaderWidget />

      <main className={'w-full justify-center flex py-4 xl:px-0 px-2'}>
        <div className={'max-w-(--layout-area) w-full'}>{children}</div>
      </main>

      <FooterWidget />
    </>
  );
};

export default AppShell;
