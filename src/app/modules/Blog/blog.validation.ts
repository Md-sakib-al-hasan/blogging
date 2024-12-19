import { z } from 'zod';

// Define Zod validation for the Blog schema
export const blogValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, { message: 'The title field is required.' })
      .max(255, {
        message: 'The title must be less than or equal to 255 characters.',
      })
      .trim(),

    content: z
      .string()
      .min(1, { message: 'The content field is required.' })
      .max(5000, {
        message: 'The content must be less than or equal to 5000 characters.',
      }),
  }),
});

// Define Zod validation for the Blog schema updated

const blogUpdateValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, { message: 'The title field is required.' })
      .max(255, {
        message: 'The title must be less than or equal to 255 characters.',
      })
      .trim()
      .optional(),

    content: z
      .string()
      .min(1, { message: 'The content field is required.' })
      .max(5000, {
        message: 'The content must be less than or equal to 5000 characters.',
      })
      .optional(),
  }),
});

export const BlogValidtions = {
  blogValidationSchema,
  blogUpdateValidationSchema,
};
