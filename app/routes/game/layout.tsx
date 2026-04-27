import { logo } from "~/assets/images";

import { useAuth } from "~/features/auth/hooks/use-auth";
import { Navigate, Outlet } from "react-router";

import styles from "./layout.module.scss";

export default function GameLayout() {
  // TODO: implement in a specific component to validate session
  const { user, loading } = useAuth();

  if (!loading && !user) return <Navigate to="/auth/login" replace />;
  return (
    <>
      <div className={styles.centerLayout}>
        <div className={styles.gameLayout}>
          <img src={logo} alt="Rick and Morty logo" className={styles.logo} />
          <div className={styles.gameTitle}>Juego de memoria</div>
          <div className={styles.gameContainer}>
            <Outlet />
          </div>
        </div>
      </div>

      {/* TODO: Create a good button to handle the session */}
      <button className={styles.sessionButton}>
        {user?.photoURL && (
          <img src={user?.photoURL} alt={user.displayName || ""} />
        )}
      </button>
    </>
  );
}
