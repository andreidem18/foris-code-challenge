import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  type LoginFormValues,
  loginSchema,
} from "~/features/login/schemas/login-schema";

export function useLoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onSubmit",
  });

  // TODO: API call
  const onValidSubmit = async (values: LoginFormValues) => {
    void values;
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onValidSubmit),
  };
}
