import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  type RegisterFormValues,
  registerSchema,
} from "~/features/auth/schemas/register-schema";
import { registerWithEmail } from "../services/registerWithEmail";
import { useNavigate } from "react-router";
import { FirebaseError } from "firebase/app";

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
      alert("User created successfully");
      navigate("/login");
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.message.includes("auth/email-already-in-use")) {
          alert("Email ya está en uso");
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
