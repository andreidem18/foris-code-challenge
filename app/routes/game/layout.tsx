import { logo } from "~/assets/images";

import { Link, Outlet, useLocation } from "react-router";

import styles from "./layout.module.scss";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useGameStore } from "~/features/game/store/game-store";
import { SessionBubble } from "~/features/auth/components/session-bubble/session-bubble";

export default function GameLayout() {
  const { gameStarted } = useGameStore();
  const location = useLocation();

  const showBack =
    (location.pathname === "/game/board" && !gameStarted) ||
    location.pathname === "/game/scores";

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
              <Link className={styles.gameTitle} to="/game/menu">
                Juego de memoria
              </Link>
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
