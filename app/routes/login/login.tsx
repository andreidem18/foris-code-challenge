import { logo } from "~/assets/images";
import { LoginForm } from "~/features/login/components";

import styles from "./login.module.scss";
import { Link } from "react-router";

export function meta() {
  return [
    { title: "Login" },
    { name: "description", content: "Login to Rick and Morty Memory App" },
  ];
}

export default function LoginPage() {
  return (
    <div className={styles.loginLayout}>
      <div className={styles.loginContainer}>
        <img src={logo} className={styles.logo} />
        <LoginForm />
        <Link to="/signup" className={styles.link}>
          ¿No tienes cuenta?
        </Link>
      </div>
    </div>
  );
}
