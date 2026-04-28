import { es } from "date-fns/locale";
import { format } from "date-fns";

import type { Score, scoreType } from "../../types";
import { useFetchPersonalLeaderboard } from "../../queries/use-fetch-personal-leaderboard";
import styles from "./scores-table.module.scss";
import { Avatar } from "~/ui/avatar/avatar";
import { formatElapsedTime } from "~/features/game/utils/format-elapsed-time";
import { ScoresTableSkeleton } from "../scores-table-skeleton/scores-table-skeleton";
import { timestampToDate } from "../../utils/timestampToDate";
import { useFetchGlobalLeaderboard } from "../../queries/use-fetch-global-leaderboard";

interface Props {
  scope: scoreType;
}

export const ScoresTable = ({ scope }: Props) => {
  const { data: personalScoresList, isLoading: isLeaderboardLoading } =
    useFetchPersonalLeaderboard();
  const { data: globalScoresList, isLoading: isGlobalLeaderboardLoading } =
    useFetchGlobalLeaderboard();

  const scoresList =
    scope === "personal" ? personalScoresList : globalScoresList;
  const isLoading = isLeaderboardLoading || isGlobalLeaderboardLoading;

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
          <th className={styles.numericCol} scope="col">
            Fecha
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
  return scoresList.map((score, index) => {
    const date = timestampToDate(score.createdAt);
    const dateFormatted = format(date, "dd-MM-yyyy h:mmaaa", { locale: es });
    return (
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
        <td className={styles.dateCol}>{dateFormatted}</td>
      </tr>
    );
  });
};
