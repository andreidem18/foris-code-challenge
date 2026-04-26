import clsx from "clsx";

import styles from "./skeleton.module.scss";

interface Props extends React.ComponentProps<"div"> {
  width?: number;
  height?: number;
  variant?: "rect" | "circle";
}

export function Skeleton({
  width,
  height,
  variant = "rect",
  className,
  ...props
}: Props) {
  return (
    <div
      className={clsx(
        styles.skeleton,
        {
          [styles.rounded]: variant === "rect",
          [styles.circle]: variant === "circle",
        },
        className,
      )}
      style={{
        width,
        height,
      }}
      {...props}
    />
  );
}
