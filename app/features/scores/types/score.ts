export interface Score {
  id: string;
  photoURL: string;
  time: number;
  turns: number;
  userId: string;
  userName: string;
  createdAt: FirestoreTimestamp;
}

export interface ScoreRes {
  photoURL: string;
  time: number;
  turns: number;
  userId: string;
  userName: string;
  createdAt: FirestoreTimestamp;
}

export interface FirestoreTimestamp {
  nanoseconds: number;
  seconds: number;
}
