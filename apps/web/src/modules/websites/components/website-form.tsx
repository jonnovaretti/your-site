'use client';

import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { Textarea } from '@components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@hooks/use-toast';
import { apiClient } from '@lib/api-client';
import { getWebsiteType } from '@lib/site-type-options';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export function WebsiteForm() {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const formSchema = z.object({
    title: z.string().min(1, 'Name is required'),
    type: z.string().min(1, 'Select the site type'),
    description: z
      .string()
      .min(50, 'The description should have more than 50 characters')
      .max(500, 'Your description can not have more then 500 characters'),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      title: '',
      description: '',
      type: '',
    },
  });

  const createWebsite = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      apiClient.post('/websites', {
        title: values.title,
        description: values.description,
        type: values.type,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast({
        title: 'Move user to templates',
        description: 'Your profile has been successfully updated.',
      });
      router.push('/');
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    },
  });

  return (
    <Card className="mt-10 max-w-2xl mx-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Website</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(values => createWebsite.mutate(values))}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col gap-2">
                    <FormLabel>Title</FormLabel>
                    <FormLabel className="text-xs font-extralight">
                      Enter a title for your website
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col gap-2">
                    <FormLabel>Description</FormLabel>
                    <FormLabel className="text-xs font-extralight">
                      Explain your business. What do you do? When was your
                      company founded? What is your mission? Elaborate a good
                      description, AI will use it to create your site.
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col gap-2">
                    <FormLabel>Website type</FormLabel>
                    <FormLabel className="text-xs font-extralight">
                      Select the website type
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {getWebsiteType().map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center gap-2">
                              {type.text}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={createWebsite.isPending}
            >
              {createWebsite.isPending ? 'Creating...' : 'Create site'}
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
}
