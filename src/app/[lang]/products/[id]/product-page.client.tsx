'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  ArrowLeft,
  CheckCircle,
  Minus,
  Plus,
  Shield,
  ShoppingCart,
  Truck,
} from 'react-feather';
import {
  useProduct,
  useProducts,
  usePurchaseProduct,
} from '@/shared/api/services/products/products.queries.ts';
import { Product } from '@/shared/api/services/products/products.model.ts';
import FetchProvider from '@/shared/providers/fetch-provider/fetch.provider.tsx';
import ImageLoader from '@/shared/ui/image-loader/image-loader.tsx';
import { cn } from '@/shared/lib/classnames.utils.ts';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    maximumFractionDigits: 0,
  }).format(price);

const ProductCard = ({
  lang,
  product,
}: {
  lang: string;
  product: Product;
}) => (
  <Link
    href={`/${lang}/products/${product.id}`}
    className={
      'overflow-hidden rounded-md border border-gray-200 bg-white shadow-xs transition hover:border-accent hover:shadow-md'
    }
  >
    <div className={'aspect-square bg-accent/10'}>
      <ImageLoader
        src={product.imageUrl}
        alt={product.name}
        width={360}
        height={360}
        className={'h-full w-full object-contain p-6'}
      />
    </div>

    <div className={'flex min-h-36 flex-col gap-3 p-4'}>
      <div className={'flex-1'}>
        <h3 className={'line-clamp-2 text-base font-semibold'}>
          {product.name}
        </h3>
        <p className={'mt-2 line-clamp-2 text-sm text-gray-400'}>
          {product.description}
        </p>
      </div>

      <div className={'flex items-center justify-between gap-3'}>
        <span className={'text-lg font-bold text-accent'}>
          {formatPrice(product.price)}
        </span>
        <span
          className={cn(
            'rounded-2xl px-3 py-1 text-xs font-semibold',
            product.isAvailable
              ? 'bg-green-50 text-green-600'
              : 'bg-gray-100 text-gray-400',
          )}
        >
          {product.isAvailable ? 'В наявності' : 'Немає'}
        </span>
      </div>
    </div>
  </Link>
);

