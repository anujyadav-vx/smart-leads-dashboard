import { z } from "zod";

export const loginSchema = z.object({

  email: z
    .string()
    .email("Invalid email"),

  password: z
    .string()
    .min(6, "Password minimum 6 characters")
});

export const registerSchema = z.object({

  name: z
    .string()
    .min(3, "Name minimum 3 characters"),

  email: z
    .string()
    .email("Invalid email"),

  password: z
    .string()
    .min(6, "Password minimum 6 characters")
});

export type LoginFormData =
  z.infer<typeof loginSchema>;

export type RegisterFormData =
  z.infer<typeof registerSchema>;