"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
// Define Zod validation for the login schema
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string()
            .email('Please provide a valid email address (e.g., example@domain.com).')
            .min(1, { message: 'The email is required' }),
        password: zod_1.z
            .string()
            .min(6, { message: 'Password must be at least 6 characters long.' }),
    }),
});
exports.AuthValidation = {
    loginValidationSchema,
};
