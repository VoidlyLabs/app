import { ProductsService } from '@/shared/api/services/products/products.service';
import { TimeUtils } from '@/shared/lib/time.utils';
import { useQuery } from '@tanstack/react-query';

const productsQueryKey = ['products'];

export const useProducts = () =>
  useQuery({
    queryKey: productsQueryKey,
    queryFn: () => ProductsService.find(),
    staleTime: TimeUtils.toMilliseconds(0, 3),
  });

export const useProductsByCategory = (categoryId: string) =>
  useQuery({
    queryKey: [...productsQueryKey, 'category', categoryId],
    queryFn: () => ProductsService.findByCategoryId(categoryId),
    staleTime: TimeUtils.toMilliseconds(0, 3),
  });

export const useProduct = (id: string) =>
  useQuery({
    queryKey: [...productsQueryKey, id],
    queryFn: () => ProductsService.findById(id),
    staleTime: TimeUtils.toMilliseconds(0, 3),
  });
