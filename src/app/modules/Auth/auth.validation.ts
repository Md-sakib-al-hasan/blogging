import { z } from 'zod';
// Define Zod validation for the login schema
const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email('Please provide a valid email address (e.g., example@domain.com).')
      .min(1, { message: 'The email is required' }),

    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long.' }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
};
