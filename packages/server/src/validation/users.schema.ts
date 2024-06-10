import { z } from "zod";

export const createUserSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
});

export const updateUserSchama = z.object({
    id: z.string().uuid(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
});