"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidtions = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
//// Define Zod validation for the user schema
const userchmeavalidations = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'The name field is required.',
        })
            .trim()
            .min(1, 'The name field is required.'),
        email: zod_1.z
            .string({
            required_error: 'The email field is required.',
        })
            .email('Please provide a valid email address, e.g., example@domain.com.'),
        password: zod_1.z
            .string({
            required_error: 'The password field is required.',
        })
            .min(6, 'Password must be at least 6 characters long.'),
        role: zod_1.z
            .enum([...user_constant_1.roletype], {
            invalid_type_error: "Role must be either 'admin' or 'user'.",
        })
            .default('user'),
    }),
});
exports.UserValidtions = {
    userchmeavalidations,
};
