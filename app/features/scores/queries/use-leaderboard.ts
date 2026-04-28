import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";

import { db } from "~/lib/firebase";
import type { Score } from "../types";

export const useLeaderboard = () => {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const q = query(
        collection(db, "scores"),
        orderBy("turns", "asc"),
        orderBy("time", "asc"),
        limit(20),
      );

      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) => ({
        // id: doc.id,
        ...(doc.data() as Score),
      }));
    },
  });
};