const ProductPageClient = () => {
  const params = useParams<{ lang: string; id: string }>();
  const queryClient = useQueryClient();
  const productQuery = useProduct(params.id);
  const relatedProductsQuery = useProducts();
  const purchaseProduct = usePurchaseProduct();
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => setQuantity((value) => Math.max(1, value - 1));
  const increaseQuantity = () => setQuantity((value) => value + 1);

  return (
    <div className={'py-8'}>
      <Link
        href={`/${params.lang}/products`}
        className={
          'mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition hover:text-accent'
        }
      >
        <ArrowLeft size={18} />
        До каталогу
      </Link>

      <FetchProvider queryObject={productQuery} loaderClassName={'py-24'}>
        {(response) => {
          const product = response.data.body;
          const totalPrice = product.price * quantity;
          const canPurchase = product.isAvailable && !purchaseProduct.isPending;

          const purchase = async () => {
            if (!product.isAvailable) {
              toast.error('Товару немає в наявності.');
              return;
            }

            await purchaseProduct.mutateAsync({
              productId: product.id,
              quantity,
            });

            await Promise.all([
              queryClient.invalidateQueries({ queryKey: ['authMe'] }),
              queryClient.invalidateQueries({ queryKey: ['products'] }),
            ]);

            toast.success('Покупку оформлено.');
          };

          return (
            <div className={'flex flex-col gap-8'}>
              <section
                className={
                  'grid gap-8 rounded-md border border-gray-200 bg-white p-5 shadow-xs md:grid-cols-[minmax(0,520px)_1fr]'
                }
              >
                <div
                  className={
                    'flex aspect-square items-center justify-center rounded-md bg-accent/10'
                  }
                >
                  <ImageLoader
                    src={product.imageUrl}
                    alt={product.name}
                    width={640}
                    height={640}
                    className={'h-full w-full object-contain p-8'}
                  />
                </div>

                <div
                  className={'flex min-w-0 flex-col justify-between gap-8 py-1'}
                >
                  <div>
                    <div
                      className={cn(
                        'mb-4 inline-flex items-center gap-2 rounded-2xl px-3 py-1 text-sm font-semibold',
                        product.isAvailable
                          ? 'bg-green-50 text-green-600'
                          : 'bg-gray-100 text-gray-400',
                      )}
                    >
                      <CheckCircle size={16} />
                      {product.isAvailable ? 'В наявності' : 'Немає в наявності'}
                    </div>

                    <h1 className={'text-3xl font-bold leading-tight'}>
                      {product.name}
                    </h1>
                    <p className={'mt-4 text-base leading-7 text-gray-500'}>
                      {product.description}
                    </p>
                  </div>

                  <div className={'grid gap-3 text-sm text-gray-500'}>
                    <div className={'flex items-center gap-3'}>
                      <Truck size={18} className={'text-accent'} />
                      Доставка по Україні 1-2 дні
                    </div>
                    <div className={'flex items-center gap-3'}>
                      <Shield size={18} className={'text-accent'} />
                      Офіційна гарантія 12 місяців
                    </div>
                  </div>
                </div>
              </section>

              <section
                className={
                  'rounded-md border border-gray-200 bg-white p-6 shadow-xs'
                }
              >
                <div
                  className={
                    'grid items-end gap-5 md:grid-cols-[1fr_auto_auto_auto]'
                  }
                >
                  <div>
                    <div className={'text-sm font-semibold text-gray-400'}>
                      Ціна
                    </div>
                    <div className={'mt-2 text-4xl font-bold text-accent'}>
                      {formatPrice(product.price)}
                    </div>
                  </div>

                  <div>
                    <div className={'mb-2 text-sm font-semibold text-gray-500'}>
                      Кількість
                    </div>
                    <div
                      className={
                        'flex h-12 w-36 items-center justify-between rounded-2xl border border-gray-200 px-2'
                      }
                    >
                      <button
                        type={'button'}
                        onClick={decreaseQuantity}
                        className={
                          'flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100'
                        }
                      >
                        <Minus size={16} />
                      </button>
                      <span className={'font-semibold'}>{quantity}</span>
                      <button
                        type={'button'}
                        onClick={increaseQuantity}
                        className={
                          'flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100'
                        }
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className={'md:text-right'}>
                    <div className={'text-sm font-semibold text-gray-400'}>
                      Разом
                    </div>
                    <div className={'mt-2 text-2xl font-bold'}>
                      {formatPrice(totalPrice)}
                    </div>
                  </div>

                  <button
                    type={'button'}
                    disabled={!canPurchase}
                    onClick={purchase}
                    className={
                      'flex h-12 items-center justify-center gap-3 rounded-2xl bg-accent px-8 font-semibold text-white transition hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-60'
                    }
                  >
                    <ShoppingCart size={20} />
                    {purchaseProduct.isPending ? 'Оформлення...' : 'Купити'}
                  </button>
                </div>
              </section>

              <FetchProvider
                queryObject={relatedProductsQuery}
                silentError
                silentLoading
              >
                {(relatedResponse) => {
                  const relatedProducts = relatedResponse.data.body
                    .filter((item) => item.id !== product.id)
                    .slice(0, 4);

                  if (relatedProducts.length === 0) {
                    return null;
                  }

                  return (
                    <section className={'pt-2'}>
                      <div className={'mb-4'}>
                        <h2 className={'text-2xl font-bold'}>Схожі товари</h2>
                        <p className={'mt-1 text-sm text-gray-400'}>
                          Ще кілька позицій з каталогу.
                        </p>
                      </div>

                      <div
                        className={
                          'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'
                        }
                      >
                        {relatedProducts.map((item) => (
                          <ProductCard
                            key={item.id}
                            lang={params.lang}
                            product={item}
                          />
                        ))}
                      </div>
                    </section>
                  );
                }}
              </FetchProvider>
            </div>
          );
        }}
      </FetchProvider>
    </div>
  );
};

export default ProductPageClient;
