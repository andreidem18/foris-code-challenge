import clsx from "clsx";
import { useState } from "react";

import styles from "./scores.module.scss";
import { AvatarIcon, GlobeIcon } from "@radix-ui/react-icons";
import type { scoreType } from "~/features/scores/types";
import { ScoresTable } from "~/features/scores/components/scores-table/scores-table";

export function meta() {
  return [{ title: "Scores" }, { name: "description", content: "Scores" }];
}

export default function ScoresPage() {
  const [scope, setScope] = useState<scoreType>("personal");

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Puntuaciones</h1>
        <div className={styles.tabs} role="tablist" aria-label="Puntuaciones">
          <button
            type="button"
            role="tab"
            aria-selected={scope === "global"}
            className={clsx(styles.tab, scope === "global" && styles.tabActive)}
            onClick={() => setScope("global")}
          >
            <GlobeIcon />
            Global
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={scope === "personal"}
            className={clsx(
              styles.tab,
              scope === "personal" && styles.tabActive,
            )}
            onClick={() => setScope("personal")}
          >
            <AvatarIcon />
            Personal
          </button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <ScoresTable scope={scope} />
      </div>
    </div>
  );
}
