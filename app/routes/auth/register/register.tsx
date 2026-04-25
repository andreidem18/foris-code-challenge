import { Link } from "react-router";

import styles from "./register.module.scss";

export default function RegisterPage() {
  return (
    <Link to="/auth/login" className={styles.link}>
      ¿Ya tienes cuenta? Inicia sesión
    </Link>
  );
}
