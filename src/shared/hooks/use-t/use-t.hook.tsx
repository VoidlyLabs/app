'use client';

import { useI18n } from '@/shared/providers/i18n/i18n.context';

export function useT() {
  const { dictionary } = useI18n();

  return (key: string) => {
    const value = key.split('.').reduce<unknown>((obj, part) => {
      if (typeof obj !== 'object' || obj === null) {
        return undefined;
      }

      return (obj as Record<string, unknown>)[part];
    }, dictionary);

    return typeof value === 'string' ? value : key;
  };
}
