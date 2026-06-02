'use client';

import React from 'react';
import { Locale } from '@/app/[lang]/dictionaries.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import BasicQueryClient from '@/shared/api/core/basic-query.client.tsx';
import { Toaster } from 'react-hot-toast';
import { I18nProvider } from '@/shared/providers/i18n/i18n.provider.tsx';
import ConfigProvider from '@/app/providers/config/config.provider.tsx';

export interface ProvidersProps {
  children?: React.ReactNode;
  dictionary: unknown;
  lang: Locale;
}

const Providers = ({ children, lang, dictionary }: ProvidersProps) => {
  return (
    <QueryClientProvider client={BasicQueryClient}>
      <I18nProvider lang={lang} dictionary={dictionary}>
        <ConfigProvider>
          <Toaster containerClassName="z-99" position="bottom-right" />
          {children}
        </ConfigProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
};

export default Providers;
