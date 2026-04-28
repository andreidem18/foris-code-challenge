import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";

import { db } from "~/lib/firebase";
import type { Score } from "../types";
import type { ScoreRes } from "../types/score";

export const FETCH_GLOBAL_LEADERBOARD_KEY = "globalLeaderboard";

export const useFetchGlobalLeaderboard = () => {
  return useQuery({
    queryKey: [FETCH_GLOBAL_LEADERBOARD_KEY],
    queryFn: async () => {
      const q = query(
        collection(db, "bestScores"),
        orderBy("turns", "asc"),
        orderBy("time", "asc"),
        limit(20),
      );

      await getDocs(q);
      const snapshot = await getDocs(q);

      return snapshot.docs.map(
        (doc): Score => ({
          id: doc.id,
          ...(doc.data() as ScoreRes),
        }),
      );
    },
  });
};
