import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  type RegisterFormValues,
  registerSchema,
} from "~/features/auth/schemas/register-schema";

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

  // TODO: API call
  const onValidSubmit = async (values: RegisterFormValues) => {
    void values;
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onValidSubmit),
  };
}
