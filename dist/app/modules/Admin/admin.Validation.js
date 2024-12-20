"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidations = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
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
const userBlockIdvalidationSchema = zod_1.z.object({
    params: zod_1.z.object({
        userId: objectIdSchema,
    }),
});
exports.AdminValidations = {
    IdvalidationSchema,
    userBlockIdvalidationSchema,
};
