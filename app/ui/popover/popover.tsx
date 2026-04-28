import * as React from "react";

import clsx from "clsx";
import { Popover as PopoverPrimitive } from "radix-ui";

import styles from "./popover.module.scss";

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(function PopoverContent(
  { className, align = "center", sideOffset = 8, ...props },
  ref,
) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={clsx(styles.content, className)}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
});

const PopoverClose = PopoverPrimitive.Close;

const PopoverArrow = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Arrow>
>(function PopoverArrow({ className, ...props }, ref) {
  return (
    <PopoverPrimitive.Arrow
      ref={ref}
      className={clsx(styles.arrow, className)}
      {...props}
    />
  );
});

export {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverContent,
  PopoverClose,
  PopoverArrow,
};
