'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'react-feather';
import { useConfig } from '@/app/providers/config/config.context';
import ImageLoader from '@/shared/ui/image-loader/image-loader.tsx';
import { cn } from '@/shared/lib/classnames.utils.ts';
import { useT } from '@/shared/hooks/use-t/use-t.hook';

const getInitial = (name: string) => name.trim().charAt(0).toLowerCase() || 'v';

const normalizePhoneHref = (phoneNumber: string) =>
  `tel:${phoneNumber.replace(/[^\d+]/g, '')}`;

export interface FooterWidgetProps {
  className?: string;
}

const FooterWidget = ({ className }: FooterWidgetProps) => {
  const { config } = useConfig();
  const params = useParams<{ lang?: string }>();
  const t = useT();
  const langPrefix = params.lang ? `/${params.lang}` : '';
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('mt-16 w-full bg-[#101827] text-white', className)}>
      <div className={'mx-auto max-w-(--layout-area) px-4 py-14 xl:px-0'}>
        <div
          className={
            'grid gap-10 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_1.2fr]'
          }
        >
          <div>
            <Link
              href={langPrefix || '/'}
              className={'flex items-center gap-4'}
            >
              {config.logoUrl ? (
                <ImageLoader
                  src={config.logoUrl}
                  alt={config.name}
                  width={40}
                  height={40}
                  className={'h-10 w-10 object-contain'}
                />
              ) : (
                <span
                  className={
                    'flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-xl font-bold'
                  }
                >
                  {getInitial(config.name)}
                </span>
              )}
              <span className={'text-3xl font-bold'}>{config.name}</span>
            </Link>

            <p className={'mt-6 max-w-sm text-md leading-8 text-slate-400'}>
              {t('footer.description')}
            </p>

            <div className={'mt-8 flex gap-4'}>
              <a
                href={'#'}
                aria-label={'Facebook'}
                className={
                  'flex h-12 w-12 items-center justify-center rounded-xl bg-white/7 text-slate-300 transition hover:bg-accent hover:text-white'
                }
              >
                <Facebook size={24} />
              </a>
              <a
                href={'#'}
                aria-label={'Instagram'}
                className={
                  'flex h-12 w-12 items-center justify-center rounded-xl bg-white/7 text-slate-300 transition hover:bg-accent hover:text-white'
                }
              >
                <Instagram size={24} />
              </a>
              <a
                href={'#'}
                aria-label={'Twitter'}
                className={
                  'flex h-12 w-12 items-center justify-center rounded-xl bg-white/7 text-slate-300 transition hover:bg-accent hover:text-white'
                }
              >
                <Twitter size={24} />
              </a>
            </div>
          </div>

          <nav>
            <h2 className={'text-xl font-bold'}>{t('footer.shop')}</h2>
            <div className={'mt-8 grid gap-5 text-md text-slate-300'}>
              <Link
                href={`${langPrefix}/products`}
                className={'hover:text-white'}
              >
                {t('footer.newItems')}
              </Link>
              <Link
                href={`${langPrefix}/products`}
                className={'hover:text-white'}
              >
                {t('footer.shippingPayment')}
              </Link>
              <Link
                href={`${langPrefix}/products`}
                className={'hover:text-white'}
              >
                {t('footer.exchangeReturns')}
              </Link>
              <Link
                href={`${langPrefix}/products`}
                className={'hover:text-white'}
              >
                {t('footer.warranty')}
              </Link>
            </div>
          </nav>

          <nav>
            <h2 className={'text-xl font-bold'}>{t('footer.help')}</h2>
            <div className={'mt-8 grid gap-5 text-md text-slate-300'}>
              <Link
                href={`${langPrefix}/products`}
                className={'hover:text-white'}
              >
                {t('footer.faq')}
              </Link>
              <Link
                href={`${langPrefix}/profile`}
                className={'hover:text-white'}
              >
                {t('footer.contactUs')}
              </Link>
            </div>
          </nav>

          <div>
            <h2 className={'text-xl font-bold'}>{t('footer.contacts')}</h2>
            <div className={'mt-8 grid gap-6 text-md text-slate-300'}>
              <div className={'flex items-start gap-4'}>
                <Phone size={28} className={'mt-1 text-accent'} />
                <div>
                  <a
                    href={normalizePhoneHref(config.phoneNumber)}
                    className={'text-white hover:text-accent'}
                  >
                    {config.phoneNumber}
                  </a>
                  <div className={'mt-2 text-base text-slate-500'}>
                    {t('footer.workingHours')}
                  </div>
                </div>
              </div>

              <div className={'flex items-center gap-4'}>
                <Mail size={28} className={'text-accent'} />
                <a
                  href={`mailto:${config.email}`}
                  className={'hover:text-white'}
                >
                  {config.email}
                </a>
              </div>

              <div className={'flex items-start gap-4'}>
                <MapPin size={28} className={'mt-1 text-accent'} />
                <span>{t('footer.address')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={'mt-14 border-t border-white/10 pt-8'}>
          <div
            className={
              'flex flex-col gap-4 text-slate-400 md:flex-row md:items-center md:justify-between'
            }
          >
            <span>
              © {currentYear} {config.name}. {t('footer.copyright')}
            </span>
            <div className={'flex text-md flex-wrap gap-6'}>
              <Link
                href={`${langPrefix}/products`}
                className={'hover:text-white'}
              >
                {t('footer.privacy')}
              </Link>
              <Link
                href={`${langPrefix}/products`}
                className={'hover:text-white'}
              >
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterWidget;

