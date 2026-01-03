'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import { Card } from '@components/ui/card';
import { useToast } from '@hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@lib/api-client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { getIndustries } from '@lib/industries-options';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(50),
  market: z.string().min(3, 'Enter a valid market'),
  sections: z.array(z.string()).min(3),
});

export function SiteForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: '',
      description: '',
      market: '',
      sections: ['home', 'contact', 'map'],
    },
  });

  const createSite = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      apiClient.post('/site', {
        name: values.name,
        description: values.description,
        market: values.market,
        sections: values.sections,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast({
        title: 'Move user to templates',
        description: 'Your profile has been successfully updated.',
      });
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
        <h2 className="text-2xl font-bold mb-6">Site</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(values => createSite.mutate(values))}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} type="description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="market"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your company's industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {getIndustries().map(industry => (
                          <SelectItem key={industry.code} value={industry.code}>
                            <div className="flex items-center gap-2">
                              {industry.name}
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
              disabled={createSite.isPending}
            >
              {createSite.isPending ? 'Creating...' : 'Create site'}
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
}
