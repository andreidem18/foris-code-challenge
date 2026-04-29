import { CheckIcon } from "@radix-ui/react-icons";
import { Checkbox as PrimitiveCheckbox } from "radix-ui";

import styles from "./checkbox.module.scss";

export const Checkbox = (
  props: React.ComponentProps<typeof PrimitiveCheckbox.Root>,
) => {
  return (
    <PrimitiveCheckbox.Root className={styles.root} {...props}>
      <PrimitiveCheckbox.Indicator className={styles.indicator}>
        <CheckIcon />
      </PrimitiveCheckbox.Indicator>
    </PrimitiveCheckbox.Root>
  );
};
