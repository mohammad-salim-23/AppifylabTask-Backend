"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().min(1, 'Email is required'),
        password: zod_1.z.string().min(1, 'Password is required')
    })
});
const registerValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string().min(1, 'firstName is required'),
        lastName: zod_1.z.string().min(1, 'lastName is required'),
        email: zod_1.z.string().email('Invalid email address'),
        password: zod_1.z.string().min(6, 'Password must be at least 6 characters long')
    })
});
exports.AuthValidation = {
    loginValidationSchema,
    registerValidationSchema,
};
