import { AuthService } from '@/shared/api/services/auth/auth.service';
import { TimeUtils } from '@/shared/lib/time.utils';
import { useT } from '@/shared/hooks/use-t/use-t.hook';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useSignIn = () => {
  const t = useT();

  return useMutation({
    mutationKey: ['authSignIn'],
    mutationFn: AuthService.signIn,

    onError(error: unknown) {
      toast.error(t('auth.toasts.signInFailed'));

      console.error(error);
    },
  });
};

export const useSignUp = () => {
  const t = useT();

  return useMutation({
    mutationKey: ['authSignUp'],
    mutationFn: AuthService.signUp,

    onError(error: unknown) {
      toast.error(t('auth.toasts.signUpFailed'));

      console.error(error);
    },
  });
};

export const useSignOut = () => {
  const t = useT();

  return useMutation({
    mutationKey: ['authSignOut'],
    mutationFn: AuthService.signOut,

    onError(error: unknown) {
      toast.error(t('auth.toasts.signOutFailed'));

      console.error(error);
    },
  });
};

export const useMe = () =>
  useQuery({
    queryKey: ['authMe'],
    queryFn: () => AuthService.getMe(),
    staleTime: TimeUtils.toMilliseconds(0, 3),
  });

