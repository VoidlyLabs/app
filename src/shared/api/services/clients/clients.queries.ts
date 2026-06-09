import BasicQueryClient from '@/shared/api/core/basic-query.client';
import { ClientsService } from '@/shared/api/services/clients/clients.service';
import { TimeUtils } from '@/shared/lib/time.utils';
import { useT } from '@/shared/hooks/use-t/use-t.hook';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const clientsQueryKey = ['clients'];

const refetchClients = () =>
  BasicQueryClient.refetchQueries({
    queryKey: clientsQueryKey,
  });

export const useClients = () =>
  useQuery({
    queryKey: clientsQueryKey,
    queryFn: () => ClientsService.find(),
    staleTime: TimeUtils.toMilliseconds(0, 3),
  });

export const useClient = (id: string) =>
  useQuery({
    queryKey: [...clientsQueryKey, id],
    queryFn: () => ClientsService.findById(id),
    staleTime: TimeUtils.toMilliseconds(0, 3),
  });

export const useCreateClient = () => {
  const t = useT();

  return useMutation({
    mutationKey: ['clientCreate'],
    mutationFn: ClientsService.create,

    onSuccess() {
      void refetchClients();
    },

    onError(error: unknown) {
      toast.error(t('common.errorOccurred'));

      console.error(error);
    },
  });
};

export const useUpdateClient = () => {
  const t = useT();

  return useMutation({
    mutationKey: ['clientUpdate'],
    mutationFn: ClientsService.update,

    onSuccess() {
      void refetchClients();
    },

    onError(error: unknown) {
      toast.error(t('common.errorOccurred'));

      console.error(error);
    },
  });
};

export const useDeleteClient = () => {
  const t = useT();

  return useMutation({
    mutationKey: ['clientDelete'],
    mutationFn: ClientsService.deleteById,

    onSuccess() {
      void refetchClients();
    },

    onError(error: unknown) {
      toast.error(t('common.errorOccurred'));

      console.error(error);
    },
  });
};

