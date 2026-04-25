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
      return { field: "email", message: "El email es inválido" };
    case "auth/invalid-credential":
      // Avoid revealing which field is wrong.
      return { field: "root", message: "Email o contrase+a incorrectos" };
    case "auth/user-disabled":
      return { field: "root", message: "Este usuario está deshabilitado" };
    case "auth/too-many-requests":
      return {
        field: "root",
        message: "Demasiados intentos. Intenta de nuevo más tarde",
      };
    case "auth/network-request-failed":
      return {
        field: "root",
        message: "Error de red. Revisa tu conexión e intenta de nuevo",
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
      return { field: "email", message: "El email es inválido" };
    case "auth/email-already-in-use":
      return { field: "email", message: "Email ya está en uso" };
    case "auth/weak-password":
      return {
        field: "password",
        message: "La contraseña es demasiado débil",
      };
    case "auth/too-many-requests":
      return {
        field: "root",
        message: "Demasiados intentos. Intenta de nuevo más tarde",
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
