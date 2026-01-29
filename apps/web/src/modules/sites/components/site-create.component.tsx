'use client';

import { useToast } from '@hooks/use-toast';
import { apiClient } from '@lib/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { formSchema } from '../helpers/site-form-schema.helper';
import { SiteForm } from './site-form';

export function SiteCreate() {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const createSite = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      apiClient.post('/sites', {
        title: values.title,
        description: values.description,
        type: values.type,
      }),
    onSuccess: response => {
      queryClient.invalidateQueries({ queryKey: ['user'] });

      toast({
        title: 'Move user to templates',
        description: 'Your profile has been successfully updated.',
      });
      router.push(`/app/sites/${response.data.data}/templates`);
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    },
  });

  return <SiteForm action={createSite} title="Create site" />;
}
