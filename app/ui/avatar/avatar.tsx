import { Avatar as AvatarPrimitive } from "radix-ui";

import styles from "./avatar.module.scss";

interface Props extends React.ComponentProps<typeof AvatarPrimitive.Root> {
  url: string;
  userName: string;
}

export const Avatar = ({ url, userName }: Props) => {
  function getInitials(name: string): string {
    return name
      .trim()
      .split(/\s+/)
      .map((word) => word[0]?.toUpperCase())
      .join("");
  }

  return (
    <AvatarPrimitive.Root className={styles.root}>
      <AvatarPrimitive.Image
        className={styles.image}
        src={url}
        alt={userName}
      />
      <AvatarPrimitive.Fallback className={styles.fallback} delayMs={600}>
        {getInitials(userName)}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
};
