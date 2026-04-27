import { logo } from "~/assets/images";

import { useAuth } from "~/features/auth/hooks/use-auth";
import { Link, Navigate, Outlet, useLocation } from "react-router";

import styles from "./layout.module.scss";
import { gameSession } from "~/features/game/utils/game-session";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

export default function GameLayout() {
  // TODO: implement in a specific component to validate session
  const { user, loading } = useAuth();

  const { isStarted } = gameSession;
  const location = useLocation();

  const showBack = location.pathname === "/game/board" && !isStarted();
  console.log({
    showBack,
    "location.pathname": location.pathname,
    "isStarted()": isStarted(),
  });

  if (!loading && !user) return <Navigate to="/auth/login" replace />;
  return (
    <>
      <div className={styles.centerLayout}>
        <div className={styles.gameLayout}>
          <div className={styles.titleContainer}>
            {showBack && (
              <Link to="/game/menu" className={styles.backButton}>
                <ChevronLeftIcon />
              </Link>
            )}
            <div className={styles.logoContainer}>
              <img
                src={logo}
                alt="Rick and Morty logo"
                className={styles.logo}
              />
              <div className={styles.gameTitle}>Juego de memoria</div>
            </div>
          </div>
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
