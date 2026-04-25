import { Navigate } from "react-router";
import { useAuth } from "~/features/auth/hooks/use-auth";

import styles from "./game.module.scss";
import { logo } from "~/assets/images";
import { Button } from "~/ui/button/button";

export function meta() {
  return [{ title: "Game" }, { name: "description", content: "Memory game" }];
}

export default function GamePage() {
  // TODO: implement in a specific component to validate session
  const { user, loading } = useAuth();
  console.log({ user });

  if (!loading && !user) return <Navigate to="/auth/login" replace />;

  return (
    <>
      <div className={styles.centerLayout}>
        <div className={styles.gameLayout}>
          <img src={logo} alt="Rick and Morty logo" className={styles.logo} />
          <div className={styles.gameTitle}>Juego de memoria</div>
          <div className={styles.gameContainer}>
            <div className={styles.gameHeader}>
              <h3>Personajes</h3>
              <Button>Jugar</Button>
            </div>
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
