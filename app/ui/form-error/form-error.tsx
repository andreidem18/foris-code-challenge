import clsx from "clsx";

import styles from "./form-error.module.scss";

type Props = {
  id?: string;
  message?: string;
  className?: string;
};

export function FormError({ id, message, className }: Props) {
  if (!message) return null;

  return (
    <p id={id} className={clsx(styles.error, className)} role="alert">
      {message}
    </p>
  );
}
