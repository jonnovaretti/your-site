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
import {
  CheckboxGroup,
  CheckboxGroupItem,
} from '@components/ui/checkbox-group';
import { getSections } from '@lib/sections-options';
import { Textarea } from '@components/ui/textarea';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z
    .string()
    .min(50, 'The description should have more than 50 characters')
    .max(500, 'Your description can not have more then 500 characters'),
  industry: z.string().min(1, 'Select an industry'),
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
      industry: '',
      sections: ['home', 'contact'],
    },
  });

  const createSite = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      apiClient.post('/site', {
        name: values.name,
        description: values.description,
        industry: values.industry,
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
    <>
      <div className="flex flex-row">
        <ol className="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
          <li className="flex items-center text-fg-brand space-x-3 rtl:space-x-reverse">
            <span className="flex items-center justify-center w-10 h-10 bg-brand-softer rounded-full lg:h-12 lg:w-12 shrink-0">
              <svg
                className="w-5 h-5 text-fg-brand"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 11.917 9.724 16.5 19 7.5"
                />
              </svg>
            </span>
            <span>
              <h3 className="font-medium leading-tight">User info</h3>
              <p className="text-sm">Step details here</p>
            </span>
          </li>
          <li className="flex items-center text-body space-x-3 rtl:space-x-reverse">
            <span className="flex items-center justify-center w-10 h-10 bg-neutral-tertiary rounded-full lg:h-12 lg:w-12 shrink-0">
              <svg
                className="w-5 h-5 text-body"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 9h3m-3 3h3m-3 3h3m-6 1c-.306-.613-.933-1-1.618-1H7.618c-.685 0-1.312.387-1.618 1M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm7 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                />
              </svg>
            </span>
            <span>
              <h3 className="font-medium leading-tight">Company info</h3>
              <p className="text-sm">Step details here</p>
            </span>
          </li>
          <li className="flex items-center text-body space-x-3 rtl:space-x-reverse">
            <span className="flex items-center justify-center w-10 h-10 bg-neutral-tertiary rounded-full lg:h-12 lg:w-12 shrink-0">
              <svg
                className="w-5 h-5 text-body"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 10h18M6 14h2m3 0h5M3 7v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1Z"
                />
              </svg>
            </span>
            <span>
              <h3 className="font-medium leading-tight">Payment info</h3>
              <p className="text-sm">Step details here</p>
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
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col gap-2">
                      <FormLabel>Industry</FormLabel>
                      <FormLabel className="text-xs font-extralight">
                        Select your company&apos;s industry
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
                          {getIndustries().map(industry => (
                            <SelectItem
                              key={industry.code}
                              value={industry.code}
                            >
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
              <FormField
                control={form.control}
                name="sections"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col gap-2">
                      <FormLabel>Sections</FormLabel>
                      <FormLabel className="text-xs font-extralight">
                        Select which sections you want to have in your site
                      </FormLabel>
                    </div>
                    <FormControl>
                      <CheckboxGroup className="gap-2">
                        {getSections().map(section => (
                          <div
                            key={section.code}
                            className="flex items-center gap-2"
                          >
                            <CheckboxGroupItem
                              disabled={section.disabled}
                              checked={field.value?.includes(section.code)}
                              onChange={event => {
                                const currentValues = field.value ?? [];
                                const nextValues = event.target.checked
                                  ? Array.from(
                                      new Set([...currentValues, section.code]),
                                    )
                                  : currentValues.filter(
                                      value => value !== section.code,
                                    );
                                field.onChange(nextValues);
                              }}
                            />
                            <span className="text-sm font-normal">
                              {section.name}
                            </span>
                          </div>
                        ))}
                      </CheckboxGroup>
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
