"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidtions = exports.blogValidationSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
// Define Zod validation for the Blog schema
exports.blogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string()
            .min(1, { message: 'The title field is required.' })
            .max(255, {
            message: 'The title must be less than or equal to 255 characters.',
        })
            .trim(),
        content: zod_1.z
            .string()
            .min(1, { message: 'The content field is required.' })
            .max(5000, {
            message: 'The content must be less than or equal to 5000 characters.',
        }),
    }),
});
// Define Zod validation for the Blog schema updated
const blogUpdateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string()
            .min(1, { message: 'The title field is required.' })
            .max(255, {
            message: 'The title must be less than or equal to 255 characters.',
        })
            .trim()
            .optional(),
        content: zod_1.z
            .string()
            .min(1, { message: 'The content field is required.' })
            .max(5000, {
            message: 'The content must be less than or equal to 5000 characters.',
        })
            .optional(),
    }),
});
// Custom Zod refinement for MongoDB ObjectId
const objectIdSchema = zod_1.z
    .string()
    .refine((value) => mongoose_1.Types.ObjectId.isValid(value), {
    message: 'Invalid MongoDB ObjectId',
});
const IdvalidationSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: objectIdSchema,
    }),
});
exports.BlogValidtions = {
    blogValidationSchema: exports.blogValidationSchema,
    blogUpdateValidationSchema,
    IdvalidationSchema,
};
