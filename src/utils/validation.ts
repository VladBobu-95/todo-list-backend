import { z, ZodSchema } from "zod";
import { ValidationError } from "./errors";


export const loginSchema = z.object({
    email: z.email({ message: "Email inválido" }),
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

export const registerSchema = z.object({
    nombre: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
    email: z.email({ message: "Email inválido" }),
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

export const crearTareaSchema = z.object({
    titulo: z.string().min(1, { message: "El título es obligatorio" }),
    descripcion: z.string().optional(),
});

export const cambiarPasswordSchema = z.object({
    passwordActual: z.string().min(6),
    passwordNuevo: z.string().min(6),
});


export const actualizarTareaSchema = z.object({
    titulo: z.string().min(1).optional(),
    descripcion: z.string().optional(),
    completada: z.boolean().optional(),
});


export function validar<T>(schema: ZodSchema<T>, data: unknown): T {
    const result = schema.safeParse(data);
    if (!result.success) {
        const primerError = result.error.issues[0];
        throw new ValidationError(primerError.message);
    }
    return result.data;
}

