import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "~/lib/firebase";
import type { RegisterFormValues } from "../schemas/register-schema";

export const registerWithEmail = async ({
  email,
  password,
  username,
}: RegisterFormValues) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);

  if (auth.currentUser) {
    await updateProfile(auth.currentUser, {
      displayName: username,
    });
  }

  return result;
};
