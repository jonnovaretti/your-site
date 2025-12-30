'use client';

import { useQuery } from '@tanstack/react-query';
import { userQueryConfig } from '@modules/auth/user-config';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useQuery({
    ...userQueryConfig,
    enabled: true,
    retry: (failureCount: number, error: unknown) => {
      console.error(error);
      return failureCount < 3;
    },
  });

  return <>{children}</>;
}
