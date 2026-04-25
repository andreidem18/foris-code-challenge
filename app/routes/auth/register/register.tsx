import { Link } from "react-router";

import styles from "./register.module.scss";
import { RegisterForm } from "~/features/auth/components/register-form/register-form";

export default function RegisterPage() {
  return (
    <>
      <RegisterForm />
      <Link to="/auth/login" className={styles.link}>
        ¿Ya tienes cuenta? Inicia sesión
      </Link>
    </>
  );
}
