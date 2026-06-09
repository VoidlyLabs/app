'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Calendar, CreditCard, LogOut, Mail, User } from 'react-feather';
import { useMe, useSignOut } from '@/shared/api/services/auth/auth.queries';
import Loader from '@/shared/ui/loader/loader.tsx';
import { useT } from '@/shared/hooks/use-t/use-t.hook';
import { Locale } from '@/shared/lib/i18n/locales';

const getIntlLocale = (lang: Locale) => (lang === 'uk' ? 'uk-UA' : 'en-US');

const formatBalance = (balance: number, lang: Locale) =>
  new Intl.NumberFormat(getIntlLocale(lang), {
    style: 'currency',
    currency: 'UAH',
    maximumFractionDigits: 0,
  }).format(balance);

const formatDate = (date: string, lang: Locale) =>
  new Intl.DateTimeFormat(getIntlLocale(lang), {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

const ProfilePageClient = () => {
  const params = useParams<{ lang: Locale }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const t = useT();
  const meQuery = useMe();
  const signOut = useSignOut();

  const onSignOut = async () => {
    await signOut.mutateAsync();
    queryClient.removeQueries({ queryKey: ['authMe'] });
    toast.success(t('profile.signedOut'));
    router.push(`/${params.lang}/signin`);
  };

  if (meQuery.isLoading) {
    return (
      <div className={'min-h-96 flex items-center justify-center'}>
        <Loader size={28} />
      </div>
    );
  }

  if (meQuery.isError || !meQuery.data) {
    return (
      <div className={'py-16 text-center'}>
        <h1 className={'text-3xl font-bold'}>
          {t('profile.authRequiredTitle')}
        </h1>
        <p className={'mt-3 text-gray-400'}>
          {t('profile.authRequiredSubtitle')}
        </p>
      </div>
    );
  }

  const client = meQuery.data.data.body.client;

  return (
    <div className={'py-10'}>
      <div className={'mb-8'}>
        <h1 className={'text-4xl font-bold'}>{t('profile.title')}</h1>
        <p className={'mt-2 text-sm text-gray-400'}>
          {t('profile.subtitle')}
        </p>
      </div>

      <div className={'grid gap-5 lg:grid-cols-[1fr_360px]'}>
        <section
          className={
            'rounded-md border border-gray-200 bg-white p-6 shadow-xs'
          }
        >
          <div className={'flex items-center gap-5 border-b border-gray-100 pb-6'}>
            <div
              className={
                'flex h-18 w-18 items-center justify-center rounded-2xl bg-accent/15 text-3xl font-bold text-accent'
              }
            >
              {client.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className={'text-2xl font-bold'}>{client.username}</h2>
              <p className={'text-sm text-gray-400'}>
                {t('profile.clientPrefix')} {client.id}
              </p>
            </div>
          </div>

          <div className={'mt-6 grid gap-4 sm:grid-cols-2'}>
            <div className={'rounded-md bg-gray-50 p-5'}>
              <div className={'mb-3 flex items-center gap-2 text-gray-400'}>
                <User size={18} />
                <span className={'text-sm font-semibold'}>
                  {t('profile.login')}
                </span>
              </div>
              <div className={'text-lg font-semibold'}>{client.username}</div>
            </div>

            <div className={'rounded-md bg-gray-50 p-5'}>
              <div className={'mb-3 flex items-center gap-2 text-gray-400'}>
                <CreditCard size={18} />
                <span className={'text-sm font-semibold'}>
                  {t('profile.balance')}
                </span>
              </div>
              <div className={'text-lg font-semibold text-accent'}>
                {formatBalance(client.balance, params.lang)}
              </div>
            </div>

            <div className={'rounded-md bg-gray-50 p-5'}>
              <div className={'mb-3 flex items-center gap-2 text-gray-400'}>
                <Calendar size={18} />
                <span className={'text-sm font-semibold'}>
                  {t('profile.createdAt')}
                </span>
              </div>
              <div className={'text-lg font-semibold'}>
                {formatDate(client.createdAt, params.lang)}
              </div>
            </div>

            <div className={'rounded-md bg-gray-50 p-5'}>
              <div className={'mb-3 flex items-center gap-2 text-gray-400'}>
                <Mail size={18} />
                <span className={'text-sm font-semibold'}>
                  {t('profile.contact')}
                </span>
              </div>
              <div className={'text-lg font-semibold'}>{client.username}</div>
            </div>
          </div>
        </section>

        <aside
          className={
            'h-fit rounded-md border border-gray-200 bg-white p-6 shadow-xs'
          }
        >
          <h2 className={'text-xl font-bold'}>
            {t('profile.accountManagement')}
          </h2>
          <p className={'mt-2 text-sm text-gray-400'}>
            {t('profile.accountManagementDescription')}
          </p>

          <button
            type={'button'}
            disabled={signOut.isPending}
            onClick={onSignOut}
            className={
              'mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-accent px-6 py-4 font-semibold text-white transition hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-70'
            }
          >
            <LogOut size={20} />
            {signOut.isPending ? t('profile.signingOut') : t('profile.signOut')}
          </button>
        </aside>
      </div>
    </div>
  );
};

export default ProfilePageClient;

