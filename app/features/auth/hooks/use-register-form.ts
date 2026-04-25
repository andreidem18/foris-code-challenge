import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  type RegisterFormValues,
  registerSchema,
} from "~/features/auth/schemas/register-schema";
import { registerWithEmail } from "../services/registerWithEmail";
import { useNavigate } from "react-router";
import { mapRegisterAuthError } from "../utils/firebase-auth-error";
import { toast } from "sonner";

export function useRegisterForm() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
    mode: "onSubmit",
  });

  const navigate = useNavigate();

  const onValidSubmit = async (values: RegisterFormValues) => {
    try {
      await registerWithEmail(values);
      toast.success("Usuario creado exitosamente");
      navigate("/auth/login");
    } catch (error) {
      const mapped = mapRegisterAuthError(error);

      form.setError(
        mapped.field as "root" | "email" | "password" | "username",
        {
          type: "server",
          message: mapped.message,
        },
      );

      toast.error(mapped.message);
    }
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onValidSubmit),
  };
}
