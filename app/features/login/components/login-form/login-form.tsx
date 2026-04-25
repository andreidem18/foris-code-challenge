import { useState } from "react";

import styles from "./login-form.module.scss";

import { Button } from "~/ui/button/button";
import { Input, Label } from "~/ui";
import { FormError } from "~/ui/form-error/form-error";
import { useLoginForm } from "~/features/login/hooks/use-login-form";

export const LoginForm = () => {
  const [displayPassword, setDisplayPassword] = useState(false);
  const {
    register,
    onSubmit,
    formState: { errors, isSubmitting },
  } = useLoginForm();

  return (
    <form className={styles.loginForm} onSubmit={onSubmit} noValidate>
      <div className={styles.inputContainer}>
        <Label htmlFor="username">Usuario</Label>
        <Input
          id="username"
          className={styles.input}
          autoComplete="username"
          aria-invalid={errors.username ? true : undefined}
          aria-describedby={errors.username ? "username-error" : undefined}
          {...register("username")}
        />
        <FormError id="username-error" message={errors.username?.message} />
      </div>
      <div className={styles.inputContainer}>
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          className={styles.input}
          autoComplete="current-password"
          displayEye
          isHidden={!displayPassword}
          type={displayPassword ? "text" : "password"}
          onHide={() => setDisplayPassword(!displayPassword)}
          aria-invalid={errors.password ? true : undefined}
          aria-describedby={errors.password ? "password-error" : undefined}
          {...register("password")}
        />
        <FormError id="password-error" message={errors.password?.message} />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        Login
      </Button>
    </form>
  );
};
