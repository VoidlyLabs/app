import 'server-only';
import { Locale } from '@/shared/lib/i18n/locales';

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((m) => m.default),
  uk: () => import('../dictionaries/uk.json').then((m) => m.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
