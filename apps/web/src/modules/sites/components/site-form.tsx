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
  );
}
