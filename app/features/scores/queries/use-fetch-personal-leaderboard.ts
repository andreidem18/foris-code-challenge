import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";

import { db } from "~/lib/firebase";
import type { Score } from "../types";
import type { ScoreRes } from "../types/score";

export const FETCH__PERSONAL_LEADERBOARD_KEY = "personalLeaderboard";

export const useFetchPersonalLeaderboard = () => {
  return useQuery({
    queryKey: [FETCH__PERSONAL_LEADERBOARD_KEY],
    queryFn: async () => {
      const q = query(
        collection(db, "scores"),
        orderBy("turns", "asc"),
        orderBy("time", "asc"),
        limit(20),
      );

      try {
        await getDocs(q);
      } catch (error) {
        console.log(error);
      }
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
