import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RegisterPage from "./register";

const createUserWithEmailAndPasswordMock = vi.fn();
const updateProfileMock = vi.fn();
const toastSuccessMock = vi.fn();
const toastErrorMock = vi.fn();

vi.mock("~/features/auth/services/firebase", () => ({
  auth: { currentUser: { uid: "1" } },
}));

vi.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: (...args: unknown[]) =>
    createUserWithEmailAndPasswordMock(...args),
  updateProfile: (...args: unknown[]) => updateProfileMock(...args),
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

vi.mock("react-router", async () => {
  const actual = (await vi.importActual("react-router")) as Record<
    string,
    unknown
  >;
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("Tests register page", () => {
  beforeEach(() => {
    createUserWithEmailAndPasswordMock.mockReset();
    updateProfileMock.mockReset();
    toastSuccessMock.mockReset();
    toastErrorMock.mockReset();
  });

  it("Renders register page", () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument();
  });

  it("Registers with email/password and shows success toast", async () => {
    const user = userEvent.setup();
    createUserWithEmailAndPasswordMock.mockResolvedValueOnce({
      user: { uid: "1" },
    });
    updateProfileMock.mockResolvedValueOnce(undefined);

    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText("Usuario"), "Ada");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Contraseña"), "secret123");
    await user.click(screen.getByRole("button", { name: "Sign up" }));

    await waitFor(() => {
      expect(createUserWithEmailAndPasswordMock).toHaveBeenCalledWith(
        expect.anything(),
        "ada@example.com",
        "secret123",
      );
    });

    await waitFor(() => {
      expect(updateProfileMock).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ displayName: "Ada" }),
      );
    });

    expect(toastSuccessMock).toHaveBeenCalledWith(
      "Usuario creado exitosamente",
    );
  });

  it("Shows validation errors when submitting empty form", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: "Sign up" }));

    expect(
      await screen.findByText("El usuario es obligatorio"),
    ).toBeInTheDocument();
    expect(
      await screen.findByText("El email es obligatorio"),
    ).toBeInTheDocument();
    expect(
      await screen.findByText("La contraseña es obligatoria"),
    ).toBeInTheDocument();
    expect(createUserWithEmailAndPasswordMock).not.toHaveBeenCalled();
  });

  it("Shows firebase error (email already in use)", async () => {
    const user = userEvent.setup();

    const { FirebaseError } = await import("firebase/app");
    const err = new FirebaseError("auth/email-already-in-use", "email in use");
    createUserWithEmailAndPasswordMock.mockRejectedValueOnce(err);

    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText("Usuario"), "Ada");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Contraseña"), "secret123");
    await user.click(screen.getByRole("button", { name: "Sign up" }));

    expect(await screen.findByText("Email ya está en uso")).toBeInTheDocument();
    expect(toastErrorMock).toHaveBeenCalledWith("Email ya está en uso");
  });
});
