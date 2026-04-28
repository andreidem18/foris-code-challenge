import { Button } from "~/ui/button/button";
import styles from "./finish.module.scss";
import { Navigate, useLocation, useNavigate } from "react-router";
import { useGameStore } from "~/features/game/store/game-store";
import type { LocationState } from "~/features/game/types/locationState";
import { formatElapsedTime } from "~/features/game/utils/format-elapsed-time";

export function meta() {
  return [{ title: "Finish" }, { name: "description", content: "Memory game" }];
}

export default function FinishPage() {
  const navigate = useNavigate();
  const { turns, resetGame, elapsedMs } = useGameStore();

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
          <span>Terminaste el juego en {turns} intentos</span>
          <span>Tiempo: {formatElapsedTime(elapsedMs)}</span>
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
