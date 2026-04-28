import { Skeleton } from "~/ui";
import styles from "./scores-table-skeleton.module.scss";

export const ScoresTableSkeleton = () => {
  const array = [...Array(12).keys()].map((x) => x + 1);

  return array.map((element) => (
    <tr key={element}>
      <td className={styles.rankCol}>{element}</td>
      <td>
        <div className={styles.userCell}>
          <Skeleton className={styles.avatar} />
          <span className={styles.userName}>
            <Skeleton />
          </span>
        </div>
      </td>
      <td className={styles.numericCol}>
        <Skeleton />
      </td>
      <td className={styles.numericCol}>
        <Skeleton />
      </td>
      <td className={styles.numericCol}>
        <Skeleton />
      </td>
    </tr>
  ));
};
