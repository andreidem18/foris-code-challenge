import type { Score, scoreType } from "../../types";
import { useFetchLeaderboard } from "../../queries/use-fetch-leaderboard";

import styles from "./scores-table.module.scss";
import { Avatar } from "~/ui/avatar/avatar";
import { formatElapsedTime } from "~/features/game/utils/format-elapsed-time";
import { ScoresTableSkeleton } from "../scores-table-skeleton/scores-table-skeleton";

interface Props {
  scope: scoreType;
}

export const ScoresTable = ({ scope }: Props) => {
  const { data: scoresList, isLoading } = useFetchLeaderboard();

  // TODO: delete this
  console.log(scope);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.rankCol} scope="col">
            #
          </th>
          <th scope="col">Jugador</th>
          <th className={styles.numericCol} scope="col">
            Intentos
          </th>
          <th className={styles.numericCol} scope="col">
            Tiempo
          </th>
        </tr>
      </thead>
      <tbody>
        <ScoresTableBody isLoading={isLoading} scoresList={scoresList} />
      </tbody>
    </table>
  );
};

interface ScoresTableBodyProps {
  scoresList: Score[] | undefined;
  isLoading: boolean;
}

const ScoresTableBody = ({ scoresList, isLoading }: ScoresTableBodyProps) => {
  if (isLoading) return <ScoresTableSkeleton />;

  if (!scoresList || scoresList.length === 0) {
    return (
      <tr>
        <td className={styles.empty} colSpan={4}>
          No hay puntuaciones para mostrar.
        </td>
      </tr>
    );
  }
  return scoresList.map((score, index) => (
    <tr key={score.id}>
      <td className={styles.rankCol}>{index + 1}</td>
      <td>
        <div className={styles.userCell}>
          <Avatar url={score.photoURL} userName={score.userName} />
          <span className={styles.userName}>{score.userName}</span>
        </div>
      </td>
      <td className={styles.numericCol}>{score.turns}</td>
      <td className={styles.numericCol}>{formatElapsedTime(score.time)}</td>
    </tr>
  ));
};
