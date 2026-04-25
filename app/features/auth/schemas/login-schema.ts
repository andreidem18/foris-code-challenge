import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "El email es obligatorio")
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

export type LoginFormValues = z.infer<typeof loginSchema>;
