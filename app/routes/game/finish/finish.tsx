import { Button } from "~/ui/button/button";
import styles from "./finish.module.scss";
import { Navigate, useLocation, useNavigate } from "react-router";
import type { GameResult } from "~/features/game/types/game-result";
import { gameSession } from "~/features/game/utils/game-session";

export default function FinishPage() {
  const location = useLocation();
  const state = location.state as GameResult | null;
  const navigate = useNavigate();
  console.log({ "gameSession.isFinished": gameSession.isFinished() });

  if (!gameSession.isFinished()) return <Navigate to="/game" />;

  return (
    <div className={styles.finishPageContainer}>
      <div className={styles.finishPageContent}>
        <h1 className={styles.title}>¡Felicidades!</h1>
        <div className={styles.description}>
          Terminaste el juego en {state?.turns} intentos
        </div>
        <div className={styles.buttons}>
          <Button onClick={() => navigate("/game")}>Repetir</Button>
          <Button variant="secondary">Inicio</Button>
        </div>
      </div>
    </div>
  );
}
