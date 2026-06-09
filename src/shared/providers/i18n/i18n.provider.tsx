'use client';

import { Locale } from '@/shared/lib/i18n/locales';
import { I18nContext } from './i18n.context';
import { ReactNode } from 'react';

export function I18nProvider({
  children,
  dictionary,
  lang,
}: {
  children: ReactNode;
  dictionary: unknown;
  lang: Locale;
}) {
  return (
    <I18nContext.Provider value={{ lang, dictionary }}>
      {children}
    </I18nContext.Provider>
  );
}
