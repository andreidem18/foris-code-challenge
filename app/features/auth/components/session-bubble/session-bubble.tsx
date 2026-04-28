import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover/popover";
import { useAuth } from "../../hooks/use-auth";
import styles from "./session-bubble.module.scss";
import { logout } from "../../services/logout";
import { Avatar } from "~/ui/avatar/avatar";

export const SessionBubble = () => {
  const { user } = useAuth();

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <button className={styles.sessionButton}>
            <Avatar
              url={user?.photoURL || ""}
              userName={user?.displayName || ""}
            />
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" className={styles.popover}>
          <button onClick={logout} className={styles.logoutButton}>
            Logout
          </button>
        </PopoverContent>
      </Popover>
    </>
  );
};
