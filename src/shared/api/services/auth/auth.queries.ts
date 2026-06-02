import { AuthService } from '@/shared/api/services/auth/auth.service';
import { TimeUtils } from '@/shared/lib/time.utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useSignIn = () =>
  useMutation({
    mutationKey: ['authSignIn'],
    mutationFn: AuthService.signIn,

    onError(error: unknown) {
      toast.error('Error occurred! Check your credentials.');

      console.error(error);
    },
  });

export const useSignUp = () =>
  useMutation({
    mutationKey: ['authSignUp'],
    mutationFn: AuthService.signUp,

    onError(error: unknown) {
      toast.error('Error occurred!');

      console.error(error);
    },
  });

export const useSignOut = () =>
  useMutation({
    mutationKey: ['authSignOut'],
    mutationFn: AuthService.signOut,

    onError(error: unknown) {
      toast.error('Error occurred!');

      console.error(error);
    },
  });

export const useMe = () =>
  useQuery({
    queryKey: ['authMe'],
    queryFn: () => AuthService.getMe(),
    staleTime: TimeUtils.toMilliseconds(0, 3),
  });
