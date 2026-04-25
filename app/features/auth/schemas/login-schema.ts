import { z } from "zod";

export const loginSchema = z.object({
  email: z.email().trim().min(1, "El email es obligatorio"),
  password: z
    .string()
    .min(1, "La contraseña es obligatoria")
    .max(200, "La contraseña es demasiado larga"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
