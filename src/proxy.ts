import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'uk'] as const;
const defaultLocale = 'en';

function getLocale(request: NextRequest) {
  const language = request.headers.get('accept-language');

  return language?.startsWith('uk') ? 'uk' : defaultLocale;
}

function getLocaleFromPath(pathname: string) {
  const locale = pathname.split('/')[1];

  return locales.includes(locale as (typeof locales)[number]) ? locale : null;
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
