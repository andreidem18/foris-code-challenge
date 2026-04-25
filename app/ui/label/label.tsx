import clsx from "clsx";
import styles from "./label.module.scss";

export const Label = ({
  className,
  ...props
}: React.ComponentProps<"label">) => {
  return (
    <label
      className={clsx(styles.label, className)}
      data-slot="label"
      {...props}
    />
  );
};
