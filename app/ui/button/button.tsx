import clsx from "clsx";

import styles from "./button.module.scss";

interface Props extends React.ComponentProps<"button"> {
  variant?: "primary" | "secondary";
}

function Button({ className, variant = "primary", ...props }: Props) {
  return (
    <button
      data-slot="button"
      className={clsx(styles.button, styles[variant], className)}
      {...props}
    />
  );
}

export { Button };
