import { describe, expect, it, vi } from "vitest";

import { mapLoginAuthError, mapRegisterAuthError } from "./firebase-auth-error";

vi.mock("firebase/app", () => ({
  FirebaseError: class FirebaseError extends Error {
    code: string;
    constructor(code: string, message: string) {
      super(message);
      this.code = code;
    }
  },
}));

describe("firebase-auth-error utils", () => {
  it("returns default message for non-Firebase errors", () => {
    expect(mapLoginAuthError(new Error("x"))).toEqual({
      field: "root",
      message: "Ocurrió un error. Intenta de nuevo.",
    });
    expect(mapRegisterAuthError({})).toEqual({
      field: "root",
      message: "Ocurrió un error. Intenta de nuevo.",
    });
  });

  it("maps login FirebaseError codes", async () => {
    const { FirebaseError } = await import("firebase/app");
    const err = (code: string) => new FirebaseError(code, code);

    expect(mapLoginAuthError(err("auth/invalid-email"))).toEqual({
      field: "email",
      message: "El email es inválido",
    });
    expect(mapLoginAuthError(err("auth/invalid-credential"))).toEqual({
      field: "root",
      message: "Email o contraseña incorrectos",
    });
    expect(mapLoginAuthError(err("auth/user-disabled"))).toEqual({
      field: "root",
      message: "Este usuario está deshabilitado",
    });
    expect(mapLoginAuthError(err("auth/too-many-requests"))).toEqual({
      field: "root",
      message: "Demasiados intentos. Intenta de nuevo más tarde",
    });
    expect(mapLoginAuthError(err("auth/network-request-failed"))).toEqual({
      field: "root",
      message: "Error de red. Revisa tu conexión e intenta de nuevo",
    });
    expect(mapLoginAuthError(err("auth/unknown"))).toEqual({
      field: "root",
      message: "Ocurrió un error. Intenta de nuevo.",
    });
  });

  it("maps register FirebaseError codes", async () => {
    const { FirebaseError } = await import("firebase/app");
    const err = (code: string) => new FirebaseError(code, code);

    expect(mapRegisterAuthError(err("auth/invalid-email"))).toEqual({
      field: "email",
      message: "El email es inválido",
    });
    expect(mapRegisterAuthError(err("auth/email-already-in-use"))).toEqual({
      field: "email",
      message: "Email ya está en uso",
    });
    expect(mapRegisterAuthError(err("auth/weak-password"))).toEqual({
      field: "password",
      message: "La contraseña es demasiado débil",
    });
    expect(mapRegisterAuthError(err("auth/too-many-requests"))).toEqual({
      field: "root",
      message: "Demasiados intentos. Intenta de nuevo más tarde",
    });
    expect(mapRegisterAuthError(err("auth/network-request-failed"))).toEqual({
      field: "root",
      message: "Error de red. Revisa tu conexión e intenta de nuevo",
    });
    expect(mapRegisterAuthError(err("auth/unknown"))).toEqual({
      field: "root",
      message: "Ocurrió un error. Intenta de nuevo.",
    });
  });
});
