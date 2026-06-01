import { CategoryService } from '@/shared/api/services/category/category.service';
import { TimeUtils } from '@/shared/lib/time.utils';
import { useQuery } from '@tanstack/react-query';

const categoriesQueryKey = ['categories'];

export const useCategories = () =>
  useQuery({
    queryKey: categoriesQueryKey,
    queryFn: () => CategoryService.find(),
    staleTime: TimeUtils.toMilliseconds(0, 3),
  });

export const useCategory = (id: string) =>
  useQuery({
    queryKey: [...categoriesQueryKey, id],
    queryFn: () => CategoryService.findById(id),
    staleTime: TimeUtils.toMilliseconds(0, 3),
  });
