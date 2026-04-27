import "@testing-library/jest-dom";
import { vi } from "vitest";

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
