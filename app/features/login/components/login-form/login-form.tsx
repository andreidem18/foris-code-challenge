import { Input, Label } from "~/ui";
import styles from "./login-form.module.scss";
import { useState } from "react";
import { Button } from "~/ui/button/button";

export const LoginForm = () => {
  const [displayPassword, setDisplayPassword] = useState(false);

  return (
    <form className={styles.loginForm}>
      <div className={styles.inputContainer}>
        <Label>Usuario</Label>
        <Input className={styles.input} />
      </div>
      <div className={styles.inputContainer}>
        <Label>Contraseña</Label>
        <Input
          className={styles.input}
          displayEye
          isHidden={!displayPassword}
          type={displayPassword ? "text" : "password"}
          onHide={() => setDisplayPassword(!displayPassword)}
        />
      </div>
      <Button>Login</Button>
    </form>
  );
};
