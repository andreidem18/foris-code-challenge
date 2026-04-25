import { logo } from "~/assets/images";
import styles from "./auth.module.scss";
import { Outlet } from "react-router";

export default function AuthPage() {
  return (
    <div className={styles.loginLayout}>
      <div className={styles.loginContainer}>
        <img src={logo} className={styles.logo} />
        <Outlet />
      </div>
    </div>
  );
}
