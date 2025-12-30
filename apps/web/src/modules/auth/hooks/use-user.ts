import { useQuery, useQueryClient } from '@tanstack/react-query';
import { userQueryConfig } from '../user-config';

export function useUser() {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    ...userQueryConfig,
    placeholderData: () => queryClient.getQueryData(['user']),
    retry: (failureCount: number, error: unknown) => {
      console.error(error);
      return failureCount < 3; // or any other condition, just return a boolean
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
  };
}
