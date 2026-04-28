import { logo } from "~/assets/images";
import styles from "./auth.module.scss";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "~/features/auth/hooks/use-auth";

export default function AuthPage() {
  const { user } = useAuth();

  if (user) return <Navigate to="/game/menu" />;

  return (
    <div className={styles.loginLayout}>
      <div className={styles.loginContainer}>
        <img src={logo} className={styles.logo} alt="Rick and Morty Logo" />
        <Outlet />
      </div>
    </div>
  );
}
