import { useGameTimer } from "../../hooks/use-game-timer";
import { useGameStore } from "../../store/game-store";
import { formatElapsedTime } from "../../utils/format-elapsed-time";

import styles from "./game-timer.module.scss";

interface Props {
  className?: string;
}

export function GameTimer({ className }: Props) {
  useGameTimer();

  const elapsedMs = useGameStore((s) => s.elapsedMs);

  return (
    <div className={className} data-slot="game-timer">
      <span className={styles.label}>Tiempo:</span>{" "}
      <span className={styles.value}>{formatElapsedTime(elapsedMs)}</span>
    </div>
  );
}
