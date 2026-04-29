import { Image } from "~/ui";

import styles from "./memory-card.module.scss";
import clsx from "clsx";
import { rickMortyVortex } from "~/assets/images";
import type { Card } from "../../types/card";

interface Props {
  card: Card;
  flipCard: (card: Card) => void;
}

export const MemoryCard = ({ card, flipCard }: Props) => {
  const { character } = card;
  const isFlipped = card.status === "flipped";

  return (
    <button
      className={clsx(
        styles.card,
        isFlipped && styles.flipped,
        card.status === "matched" && styles.removeCard,
      )}
      onClick={() => flipCard(card)}
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
    </button>
  );
};
