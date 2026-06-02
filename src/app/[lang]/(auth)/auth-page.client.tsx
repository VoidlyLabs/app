'use client';

import React, { FormEvent, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ArrowRight, Chrome, Eye, EyeOff, Lock, Mail } from 'react-feather';
import { useQueryClient } from '@tanstack/react-query';
import { useConfig } from '@/app/providers/config/config.context';
import ImageLoader from '@/shared/ui/image-loader/image-loader.tsx';
import { cn } from '@/shared/lib/classnames.utils.ts';
import { useSignIn, useSignUp } from '@/shared/api/services/auth/auth.queries';

type AuthMode = 'signin' | 'register';

export interface AuthPageClientProps {
  mode: AuthMode;
}

const getInitial = (name: string) => name.trim().charAt(0).toLowerCase() || 'v';

const AuthPageClient = ({ mode }: AuthPageClientProps) => {
  const { config } = useConfig();
  const params = useParams<{ lang: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const signIn = useSignIn();
  const signUp = useSignUp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const isRegister = mode === 'register';
  const isPending = signIn.isPending || signUp.isPending;
  const authHref = useMemo(
    () => ({
      signin: `/${params.lang}/signin`,
      register: `/${params.lang}/register`,
    }),
    [params.lang],
  );

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const username = email.trim();

    if (!username || !password) {
      toast.error('Заповніть електронну пошту та пароль.');
      return;
    }

    if (isRegister && password.length < 5) {
      toast.error('Пароль має містити щонайменше 5 символів.');
      return;
    }

    if (isRegister && password !== confirmPassword) {
      toast.error('Паролі не збігаються.');
      return;
    }

    const mutation = isRegister ? signUp : signIn;
    await mutation.mutateAsync({ username, password });

    if (!rememberMe) {
      localStorage.removeItem('rememberMe');
    } else {
      localStorage.setItem('rememberMe', 'true');
    }

    await queryClient.invalidateQueries({ queryKey: ['authMe'] });
    toast.success(isRegister ? 'Акаунт створено.' : 'Вхід виконано.');
    router.push(`/${params.lang}/products`);
  };

  return (
    <div
      className={
        'min-h-screen bg-gray-100 text-gray-950 lg:grid lg:grid-cols-[1.15fr_1fr]'
      }
    >
      <section
        className={
          'relative hidden min-h-screen overflow-hidden px-10 py-10 bg-accent text-white lg:flex lg:flex-col lg:justify-between xl:px-16'
        }
      >
        <div
          className={
            'pointer-events-none absolute -left-44 -top-44 h-120 w-120 rounded-full bg-white/10'
          }
        />
        <div
          className={
            'pointer-events-none absolute -right-28 top-1/2 h-96 w-96 rounded-full bg-white/12'
          }
        />
        <div
          className={
            'pointer-events-none absolute -bottom-72 left-1/3 h-140 w-140 rounded-full bg-white/10'
          }
        />

        <Link
          href={`/${params.lang}`}
          className={'relative z-1 flex items-center gap-4'}
        >
          {config.logoUrl ? (
            <ImageLoader
              src={config.logoUrl}
              alt={config.name}
              width={44}
              height={44}
              className={'h-16 w-16 object-contain'}
            />
          ) : (
            <span
              className={
                'flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-4xl font-bold'
              }
            >
              {getInitial(config.name)}
            </span>
          )}

          <span className={'text-4xl font-bold'}>{config.name}</span>
        </Link>

        <div className={'relative z-1 max-w-2xl'}>
          <h1 className={'text-4xl font-bold leading-tight xl:text-7xl'}>
            Технології у кожному моменті
          </h1>
          <p className={'mt-8 max-w-xl text-xl leading-relaxed text-white/90'}>
            Приєднуйтесь до 15 000+ клієнтів, які вже обирають найкраще у{' '}
            {config.name}.
          </p>

          <div className={'mt-14 flex gap-10'}>
            <div>
              <div className={'text-4xl font-bold'}>1200+</div>
              <div className={'mt-1 text-md text-white/85'}>товарів</div>
            </div>
            <div>
              <div className={'text-4xl font-bold'}>4.9★</div>
              <div className={'mt-1 text-md text-white/85'}>рейтинг</div>
            </div>
            <div>
              <div className={'text-4xl font-bold'}>1-2 дні</div>
              <div className={'mt-1 text-md text-white/85'}>доставка</div>
            </div>
          </div>
        </div>
      </section>

      <section
        className={'flex min-h-screen items-center justify-center px-5 py-10'}
      >
        <div className={'w-full max-w-xl'}>
          <div
            className={
              'mb-14 grid grid-cols-2 rounded-3xl bg-gray-200/70 p-2 text-center text-lg font-semibold text-gray-500'
            }
          >
            <Link
              href={authHref.signin}
              className={cn(
                'rounded-2xl py-5 transition',
                !isRegister && 'bg-white text-gray-950 shadow-md',
              )}
            >
              Вхід
            </Link>
            <Link
              href={authHref.register}
              className={cn(
                'rounded-2xl py-5 transition',
                isRegister && 'bg-white text-gray-950 shadow-md',
              )}
            >
              Реєстрація
            </Link>
          </div>

          <div className={'mb-10 text-center'}>
            <h2 className={'text-5xl font-bold tracking-normal'}>
              {isRegister ? 'Створіть акаунт!' : 'З поверненням!'}
            </h2>
            <p className={'mt-5 text-2xl text-gray-500'}>
              {isRegister
                ? 'Зареєструйтесь, щоб почати покупки'
                : 'Увійдіть, щоб продовжити покупки'}
            </p>
          </div>

          <button
            type={'button'}
            className={
              'mb-10 flex h-18 w-full items-center justify-center gap-4 rounded-2xl border-2 border-gray-200 bg-white text-xl font-medium text-gray-700 transition hover:border-accent hover:text-accent'
            }
            onClick={() => toast.error('Google авторизація ще не налаштована.')}
          >
            <Chrome size={26} className={'text-accent'} />
            Продовжити через Google
          </button>

          <div className={'mb-10 flex items-center gap-6 text-gray-400'}>
            <div className={'h-px flex-1 bg-gray-200'} />
            <span className={'text-lg'}>або</span>
            <div className={'h-px flex-1 bg-gray-200'} />
          </div>

          <form onSubmit={onSubmit} className={'flex flex-col gap-6'}>
            <label
              className={
                'flex h-18 items-center gap-4 rounded-2xl border-2 border-gray-200 bg-white px-6 text-gray-400 transition focus-within:border-accent'
              }
            >
              <Mail size={26} />
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type={'email'}
                autoComplete={'email'}
                placeholder={'Електронна пошта'}
                className={
                  'min-w-0 flex-1 bg-transparent text-xl text-gray-900 outline-none placeholder:text-gray-400'
                }
              />
            </label>

            <label
              className={
                'flex h-18 items-center gap-4 rounded-2xl border-2 border-gray-200 bg-white px-6 text-gray-400 transition focus-within:border-accent'
              }
            >
              <Lock size={26} />
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type={showPassword ? 'text' : 'password'}
                autoComplete={isRegister ? 'new-password' : 'current-password'}
                placeholder={'Пароль'}
                className={
                  'min-w-0 flex-1 bg-transparent text-xl text-gray-900 outline-none placeholder:text-gray-400'
                }
              />
              <button
                type={'button'}
                className={'text-gray-400 transition hover:text-accent'}
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? 'Сховати пароль' : 'Показати пароль'}
              >
                {showPassword ? <EyeOff size={26} /> : <Eye size={26} />}
              </button>
            </label>

            {isRegister ? (
              <label
                className={
                  'flex h-18 items-center gap-4 rounded-2xl border-2 border-gray-200 bg-white px-6 text-gray-400 transition focus-within:border-accent'
                }
              >
                <Lock size={26} />
                <input
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={'new-password'}
                  placeholder={'Повторіть пароль'}
                  className={
                    'min-w-0 flex-1 bg-transparent text-xl text-gray-900 outline-none placeholder:text-gray-400'
                  }
                />
              </label>
            ) : null}

            <div className={'flex items-center justify-between gap-4 text-lg'}>
              <label className={'flex items-center gap-3 text-gray-600'}>
                <input
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  type={'checkbox'}
                  className={'h-5 w-5 accent-accent'}
                />
                Запам&apos;ятати мене
              </label>
              {!isRegister ? (
                <button
                  type={'button'}
                  className={'font-medium text-accent'}
                  onClick={() =>
                    toast.error('Відновлення пароля ще не налаштовано.')
                  }
                >
                  Забули пароль?
                </button>
              ) : null}
            </div>

            <button
              disabled={isPending}
              type={'submit'}
              className={
                'mt-4 flex h-18 w-full items-center justify-center gap-4 rounded-2xl bg-accent text-xl font-bold text-white shadow-2xl shadow-accent/30 transition hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-70'
              }
            >
              {isPending
                ? 'Зачекайте...'
                : isRegister
                  ? 'Зареєструватися'
                  : 'Увійти'}
              <ArrowRight size={28} />
            </button>
          </form>

          <p className={'mt-10 text-center text-lg text-gray-500'}>
            {isRegister ? 'Вже маєте акаунт?' : 'Ще немає акаунту?'}{' '}
            <Link
              href={isRegister ? authHref.signin : authHref.register}
              className={'font-bold text-accent'}
            >
              {isRegister ? 'Увійти' : 'Зареєструватися'}
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default AuthPageClient;
