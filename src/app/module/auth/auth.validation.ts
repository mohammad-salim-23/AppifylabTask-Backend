import {z} from 'zod';

const loginValidationSchema = z.object({
    body: z.object({
        email: z.string().min(1, 'Email is required'),
        password: z.string().min(1,'Password is required')
        
    })
});

const registerValidationSchema = z.object({
    body:z.object({
        firstName: z.string().min(1,'firstName is required'),
        lastName: z.string().min(1,'lastName is required'),
        email: z.string().email('Invalid email address'),
        password: z.string().min(6,'Password must be at least 6 characters long')
    })
})

export const AuthValidation = {
    loginValidationSchema,
    registerValidationSchema,
   
}