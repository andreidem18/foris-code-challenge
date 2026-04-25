import { FirebaseError } from "firebase/app";

type MappedFormError<Field extends string> = {
  field: Field | "root";
  message: string;
};

const DEFAULT_MESSAGE = "Ocurri\u00f3 un error. Intenta de nuevo.";

export function mapLoginAuthError(
  error: unknown,
): MappedFormError<"email" | "password"> {
  if (!(error instanceof FirebaseError)) {
    return { field: "root", message: DEFAULT_MESSAGE };
  }

  switch (error.code) {
    case "auth/invalid-email":
      return { field: "email", message: "El email es inv\u00e1lido" };
    case "auth/invalid-credential":
      // Avoid revealing which field is wrong.
      return { field: "root", message: "Email o contrase\u00f1a incorrectos" };
    case "auth/user-disabled":
      return { field: "root", message: "Este usuario est\u00e1 deshabilitado" };
    case "auth/too-many-requests":
      return {
        field: "root",
        message: "Demasiados intentos. Intenta de nuevo m\u00e1s tarde",
      };
    case "auth/network-request-failed":
      return {
        field: "root",
        message: "Error de red. Revisa tu conexi\u00f3n e intenta de nuevo",
      };
    default:
      return { field: "root", message: DEFAULT_MESSAGE };
  }
}

export function mapRegisterAuthError(
  error: unknown,
): MappedFormError<"email" | "password" | "username"> {
  if (!(error instanceof FirebaseError)) {
    return { field: "root", message: DEFAULT_MESSAGE };
  }

  switch (error.code) {
    case "auth/invalid-email":
      return { field: "email", message: "El email es inv\u00e1lido" };
    case "auth/email-already-in-use":
      return { field: "email", message: "Email ya est\u00e1 en uso" };
    case "auth/weak-password":
      return {
        field: "password",
        message: "La contrase\u00f1a es demasiado d\u00e9bil",
      };
    case "auth/too-many-requests":
      return {
        field: "root",
        message: "Demasiados intentos. Intenta de nuevo m\u00e1s tarde",
      };
    case "auth/network-request-failed":
      return {
        field: "root",
        message: "Error de red. Revisa tu conexi\u00f3n e intenta de nuevo",
      };
    default:
      return { field: "root", message: DEFAULT_MESSAGE };
  }
}
