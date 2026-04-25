import { useState } from "react";

import styles from "./register-form.module.scss";

import { Button } from "~/ui/button/button";
import { Input, Label, Spinner } from "~/ui";
import { FormError } from "~/ui/form-error/form-error";
import { useRegisterForm } from "../../hooks/use-register-form";

export const RegisterForm = () => {
  const [displayPassword, setDisplayPassword] = useState(false);
  const {
    register,
    onSubmit,
    formState: { errors, isSubmitting },
  } = useRegisterForm();

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
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          className={styles.input}
          autoComplete="email"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
        <FormError id="email-error" message={errors.email?.message} />
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
      <FormError message={errors.root?.message} />
      <Button
        type="submit"
        disabled={isSubmitting}
        className={styles.submitButton}
      >
        {isSubmitting && <Spinner className={styles.spinner} />}
        Sign up
      </Button>
    </form>
  );
};
