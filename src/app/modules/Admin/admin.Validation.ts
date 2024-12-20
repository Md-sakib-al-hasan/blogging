import { Types } from "mongoose";
import { z } from "zod";


// Custom Zod refinement for MongoDB ObjectId
const objectIdSchema = z
  .string()
  .refine((value) => Types.ObjectId.isValid(value), {
    message: 'Invalid MongoDB ObjectId',
  });

const IdvalidationSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});
const userBlockIdvalidationSchema = z.object({
  params: z.object({
    userId: objectIdSchema,
  }),
});

export const AdminValidations = {
    IdvalidationSchema,
    userBlockIdvalidationSchema,
}