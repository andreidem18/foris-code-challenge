import { Button } from "~/ui/button/button";

import styles from "./menu.module.scss";
import { useNavigate } from "react-router";

export default function MenuPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.menuContainer}>
      <div className={styles.menuContent}>
        <Button onClick={() => navigate("/game/board")}>Nuevo juego</Button>
        <Button disabled>Reanudar juego</Button>
        <Button variant="secondary">Mis puntajes</Button>
      </div>
    </div>
  );
}
