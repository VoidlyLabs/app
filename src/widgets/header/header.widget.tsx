'use client';

import React from 'react';
import TopBar from '@/shared/ui/top-bar/top-bar.tsx';
import { ShoppingCart, User } from 'react-feather';
import Link from 'next/link';
import { useConfig } from '@/app/providers/config/config.context';
import ImageLoader from '@/shared/ui/image-loader/image-loader.tsx';
import { useParams } from 'next/navigation';

const HeaderWidget = () => {
  const { config } = useConfig();
  const params = useParams<{ lang?: string }>();
  const homeHref = params.lang ? `/${params.lang}` : '/';
  const profileHref = params.lang ? `/${params.lang}/profile` : '/profile';

  return (
    <div className={'w-full flex flex-col items-center justify-center'}>
      <TopBar />

      <div
        className={
          'w-full flex items-center justify-center border-b-1 border-gray-200'
        }
      >
        <div
          className={
            'py-6 2xl:px-0 px-4 max-w-(--layout-area) w-full flex items-center justify-between'
          }
        >
          <Link href={homeHref} className={'flex items-center gap-3'}>
            {config.logoUrl ? (
              <ImageLoader
                src={config.logoUrl}
                alt={config.name}
                width={50}
                height={50}
                className={'h-14 w-14 object-contain'}
              />
            ) : null}

            <h2 className={'text-2xl font-bold cursor-pointer'}>
              {config.name}
            </h2>
          </Link>

          <div className={'flex items-center gap-4'}>
            <ShoppingCart
              size={28}
              className={'text-gray-700 cursor-pointer'}
            />
            <Link href={profileHref}>
              <User size={28} className={'text-gray-700 cursor-pointer'} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderWidget;
