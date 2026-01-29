import { z } from 'zod';

export const formSchema = z.object({
  title: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Select the site type'),
  description: z
    .string()
    .min(50, 'The description should have more than 50 characters')
    .max(500, 'Your description can not have more then 500 characters'),
});
