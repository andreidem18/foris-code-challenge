import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  type LoginFormValues,
  loginSchema,
} from "~/features/auth/schemas/login-schema";
import { loginWithEmail } from "../services/loginWithEmail";
import { useNavigate } from "react-router";
import { mapLoginAuthError } from "../utils/firebase-auth-error";

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

  // TODO: API call
  const onValidSubmit = async (values: LoginFormValues) => {
    try {
      await loginWithEmail(values);
      alert("Succesful login");
      navigate("/game");
    } catch (error) {
      const mapped = mapLoginAuthError(error);

      form.setError(mapped.field as "root" | "email" | "password", {
        type: "server",
        message: mapped.message,
      });
    }
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onValidSubmit),
  };
}
