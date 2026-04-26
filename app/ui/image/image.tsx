import clsx from "clsx";
import { useState } from "react";

import { Skeleton } from "../skeleton/skeleton";
import styles from "./image.module.scss";

interface Props extends React.ComponentProps<"image"> {
  src: string;
  alt: string;
  height?: number;
  skeletonClassName?: string;
  errorFallback?: string;
  imageClassName?: string;
}

export function Image({
  src,
  alt,
  className,
  skeletonClassName,
  errorFallback = "Error al cargar imagen",
  height,
  imageClassName,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={clsx(styles.container, className)} style={{ height }}>
      {/* Skeleton */}
      {loading && !error && (
        <Skeleton className={clsx(styles.skeleton, skeletonClassName)} />
      )}

      {/* Imagen */}
      {!error && (
        <img
          src={src}
          alt={alt}
          className={clsx(
            styles.image,
            {
              [styles.hidden]: loading,
            },
            imageClassName,
          )}
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
        />
      )}

      {/* Error */}
      {error && <div className={styles.error}>{errorFallback}</div>}
    </div>
  );
}
