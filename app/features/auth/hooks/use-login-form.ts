import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  type LoginFormValues,
  loginSchema,
} from "~/features/auth/schemas/login-schema";
import { loginWithEmail } from "../services/loginWithEmail";
import { useNavigate } from "react-router";
import { FirebaseError } from "firebase/app";

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
      if (error instanceof FirebaseError) {
        if (error.message.includes("auth/invalid-credential")) {
          alert("Credenciales inválidas");
        } else {
          alert("Error");
        }
      } else {
        alert("Error");
      }
    }
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onValidSubmit),
  };
}
