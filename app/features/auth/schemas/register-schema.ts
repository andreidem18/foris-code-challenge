import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "El usuario es obligatorio")
    .max(100, "El usuario es demasiado largo"),
  email: z
    .string()
    .trim()
    .min(1, "El email es obligatorio")
    .max(100, "El email es demasiado largo")
    .superRefine((value, ctx) => {
      if (value.length === 0) return;
      if (!z.email().safeParse(value).success) {
        ctx.addIssue({ code: "custom", message: "El email es inválido" });
      }
    }),
  password: z
    .string()
    .min(1, "La contraseña es obligatoria")
    .max(200, "La contraseña es demasiado larga"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
