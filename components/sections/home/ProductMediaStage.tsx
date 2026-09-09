import Image from "next/image";
import type { ReactNode } from "react";

export type ProductMediaSource =
  | { kind: "interactive"; children: ReactNode }
  | { kind: "video"; src: string; poster?: string }
  | { kind: "image"; src: string; alt: string };

type ProductMediaStageProps = {
  source: ProductMediaSource;
};

/**
 * Homepage product surface. Swap `source.kind` to video or a still without
 * rebuilding the surrounding section.
 */
export function ProductMediaStage({ source }: ProductMediaStageProps) {
  if (source.kind === "video") {
    return (
      <div className="overflow-hidden rounded-lg border border-border bg-background">
        <video
          className="h-auto w-full"
          src={source.src}
          poster={source.poster}
          controls
          playsInline
          preload="metadata"
        />
      </div>
    );
  }

  if (source.kind === "image") {
    return (
      <div className="overflow-hidden rounded-lg border border-border bg-background">
        <Image
          src={source.src}
          alt={source.alt}
          width={1920}
          height={894}
          className="h-auto w-full"
          sizes="(min-width: 1280px) 72rem, 100vw"
        />
      </div>
    );
  }

  return <>{source.children}</>;
}
