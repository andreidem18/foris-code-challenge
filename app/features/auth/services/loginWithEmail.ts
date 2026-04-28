import { signInWithEmailAndPassword } from "firebase/auth";
import type { LoginFormValues } from "../schemas/login-schema";
import { auth } from "~/lib/firebase";

export const loginWithEmail = ({ email, password }: LoginFormValues) => {
  return signInWithEmailAndPassword(auth, email, password);
};
