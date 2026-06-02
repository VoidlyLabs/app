import React, { Suspense } from 'react';
import ProductsPageClient from '@/app/[lang]/products/products-page.client.tsx';
import Loader from '@/shared/ui/loader/loader.tsx';

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className={'min-h-80 flex items-center justify-center'}>
          <Loader size={24} />
        </div>
      }
    >
      <ProductsPageClient />
    </Suspense>
  );
}
