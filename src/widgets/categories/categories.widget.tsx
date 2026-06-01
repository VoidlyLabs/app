'use client';

import React from 'react';
import { useCategories } from '@/shared/api/services/category/category.queries.ts';
import FetchProvider from '@/shared/providers/fetch-provider/fetch.provider.tsx';

const CategoriesWidget = () => {
  const data = useCategories();

  return (
    <div className={'w-full'}>
      <div className={'w-full flex justify-between items-center mb-4'}>
        <span className={'text-3xl font-bold'}>Категорії</span>

        <span className={'cursor-pointer text-accent text-sm font-semibold'}>
          Всі категорії
        </span>
      </div>
      <div>
        <FetchProvider queryObject={data}>
          {(response) => (
            <div className={'grid grid-cols-3 gap-4'}>
              {response.data.body.map((item) => (
                <div
                  id={item.id}
                  className={
                    'p-6 rounded-md border-2 border-gray-200 shadow-xs'
                  }
                >
                  <div className={'w-12 h-12 rounded-xl mb-2 bg-accent'}></div>

                  <span className={'font-semibold text-md'}>{item.name}</span>
                </div>
              ))}
            </div>
          )}
        </FetchProvider>
      </div>
    </div>
  );
};

export default CategoriesWidget;
