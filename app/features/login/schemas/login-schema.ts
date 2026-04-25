import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "El usuario es obligatorio")
    .max(100, "El usuario es demasiado largo"),
  password: z
    .string()
    .min(1, "La contraseña es obligatoria")
    .max(200, "La contraseña es demasiado larga"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
