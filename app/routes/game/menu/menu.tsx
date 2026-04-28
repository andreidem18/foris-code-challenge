import { Button } from "~/ui/button/button";

import styles from "./menu.module.scss";
import { useNavigate } from "react-router";
import { useGameStore } from "~/features/game/store/game-store";

export default function MenuPage() {
  const navigate = useNavigate();

  const { gameStarted, cards, resetGame } = useGameStore();

  const newGame = () => {
    resetGame();
    navigate("/game/board");
  };

  return (
    <div className={styles.menuContainer}>
      <div className={styles.menuContent}>
        <Button onClick={newGame}>Nuevo juego</Button>
        <Button
          disabled={!gameStarted || !cards}
          onClick={() => navigate("/game/board")}
        >
          Reanudar juego
        </Button>
        <Button variant="secondary">Mis puntajes</Button>
      </div>
    </div>
  );
}
