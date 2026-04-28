import { Button } from "~/ui/button/button";
import styles from "./finish.module.scss";
import { Navigate, useNavigate } from "react-router";
import { useGameStore } from "~/features/game/store/game-store";

export default function FinishPage() {
  const navigate = useNavigate();
  const { turns } = useGameStore();

  if (turns === null || turns === undefined) return <Navigate to="/game/board" />

  return (
    <div className={styles.finishPageContainer}>
      <div className={styles.finishPageContent}>
        <h1 className={styles.title}>¡Felicidades!</h1>
        <div className={styles.description}>
          Terminaste el juego en {turns} intentos
        </div>
        <div className={styles.buttons}>
          <Button onClick={() => navigate("/game/board")}>Repetir</Button>
          <Button variant="secondary" onClick={() => navigate("/game/menu")}>
            Inicio
          </Button>
        </div>
      </div>
    </div>
  );
}
