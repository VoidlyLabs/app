'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCategories } from '@/shared/api/services/category/category.queries.ts';
import FetchProvider from '@/shared/providers/fetch-provider/fetch.provider.tsx';

const CategoriesWidget = () => {
  const data = useCategories();
  const params = useParams<{ lang: string }>();
  const productsHref = `/${params.lang}/products`;

  return (
    <div className={'w-full'}>
      <div className={'w-full flex justify-between items-center mb-4'}>
        <span className={'text-3xl font-bold'}>Категорії</span>

        <Link
          href={productsHref}
          className={'cursor-pointer text-accent text-sm font-semibold'}
        >
          Всі категорії
        </Link>
      </div>
      <div>
        <FetchProvider queryObject={data}>
          {(response) => (
            <div
              className={'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'}
            >
              {response.data.body.map((item) => (
                <Link
                  key={item.id}
                  id={item.id}
                  href={`${productsHref}?categoryId=${item.id}`}
                  className={
                    'px-6 py-8 rounded-md border-2 border-gray-200 shadow-xs transition hover:border-accent hover:shadow-md'
                  }
                >
                  <div className={'w-12 h-12 rounded-xl mb-2 bg-accent'}></div>

                  <span className={'font-semibold text-md'}>{item.name}</span>
                </Link>
              ))}
            </div>
          )}
        </FetchProvider>
      </div>
    </div>
  );
};

export default CategoriesWidget;
