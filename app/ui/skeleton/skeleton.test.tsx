import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { Skeleton } from "./skeleton";
import styles from "./skeleton.module.scss";

describe("<Skeleton />", () => {
  it("renders a div with base class and forwards props", () => {
    render(
      <Skeleton
        aria-label="loading"
        data-testid="skeleton"
        className="custom"
      />,
    );

    const el = screen.getByTestId("skeleton");
    expect(el.tagName).toBe("DIV");
    expect(el).toHaveAttribute("aria-label", "loading");
    expect(el).toHaveClass(styles.skeleton);
    expect(el).toHaveClass(styles.rounded);
    expect(el).toHaveClass("custom");
  });

  it("applies width/height styles", () => {
    render(<Skeleton data-testid="skeleton" width={123} height={45} />);
    expect(screen.getByTestId("skeleton")).toHaveStyle({
      width: "123px",
      height: "45px",
    });
  });

  it("uses circle variant", () => {
    render(<Skeleton data-testid="skeleton" variant="circle" />);
    const el = screen.getByTestId("skeleton");
    expect(el).toHaveClass(styles.circle);
    expect(el).not.toHaveClass(styles.rounded);
  });
});
