import { createContext, useContext } from 'react';
import { Locale } from '@/shared/lib/i18n/locales';

export interface I18nContextProps {
  lang: Locale;
  dictionary: unknown;
}

export const I18nContext = createContext<I18nContextProps>(
  {} as I18nContextProps,
);

export function useI18n() {
  const ctx = useContext(I18nContext);

  if (!ctx) {
    throw new Error('Missing I18nProvider');
  }

  return ctx;
}
