import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  type LoginFormValues,
  loginSchema,
} from "~/features/auth/schemas/login-schema";
import { loginWithEmail } from "../services/loginWithEmail";
import { useNavigate } from "react-router";
import { mapLoginAuthError } from "../utils/firebase-auth-error";
import { toast } from "sonner";

export function useLoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const navigate = useNavigate();

  const onValidSubmit = async (values: LoginFormValues) => {
    try {
      await loginWithEmail(values);
      toast.success("Login exitoso");
      navigate("/game");
    } catch (error) {
      const mapped = mapLoginAuthError(error);

      form.setError(mapped.field as "root" | "email" | "password", {
        type: "server",
        message: mapped.message,
      });

      toast.error(mapped.message);
    }
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onValidSubmit),
  };
}
