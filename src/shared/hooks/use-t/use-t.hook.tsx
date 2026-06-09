'use client';

import { useI18n } from '@/shared/providers/i18n/i18n.context';

export function useT() {
  const { dictionary } = useI18n();

  return (key: string, params?: Record<string, string | number>) => {
    const value = key.split('.').reduce<unknown>((obj, part) => {
      if (typeof obj !== 'object' || obj === null) {
        return undefined;
      }

      return (obj as Record<string, unknown>)[part];
    }, dictionary);

    if (typeof value !== 'string') {
      return key;
    }

    if (!params) {
      return value;
    }

    return Object.entries(params).reduce(
      (text, [param, replacement]) =>
        text.replaceAll(`{${param}}`, String(replacement)),
      value,
    );
  };
}

