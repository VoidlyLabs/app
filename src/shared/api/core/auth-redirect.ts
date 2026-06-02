export const getLocalizedSignInPath = (pathname: string) => {
  const [, locale] = pathname.split('/');

  return locale ? `/${locale}/signin` : '/signin';
};

export const isAuthPath = (pathname: string) =>
  pathname === '/signin' ||
  pathname.endsWith('/signin') ||
  pathname === '/register' ||
  pathname.endsWith('/register');
