import { logo } from "~/assets/images";

import { useAuth } from "~/features/auth/hooks/use-auth";
import { Link, Navigate, Outlet, useLocation } from "react-router";

import styles from "./layout.module.scss";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useGameStore } from "~/features/game/store/game-store";
import { SessionBubble } from "~/features/auth/components/session-bubble/session-bubble";

export default function GameLayout() {
  // TODO: implement in a specific component to validate session
  const { user, loading } = useAuth();

  const { gameStarted } = useGameStore();
  const location = useLocation();

  const showBack = location.pathname === "/game/board" && !gameStarted;

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
      <SessionBubble />
    </>
  );
}
