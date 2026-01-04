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
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z
    .string()
    .min(50, 'The description should have more than 50 characters')
    .max(500, 'Your description can not have more then 500 characters'),
  type: z.string().min(1, 'Select the site type'),
});

export function SiteForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: '',
      description: '',
      type: '',
    },
  });

  const createSite = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      apiClient.post('/site', {
        name: values.name,
        description: values.description,
        type: values.type,
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
    <>
      <div className="flex flex-row">
        <ol className="flex w-full items-center justify-center gap-8 rtl:space-x-reverse">
          <li className="flex items-center text-body space-x-3 rtl:space-x-reverse p-3 border-solid border-b-4 border-blue-300">
            <span className="flex items-center justify-center w-10 h-10 bg-brand-softer rounded-full lg:h-12 lg:w-12 shrink-0">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 4h12M6 4v16M6 4H5m13 0v16m0-16h1m-1 16H6m12 0h1M6 20H5M9 7h1v1H9V7Zm5 0h1v1h-1V7Zm-5 4h1v1H9v-1Zm5 0h1v1h-1v-1Zm-3 4h2a1 1 0 0 1 1 1v4h-4v-4a1 1 0 0 1 1-1Z"
                />
              </svg>
            </span>
            <span>
              <h3 className="font-medium leading-tight">Company info</h3>
              <p className="text-sm">Talk about your company</p>
            </span>
          </li>
          <li className="flex items-center text-body space-x-3 rtl:space-x-reverse">
            <span className="flex items-center justify-center w-10 h-10 bg-neutral-tertiary rounded-full lg:h-12 lg:w-12 shrink-0">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M16 18H8l2.5-6 2 4 1.5-2 2 4Zm-1-8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1ZM8 18h8l-2-4-1.5 2-2-4L8 18Zm7-8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
                />
              </svg>
            </span>
            <span>
              <h3 className="font-medium leading-tight">Template</h3>
              <p className="text-sm">Define your site structure</p>
            </span>
          </li>
          <li className="flex items-center text-body space-x-3 rtl:space-x-reverse">
            <span className="flex items-center justify-center w-10 h-10 bg-neutral-tertiary rounded-full lg:h-12 lg:w-12 shrink-0">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.35709 16V5.78571c0-.43393.34822-.78571.77777-.78571H18.5793c.4296 0 .7778.35178.7778.78571V16M5.35709 16h-1c-.55229 0-1 .4477-1 1v1c0 .5523.44771 1 1 1H20.3571c.5523 0 1-.4477 1-1v-1c0-.5523-.4477-1-1-1h-1M5.35709 16H19.3571M9.35709 8l2.62501 2.5L9.35709 13m4.00001 0h2"
                />
              </svg>
            </span>
            <span>
              <h3 className="font-medium leading-tight">Edit design</h3>
              <p className="text-sm">Customize your site</p>
            </span>
          </li>
        </ol>
      </div>
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
                    <div className="flex flex-col gap-2">
                      <FormLabel>Name</FormLabel>
                      <FormLabel className="text-xs font-extralight">
                        Enter your company name
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
                disabled={createSite.isPending}
              >
                {createSite.isPending ? 'Creating...' : 'Create site'}
              </Button>
            </form>
          </Form>
        </div>
      </Card>
    </>
  );
}
