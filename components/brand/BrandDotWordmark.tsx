import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

/** Static lockup name: ZOVETO plus the brand period-dot. */
export function BrandDotWordmark({ className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-[0.08em] align-middle leading-none font-semibold tracking-[0.08em] text-[1.1rem] text-[#000000] sm:text-[1.3rem] lg:text-[1.45rem]",
        className,
      )}
      aria-hidden
    >
      <span>ZOVETO</span>
      <span
        className="inline-block shrink-0 rounded-full bg-blue shadow-[0_0_0_1.5px_rgba(0,113,227,0.18)]"
        style={{
          width: "0.26em",
          height: "0.26em",
          minWidth: 5,
          minHeight: 5,
          transform: "translateY(0.06em)",
        }}
      />
    </span>
  );
}
