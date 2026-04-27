import { Skeleton } from "~/ui";
import styles from "./card-grid-skeleton.module.scss";

export const CardGridSkeleton = () => {
  const array = [...Array(12).keys()].map((x) => x + 1);
  return array.map((number) => (
    <li className={styles.card} key={number}>
      <Skeleton className={styles.characterImage} />
      <Skeleton className={styles.characterName} />
      <Skeleton className={styles.characterDescription} />
    </li>
  ));
};
