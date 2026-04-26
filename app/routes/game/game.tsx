import { Navigate } from "react-router";
import { useAuth } from "~/features/auth/hooks/use-auth";

import styles from "./game.module.scss";
import { logo } from "~/assets/images";
import { MemoryGame } from "~/features/game/components/memory-game/memory-game";

export function meta() {
  return [{ title: "Game" }, { name: "description", content: "Memory game" }];
}

export default function GamePage() {
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
            <MemoryGame />
          </div>
        </div>
      </div>
      {/* TODO: Create a good button to handle the session */}
      <button className={styles.sessionButton}>
        {user?.photoURL && <img src={user?.photoURL} />}
      </button>
    </>
  );
}
