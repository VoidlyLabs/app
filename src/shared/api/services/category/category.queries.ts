import { CategoryService } from '@/shared/api/services/category/category.service';
import { TimeUtils } from '@/shared/lib/time.utils';
import { useI18n } from '@/shared/providers/i18n/i18n.context';
import { useQuery } from '@tanstack/react-query';

const categoriesQueryKey = ['categories'];

export const useCategories = () => {
  const { lang } = useI18n();

  return useQuery({
    queryKey: [...categoriesQueryKey, lang],
    queryFn: () => CategoryService.find(lang),
    staleTime: TimeUtils.toMilliseconds(0, 3),
  });
};

export const useCategory = (id: string) => {
  const { lang } = useI18n();

  return useQuery({
    queryKey: [...categoriesQueryKey, lang, id],
    queryFn: () => CategoryService.findById(id, lang),
    staleTime: TimeUtils.toMilliseconds(0, 3),
  });
};
