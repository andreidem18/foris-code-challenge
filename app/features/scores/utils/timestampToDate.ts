import type { FirestoreTimestamp } from "../types";

export function timestampToDate(ts: FirestoreTimestamp) {
  return new Date(ts.seconds * 1000 + ts.nanoseconds / 1e6);
}
