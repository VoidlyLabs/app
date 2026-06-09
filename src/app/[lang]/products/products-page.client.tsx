'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import {
  useProducts,
  useProductsByCategory,
} from '@/shared/api/services/products/products.queries.ts';
import { useCategories } from '@/shared/api/services/category/category.queries.ts';
import FetchProvider from '@/shared/providers/fetch-provider/fetch.provider.tsx';
import ImageLoader from '@/shared/ui/image-loader/image-loader.tsx';
import { cn } from '@/shared/lib/classnames.utils.ts';
import { useT } from '@/shared/hooks/use-t/use-t.hook';
import { Locale } from '@/shared/lib/i18n/locales';

const getIntlLocale = (lang: Locale) => (lang === 'uk' ? 'uk-UA' : 'en-US');

const formatPrice = (price: number, lang: Locale) =>
  new Intl.NumberFormat(getIntlLocale(lang), {
    style: 'currency',
    currency: 'UAH',
    maximumFractionDigits: 0,
  }).format(price);

const ProductsPageClient = () => {
  const params = useParams<{ lang: Locale }>();
  const searchParams = useSearchParams();
  const t = useT();
  const categoryId = searchParams.get('categoryId') ?? '';
  const productsHref = `/${params.lang}/products`;

  const categoriesQuery = useCategories();
  const productsQuery = useProducts(categoryId.length === 0);
  const categoryProductsQuery = useProductsByCategory(
    categoryId,
    categoryId.length > 0,
  );
  const selectedProductsQuery =
    categoryId.length > 0 ? categoryProductsQuery : productsQuery;

  return (
    <div className={'py-8'}>
      <div className={'mb-8 flex flex-col gap-4'}>
        <div>
          <h1 className={'text-4xl font-bold'}>{t('products.title')}</h1>
          <p className={'mt-2 text-sm text-gray-400'}>
            {t('products.subtitle')}
          </p>
        </div>

        <FetchProvider queryObject={categoriesQuery} silentError>
          {(response) => (
            <div className={'flex flex-wrap gap-2'}>
              <Link
                href={productsHref}
                className={cn(
                  'rounded-2xl border px-4 py-2 text-sm font-semibold transition',
                  categoryId.length === 0
                    ? 'border-accent bg-accent text-white'
                    : 'border-gray-200 text-gray-600 hover:border-accent hover:text-accent',
                )}
              >
                {t('products.all')}
              </Link>

              {response.data.body.map((category) => (
                <Link
                  key={category.id}
                  href={`${productsHref}?categoryId=${category.id}`}
                  className={cn(
                    'rounded-2xl border px-4 py-2 text-sm font-semibold transition',
                    category.id === categoryId
                      ? 'border-accent bg-accent text-white'
                      : 'border-gray-200 text-gray-600 hover:border-accent hover:text-accent',
                  )}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </FetchProvider>
      </div>

      <FetchProvider queryObject={selectedProductsQuery} loaderClassName={'py-20'}>
        {(response) =>
          response.data.body.length > 0 ? (
            <div
              className={
                'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              }
            >
              {response.data.body.map((product) => (
                <Link
                  key={product.id}
                  href={`${productsHref}/${product.id}`}
                  className={
                    'overflow-hidden rounded-md border border-gray-200 bg-white shadow-xs transition hover:border-accent hover:shadow-md'
                  }
                >
                  <div className={'aspect-square bg-accent/10'}>
                    <ImageLoader
                      src={product.imageUrl}
                      alt={product.name}
                      width={420}
                      height={420}
                      className={'h-full w-full object-contain p-6'}
                    />
                  </div>

                  <div className={'flex min-h-44 flex-col gap-3 p-4'}>
                    <div className={'flex-1'}>
                      <h2 className={'line-clamp-2 text-lg font-semibold'}>
                        {product.name}
                      </h2>
                      <p className={'mt-2 line-clamp-2 text-sm text-gray-400'}>
                        {product.description}
                      </p>
                    </div>

                    <div className={'flex items-center justify-between gap-3'}>
                      <span className={'text-xl font-bold text-accent'}>
                        {formatPrice(product.price, params.lang)}
                      </span>
                      <span
                        className={cn(
                          'rounded-2xl px-3 py-1 text-xs font-semibold',
                          product.isAvailable
                            ? 'bg-green-50 text-green-600'
                            : 'bg-gray-100 text-gray-400',
                        )}
                      >
                        {product.isAvailable
                          ? t('common.availability.available')
                          : t('common.availability.unavailable')}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div
              className={
                'rounded-md border border-gray-200 px-6 py-14 text-center text-gray-400'
              }
            >
              {t('products.emptyByCategory')}
            </div>
          )
        }
      </FetchProvider>
    </div>
  );
};

export default ProductsPageClient;

