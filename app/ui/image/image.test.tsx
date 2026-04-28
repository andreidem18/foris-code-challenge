import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { Image } from "./image";
import styles from "./image.module.scss";

describe("<Image />", () => {
  it("shows skeleton while loading and hides image", () => {
    render(<Image src="/test.png" alt="test image" />);

    const img = screen.getByRole("img", { name: "test image" });
    expect(img).toHaveClass(styles.hidden);
    expect(document.querySelector(`.${styles.skeleton}`)).toBeTruthy();
  });

  it("reveals image after load and removes skeleton", () => {
    render(<Image src="/test.png" alt="test image" />);

    const img = screen.getByRole("img", { name: "test image" });
    fireEvent.load(img);

    expect(img).not.toHaveClass(styles.hidden);
    expect(document.querySelector(`.${styles.skeleton}`)).toBeNull();
    expect(screen.queryByText(/Error al cargar imagen/i)).toBeNull();
  });

  it("shows fallback text on error and hides image", () => {
    render(
      <Image
        src="/missing.png"
        alt="test image"
        errorFallback="No se pudo cargar"
      />,
    );

    const img = screen.getByRole("img", { name: "test image" });
    fireEvent.error(img);

    expect(screen.getByText("No se pudo cargar")).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: "test image" })).toBeNull();
    expect(document.querySelector(`.${styles.skeleton}`)).toBeNull();
  });

  it("applies container height and className overrides", () => {
    const { container } = render(
      <Image
        src="/test.png"
        alt="test image"
        height={200}
        className="wrap"
        skeletonClassName="sk"
        imageClassName="im"
      />,
    );

    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveClass(styles.container);
    expect(wrapper).toHaveClass("wrap");
    expect(wrapper).toHaveStyle({ height: "200px" });

    const img = screen.getByRole("img", { name: "test image" });
    expect(img).toHaveClass(styles.image);
    expect(img).toHaveClass("im");
    expect(document.querySelector(`.${styles.skeleton}`)).toHaveClass("sk");
  });
});
