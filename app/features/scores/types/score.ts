export interface Score {
  id: string;
  photoURL: string;
  time: number;
  turns: number;
  userId: string;
  userName: string;
}

export interface ScoreRes {
  photoURL: string;
  time: number;
  turns: number;
  userId: string;
  userName: string;
}
