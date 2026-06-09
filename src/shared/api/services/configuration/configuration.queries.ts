import { ConfigurationService } from '@/shared/api/services/configuration/configuration.service';
import { TimeUtils } from '@/shared/lib/time.utils';
import { useI18n } from '@/shared/providers/i18n/i18n.context';
import { useQuery } from '@tanstack/react-query';

const configurationQueryKey = ['configuration'];

export const useConfiguration = () => {
  const { lang } = useI18n();

  return useQuery({
    queryKey: [...configurationQueryKey, lang],
    queryFn: () => ConfigurationService.get(lang),
    staleTime: TimeUtils.toMilliseconds(0, 3),
  });
};
