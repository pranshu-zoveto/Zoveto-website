import Image from "next/image";
import { cn } from "@/lib/utils";
import { BRAND_LOGO_ICON, BRAND_WORDMARK } from "@/lib/branding";

type Props = {
  className?: string;
  /** When true, hints LCP for above-the-fold usage (e.g. navbar). */
  priority?: boolean;
};

/** Square mark — uses public SVG only. */
export function BrandIcon({ className, priority }: Props) {
  return (
    <span
      className={cn(
        "relative inline-flex overflow-hidden align-middle",
        className
      )}
    >
      <Image
        src={BRAND_LOGO_ICON}
        alt="Zoveto"
        fill
        className="object-contain"
        sizes="40px"
        priority={Boolean(priority)}
        unoptimized
      />
    </span>
  );
}

/** Wordmark — public SVG only. */
export function BrandWordmark({ className }: Props) {
  return (
    <Image
      src={BRAND_WORDMARK}
      alt=""
      width={220}
      height={36}
      className={cn(
        "inline-block align-middle h-[1.45rem] w-auto max-w-none shrink-0 text-inherit",
        className
      )}
      unoptimized
      aria-hidden
    />
  );
}

/** Full brand lockup: [icon] + [wordmark]. */
export function BrandLockup({ className, priority }: Props) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 overflow-visible", className)}>
      <BrandIcon className="h-7 w-7 rounded-md" priority={priority} />
      <BrandWordmark />
    </span>
  );
}

export const WordmarkLogo = BrandLockup;
export const LockupLogo = BrandLockup;
export const MarkLogo = BrandIcon;
