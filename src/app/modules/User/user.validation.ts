import { z } from 'zod';
import { roletype } from './user.constant';

//// Define Zod validation for the user schema
const userchmeavalidations = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'The name field is required.',
      })
      .trim()
      .min(1, 'The name field is required.'),
    email: z
      .string({
        required_error: 'The email field is required.',
      })
      .email('Please provide a valid email address, e.g., example@domain.com.'),
    password: z
      .string({
        required_error: 'The password field is required.',
      })
      .min(6, 'Password must be at least 6 characters long.'),
    role: z
      .enum([...roletype] as [string, ...string[]], {
        invalid_type_error: "Role must be either 'admin' or 'user'.",
      })
      .default('user'),
  }),
});

export const UserValidtions = {
  userchmeavalidations,
};
