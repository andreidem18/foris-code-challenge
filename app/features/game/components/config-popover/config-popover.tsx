import { GearIcon } from "@radix-ui/react-icons";
import { Button } from "~/ui/button/button";

import styles from "./config-popover.module.scss";
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover/popover";
import { useGameStore } from "../../store/game-store";
import { Label } from "~/ui";
import { Checkbox } from "~/ui/checkbox/checkbox";

export const ConfigPopover = () => {
  const { deleteOnMatch, setDeleteOnMatch } = useGameStore();

  return (
    <Popover>
      <PopoverTrigger asChild className={styles.popoverTrigger}>
        <Button variant="outline" className={styles.trigger}>
          <GearIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className={styles.popover}>
        <Label className={styles.popoverButton}>
          <Checkbox
            checked={deleteOnMatch}
            onCheckedChange={setDeleteOnMatch}
          />
          Delete card on match
        </Label>
      </PopoverContent>
    </Popover>
  );
};
