import { StarFilledIcon } from "@radix-ui/react-icons";
import { Navigate, useLocation, useNavigate } from "react-router";

import { Button } from "~/ui/button/button";
import styles from "./finish.module.scss";
import { useGameStore } from "~/features/game/store/game-store";
import type { LocationState } from "~/features/game/types/locationState";
import { formatElapsedTime } from "~/features/game/utils/format-elapsed-time";

export function meta() {
  return [{ title: "Finish" }, { name: "description", content: "Memory game" }];
}

export default function FinishPage() {
  const navigate = useNavigate();
  const { turns, resetGame, elapsedMs, isRecord } = useGameStore();

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
        <div className={styles.records}>
          {isRecord.newPersonalRecord && (
            <div className={styles.personalRecord}>
              <StarFilledIcon />
              <div>
                ¡Lograste un record <span>personal</span>!
              </div>
            </div>
          )}
          {isRecord.newGlobalRecord && (
            <div className={styles.globalRecord}>
              <StarFilledIcon />
              <div>
                ¡Lograste un record <span>global</span>!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
