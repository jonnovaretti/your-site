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
import { getSiteType } from '@lib/site-type-options';
import { UseMutateFunction } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { formSchema } from '../helpers/site-form-schema.helper';

type SiteFormValues = z.infer<typeof formSchema>;

type Props = {
  action: {
    mutate: UseMutateFunction<
      unknown, // response (often irrelevant in the child)
      unknown, // error
      SiteFormValues,
      unknown
    >;
    isPending: boolean;
  };
  title: string;
};

export function SiteForm({ action, title }: Props) {
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

  return (
    <div className="pt-10">
      <Card className="max-w-2xl mx-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Site</h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(values => action.mutate(values))}
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
                        Enter a title for your site
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
                      <FormLabel>Site type</FormLabel>
                      <FormLabel className="text-xs font-extralight">
                        Select the site type
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
                          {getSiteType().map(type => (
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
                disabled={action.isPending}
              >
                {action.isPending ? 'Processing...' : title}
              </Button>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
}
