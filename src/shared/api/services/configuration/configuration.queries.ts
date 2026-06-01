import { ConfigurationService } from '@/shared/api/services/configuration/configuration.service';
import { TimeUtils } from '@/shared/lib/time.utils';
import { useQuery } from '@tanstack/react-query';

const configurationQueryKey = ['configuration'];

export const useConfiguration = () =>
  useQuery({
    queryKey: configurationQueryKey,
    queryFn: () => ConfigurationService.get(),
    staleTime: TimeUtils.toMilliseconds(0, 3),
  });
