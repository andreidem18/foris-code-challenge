import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";

import { db } from "~/lib/firebase";
import type { Score } from "../types";
import type { ScoreRes } from "../types/score";

export const FETCH__PERSONAL_LEADERBOARD_KEY = "personalLeaderboard";

interface Params {
  userId: string | null | undefined;
}

export const useFetchPersonalLeaderboard = ({ userId }: Params) => {
  return useQuery({
    queryKey: [FETCH__PERSONAL_LEADERBOARD_KEY],
    queryFn: async (): Promise<Score[]> => {
      if (!userId) return [];

      const q = query(
        collection(db, "scores"),
        where("userId", "==", userId),
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
    enabled: Boolean(userId),
  });
};
