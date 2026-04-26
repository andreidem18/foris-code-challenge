import styles from "./game.module.scss";
import { MemoryGame } from "~/features/game/components/memory-game/memory-game";

export function meta() {
  return [{ title: "Game" }, { name: "description", content: "Memory game" }];
}

export default function GamePage() {
  return (
    <>
      <div className={styles.gameContainer}>
        <MemoryGame />
      </div>
    </>
  );
}
