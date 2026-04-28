import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import type { LoginFormValues } from "../schemas/login-schema";

export const loginWithEmail = ({ email, password }: LoginFormValues) => {
  return signInWithEmailAndPassword(auth, email, password);
};
