import { ProductsService } from '@/shared/api/services/products/products.service';
import { Product_Purchase_Request } from '@/shared/api/services/products/products.model';
import { TimeUtils } from '@/shared/lib/time.utils';
import { useI18n } from '@/shared/providers/i18n/i18n.context';
import { useT } from '@/shared/hooks/use-t/use-t.hook';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const productsQueryKey = ['products'];

export const useProducts = (enabled = true) => {
  const { lang } = useI18n();

  return useQuery({
    queryKey: [...productsQueryKey, lang],
    queryFn: () => ProductsService.find(lang),
    staleTime: TimeUtils.toMilliseconds(0, 3),
    enabled,
  });
};

export const useProductsByCategory = (categoryId: string, enabled = true) => {
  const { lang } = useI18n();

  return useQuery({
    queryKey: [...productsQueryKey, lang, 'category', categoryId],
    queryFn: () => ProductsService.findByCategoryId(categoryId, lang),
    staleTime: TimeUtils.toMilliseconds(0, 3),
    enabled,
  });
};

export const useProduct = (id: string) => {
  const { lang } = useI18n();

  return useQuery({
    queryKey: [...productsQueryKey, lang, id],
    queryFn: () => ProductsService.findById(id, lang),
    staleTime: TimeUtils.toMilliseconds(0, 3),
  });
};

export const usePurchaseProduct = () => {
  const { lang } = useI18n();
  const t = useT();

  return useMutation({
    mutationKey: ['productPurchase', lang],
    mutationFn: (data: Product_Purchase_Request) =>
      ProductsService.purchase(data, lang),

    onError(error: unknown) {
      toast.error(t('products.toasts.purchaseFailed'));

      console.error(error);
    },
  });
};

