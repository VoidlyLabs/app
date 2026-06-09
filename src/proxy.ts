import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, hasLocale } from '@/shared/lib/i18n/locales';

function getLocale(request: NextRequest) {
  const language = request.headers.get('accept-language');

  return language?.startsWith('uk') ? 'uk' : defaultLocale;
}

function getLocaleFromPath(pathname: string) {
  const locale = pathname.split('/')[1];

  return hasLocale(locale) ? locale : null;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const locale = getLocaleFromPath(pathname);

  if (!locale) {
    const preferredLocale = getLocale(request);

    return NextResponse.redirect(
      new URL(`/${preferredLocale}${pathname}`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
