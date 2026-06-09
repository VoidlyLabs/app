import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import React from 'react';
import Providers from '@/app/providers/providers.tsx';
import { getDictionary } from '@/app/[lang]/dictionaries.ts';
import AppShell from '@/app/app-shell.tsx';
import { hasLocale, Locale } from '@/shared/lib/i18n/locales';

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
    lang: string;
  }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { lang: paramLang } = await params;
  const lang: Locale = hasLocale(paramLang) ? paramLang : 'en';

  const dictionary = await getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${inter.variable} h-full antialiased min-h-[100dvh]`}
    >
      <body className="min-h-full flex flex-col">
        <Providers lang={lang} dictionary={dictionary}>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
