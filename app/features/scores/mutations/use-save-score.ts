import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { db } from "~/lib/firebase";
import { toast } from "sonner";
import { FETCH_GLOBAL_LEADERBOARD_KEY } from "../queries/use-fetch-global-leaderboard";
import { FETCH__PERSONAL_LEADERBOARD_KEY } from "../queries/use-fetch-personal-leaderboard";
import type { Score } from "../types";
import type { IsRecord } from "~/features/game/types/is-record";

interface Params {
  userId: string;
  userName: string | null;
  photoURL: string | null;
  turns: number;
  time: number;
}

export const useSaveScore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: Params): Promise<IsRecord> => {
      const newScore = {
        ...params,
        createdAt: new Date(),
      };
      await addDoc(collection(db, "scores"), newScore);

      // update best score
      const ref = doc(db, "bestScores", params.userId);
      const existing = await getDoc(ref);

      if (!existing.exists()) {
        await setDoc(ref, newScore);
        return {
          newPersonalRecord: false,
          newGlobalRecord: false,
        };
      }

      const prev = existing.data() as Score;

      const isBetter =
        params.turns < prev.turns ||
        (params.turns === prev.turns && params.time < prev.time);

      if (isBetter) {
        const newGlobalRecord = await checkGlobalRecord(newScore);
        await setDoc(ref, newScore);
        return {
          newPersonalRecord: true,
          newGlobalRecord,
        };
      }
      return {
        newPersonalRecord: false,
        newGlobalRecord: false,
      };
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [FETCH_GLOBAL_LEADERBOARD_KEY],
      });
      await queryClient.invalidateQueries({
        queryKey: [FETCH__PERSONAL_LEADERBOARD_KEY],
      });
    },
    onError: () => {
      toast.error("Hubo un error guardando tu puntaje");
    },
  });
};

const checkGlobalRecord = async (newScore: { turns: number; time: number }) => {
  const globalQuery = query(
    collection(db, "bestScores"),
    orderBy("turns", "asc"),
    orderBy("time", "asc"),
    limit(1),
  );

  const snapshot = await getDocs(globalQuery);
  const globalBest = snapshot.docs[0]?.data() as Score | undefined;

  return (
    !globalBest ||
    newScore.turns < globalBest.turns ||
    (newScore.turns === globalBest.turns && newScore.time < globalBest.time)
  );
};
