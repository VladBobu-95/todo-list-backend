import { z, ZodSchema } from "zod";
import { ValidationError } from "./errors";


export const loginSchema = z.object({
    email: z.email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export const registerSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export const createTaskSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().optional(),
});

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6),
});

export const updateTaskSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    completed: z.boolean().optional(),
});


export function validate<T>(schema: ZodSchema<T>, data: unknown): T {
    const result = schema.safeParse(data);
    if (!result.success) {
        const firstError = result.error.issues[0];
        throw new ValidationError(firstError.message);
    }
    return result.data;
}
