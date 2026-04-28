import { Button } from "~/ui/button/button";
import styles from "./finish.module.scss";
import { Navigate, useLocation, useNavigate } from "react-router";
import { useGameStore } from "~/features/game/store/game-store";
import type { LocationState } from "~/features/game/types/locationState";

export default function FinishPage() {
  const navigate = useNavigate();
  const { turns, resetGame } = useGameStore();

  const location = useLocation() as { state: LocationState };

  const resetAndNavigate = (route: string) => {
    navigate(route);
    resetGame();
  };

  if (!location.state?.fromGame) return <Navigate to="/game/board" />;

  return (
    <div className={styles.finishPageContainer}>
      <div className={styles.finishPageContent}>
        <h1 className={styles.title}>¡Felicidades!</h1>
        <div className={styles.description}>
          Terminaste el juego en {turns} intentos
        </div>
        <div className={styles.buttons}>
          <Button onClick={() => resetAndNavigate("/game/board")}>
            Repetir
          </Button>
          <Button
            variant="secondary"
            onClick={() => resetAndNavigate("/game/menu")}
          >
            Inicio
          </Button>
        </div>
      </div>
    </div>
  );
}
