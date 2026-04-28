import { MemoryRouter } from "react-router";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "./login";

import { meta } from "./login";

const signInWithEmailAndPasswordMock = vi.fn();
const signInWithPopupMock = vi.fn();
const toastSuccessMock = vi.fn();
const toastErrorMock = vi.fn();

vi.mock("~/features/auth/services/firebase", () => ({
  auth: { currentUser: null },
}));

vi.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: (...args: unknown[]) =>
    signInWithEmailAndPasswordMock(...args),
  signInWithPopup: (...args: unknown[]) => signInWithPopupMock(...args),
  GoogleAuthProvider: class GoogleAuthProvider {},
}));

vi.mock("firebase/app", () => ({
  FirebaseError: class FirebaseError extends Error {
    code: string;
    constructor(code: string, message: string) {
      super(message);
      this.code = code;
    }
  },
}));

vi.mock("sonner", () => ({
  toast: {
    success: (...args: unknown[]) => toastSuccessMock(...args),
    error: (...args: unknown[]) => toastErrorMock(...args),
  },
  Toaster: () => null,
}));

const mockNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual = (await vi.importActual("react-router")) as Record<
    string,
    unknown
  >;
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Tests login page", () => {
  beforeEach(() => {
    signInWithEmailAndPasswordMock.mockReset();
    signInWithPopupMock.mockReset();
    toastSuccessMock.mockReset();
    toastErrorMock.mockReset();
    mockNavigate.mockReset();
  });

  it("Exports meta tags", () => {
    expect(meta()).toEqual([
      { title: "Login" },
      { name: "description", content: "Login to Rick and Morty Memory App" },
    ]);
  });

  it("Renders login page", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("button", {
        name: "Login",
      }),
    ).toBeInTheDocument();
  });

  it("Logs in with email/password and shows success toast", async () => {
    const user = userEvent.setup();
    signInWithEmailAndPasswordMock.mockResolvedValueOnce({
      user: { uid: "1" },
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText("Email"), "test@example.com");
    await user.type(screen.getByLabelText("Contraseña"), "secret123");
    await user.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(signInWithEmailAndPasswordMock).toHaveBeenCalledWith(
        expect.anything(),
        "test@example.com",
        "secret123",
      );
    });

    expect(toastSuccessMock).toHaveBeenCalledWith("Login exitoso");
    expect(mockNavigate).toHaveBeenCalledWith("/game/menu");
  });

  it("Shows validation errors when submitting empty form", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: "Login" }));

    expect(
      await screen.findByText("El email es obligatorio"),
    ).toBeInTheDocument();
    expect(
      await screen.findByText("La contraseña es obligatoria"),
    ).toBeInTheDocument();
    expect(signInWithEmailAndPasswordMock).not.toHaveBeenCalled();
  });

  it("Logs in with Google and shows error toast on failure", async () => {
    const user = userEvent.setup();
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    signInWithPopupMock.mockRejectedValueOnce(new Error("popup failed"));

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: /Login con google/i }));

    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith(
        "No se pudo iniciar sesión con Google",
      );
    });

    consoleErrorSpy.mockRestore();
  });

  it("Logs in with Google and navigates on success", async () => {
    const user = userEvent.setup();
    signInWithPopupMock.mockResolvedValueOnce({ user: { uid: "1" } });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: /Login con google/i }));

    await waitFor(() => {
      expect(signInWithPopupMock).toHaveBeenCalled();
    });

    expect(toastSuccessMock).toHaveBeenCalledWith("Login exitoso");
    expect(mockNavigate).toHaveBeenCalledWith("/game/menu");
  });
});
