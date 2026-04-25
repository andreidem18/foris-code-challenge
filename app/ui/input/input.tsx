import React from "react";
import styles from "./input.module.scss";
import clsx from "clsx";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

interface Props extends React.ComponentProps<"input"> {
  displayEye?: boolean;
  isHidden?: boolean;
  onHide?: () => void;
}

export const Input = ({
  className,
  type,
  displayEye,
  onHide,
  isHidden,
  ...props
}: Props) => {
  return (
    <div className={clsx(styles.input, className)}>
      <input
        className={clsx(
          styles.inputInternal,
          displayEye && styles.inputInternalWithButton,
        )}
        data-slot="input"
        type={type}
        {...props}
      />
      {displayEye && (
        <button type="button" className={styles.hideIcon} onClick={onHide}>
          {isHidden ? <EyeOpenIcon /> : <EyeClosedIcon />}
        </button>
      )}
    </div>
  );
};
