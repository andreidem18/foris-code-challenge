import { MemoryRouter } from "react-router";
import { beforeAll, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import LoginPage from "./login";

describe("Tests login page", () => {
  beforeAll(() => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );
  });

  it("Renders login page", () => {
    expect(
      screen.getByRole("button", {
        name: "Login",
      }),
    ).toBeInTheDocument();
  });
});
