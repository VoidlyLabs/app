'use client';

import React from 'react';
import { Mail, Phone } from 'react-feather';
import Link from 'next/link';
import { useConfig } from '@/app/providers/config/config.context';
import { useT } from '@/shared/hooks/use-t/use-t.hook';

const normalizePhoneHref = (phoneNumber: string) =>
  `tel:${phoneNumber.replace(/[^\d+]/g, '')}`;

const TopBar = () => {
  const { config } = useConfig();
  const t = useT();

  return (
    <div className={'w-full bg-accent flex items-center justify-center'}>
      <div
        className={
          'max-w-(--layout-area) text-white flex justify-between w-full'
        }
      >
        <div
          className={
            'hidden sm:flex 2xl:px-0 px-4 gap-4 items-center text-sm font-normal'
          }
        >
          <div className={'flex items-center gap-2'}>
            <Phone size={16} />

            <Link href={normalizePhoneHref(config.phoneNumber)}>
              <span>{config.phoneNumber}</span>
            </Link>
          </div>
          <div className={'flex gap-2 items-center'}>
            <Mail size={16} />
            <Link href={`mailto:${config.email}`}>
              <span>{config.email}</span>
            </Link>
          </div>
        </div>
        <div
          className={
            'flex items-center sm:justify-end justify-center w-full sm:w-auto pr-4 2xl:pr-0'
          }
        >
          <span className={'text-sm'}>{t('topBar.freeShipping')}</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

