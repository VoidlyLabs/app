import { ProductsService } from '@/shared/api/services/products/products.service';
import { TimeUtils } from '@/shared/lib/time.utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const productsQueryKey = ['products'];

export const useProducts = (enabled = true) =>
  useQuery({
    queryKey: productsQueryKey,
    queryFn: () => ProductsService.find(),
    staleTime: TimeUtils.toMilliseconds(0, 3),
    enabled,
  });

export const useProductsByCategory = (categoryId: string, enabled = true) =>
  useQuery({
    queryKey: [...productsQueryKey, 'category', categoryId],
    queryFn: () => ProductsService.findByCategoryId(categoryId),
    staleTime: TimeUtils.toMilliseconds(0, 3),
    enabled,
  });

export const useProduct = (id: string) =>
  useQuery({
    queryKey: [...productsQueryKey, id],
    queryFn: () => ProductsService.findById(id),
    staleTime: TimeUtils.toMilliseconds(0, 3),
  });

export const usePurchaseProduct = () =>
  useMutation({
    mutationKey: ['productPurchase'],
    mutationFn: ProductsService.purchase,

    onError(error: unknown) {
      toast.error('Не вдалося оформити покупку.');

      console.error(error);
    },
  });
