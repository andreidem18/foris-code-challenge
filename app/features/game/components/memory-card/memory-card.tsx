import { Image } from "~/ui";
import type { Character } from "../../types/character";

import styles from "./memory-card.module.scss";
import { useState } from "react";
import clsx from "clsx";
import { rickMortyVortex } from "~/assets/images";

interface Props {
  character: Character;
}

export const MemoryCard = ({ character }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <>
      <div
        className={clsx(styles.card, isFlipped && styles.flipped)}
        onClick={() => setIsFlipped(!isFlipped)}
        role="button"
      >
        <div className={styles.cardInner}>
          <div className={clsx(styles.cardFace, styles.cardFront)}>
            <Image
              src={character.image}
              alt={`${character.name} image`}
              className={styles.characterImage}
            />
            <div className={styles.characterName}>{character.name}</div>
            <div className={styles.characterDescription}>
              {character.status} - {character.species}
            </div>
          </div>
          <div className={clsx(styles.cardFace, styles.cardBack)}>
            <img
              src={rickMortyVortex}
              alt="back card"
              className={styles.backCardImage}
            />
          </div>
        </div>
      </div>
    </>
  );
};
