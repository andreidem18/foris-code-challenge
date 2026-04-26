import { Image } from "~/ui";
import type { Character } from "../../types/character";

import styles from "./memory-card.module.scss";

interface Props {
  character: Character;
}

export const MemoryCard = ({ character }: Props) => {
  return (
    <>
      <div className={styles.card}>
        <Image
          src={character.image}
          alt={`${character.name} image`}
          className={styles.characterImage}
          height={160}
        />
        <div className={styles.characterName}>{character.name}</div>
        <div className={styles.characterDescription}>
          {character.status} - {character.species}
        </div>
      </div>
    </>
  );
};
