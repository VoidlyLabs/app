import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import React from 'react';
import ConfigProvider from '@/app/providers/config/config.provider.tsx';
import Providers from '@/app/providers/providers.tsx';
import { getDictionary, Locale } from '@/app/[lang]/dictionaries.ts';
import HeaderWidget from '@/widgets/header/header.widget.tsx';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  title: 'Voidly',
};

export interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { lang } = await params;

  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang} className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers lang={lang} dictionary={dictionary}>
          <HeaderWidget />

          <main className={'w-full justify-center flex py-4 xl:px-0 px-2'}>
            <div className={'max-w-(--layout-area) w-full'}>{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
