'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { Locale } from '@/shared/lib/i18n/locales';
import { useI18n } from '@/shared/providers/i18n/i18n.context';
import { useT } from '@/shared/hooks/use-t/use-t.hook';

const labels: Record<Locale, string> = {
  en: 'EN',
  uk: 'UK',
};

const getNextLang = (lang: Locale): Locale => (lang === 'en' ? 'uk' : 'en');

const getLocalizedPath = (pathname: string, lang: Locale) => {
  const segments = pathname.split('/');
  segments[1] = lang;

  return segments.join('/') || `/${lang}`;
};

export default function LanguageToggle() {
  const { lang } = useI18n();
  const t = useT();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const nextLang = getNextLang(lang);

  const href = useMemo(() => {
    const nextPathname = getLocalizedPath(pathname, nextLang);
    const query = searchParams.toString();

    return query ? `${nextPathname}?${query}` : nextPathname;
  }, [nextLang, pathname, searchParams]);

  return (
    <Link
      href={href}
      hrefLang={nextLang}
      aria-label={t(`language.switchTo.${nextLang}`)}
      className={
        'flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-sm font-bold text-gray-700 transition hover:border-accent hover:bg-accent hover:text-white'
      }
    >
      {labels[nextLang]}
    </Link>
  );
}

