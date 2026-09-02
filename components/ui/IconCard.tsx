import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type IconCardVariant = "list" | "card";

export type IconCardProps = {
  /** `list` is the homepage hairline row. `card` is the boxed icon chip used on /pricing and /contact. */
  variant?: IconCardVariant;
  /** 1-based index, rendered as 01, 02, ... in mono. */
  index?: number;
  icon?: LucideIcon;
  label: React.ReactNode;
  labelClassName?: string;
  description?: React.ReactNode;
  /** Middle column (feature line, extra copy). */
  body?: React.ReactNode;
  /** Right-aligned proof, price, or CTA. */
  aside?: React.ReactNode;
  children?: React.ReactNode;
  /** Draw a top hairline. First rows should leave this false. */
  divided?: boolean;
  className?: string;
  as?: "li" | "article" | "div";
};

/**
 * Shared icon/list primitive for marketing surfaces.
 *
 * - `list`: numbered or plain rule-divided row (homepage de-boxing).
 * - `card`: icon-in-a-rounded-box on a bordered surface (pricing/contact defaults).
 */
export function IconCard({
  variant = "list",
  index,
  icon: Icon,
  label,
  labelClassName,
  description,
  body,
  aside,
  children,
  divided = false,
  className,
  as: Tag = variant === "list" ? "li" : "article",
}: IconCardProps) {
  const indexLabel =
    typeof index === "number" ? String(index).padStart(2, "0") : null;

  if (variant === "card") {
    return (
      <Tag
        className={cn(
          "float-card flex h-full min-h-0 flex-col rounded-xl p-4 sm:p-6",
          className,
        )}
      >
        {Icon || indexLabel ? (
          <div className="mb-3 flex items-start justify-between gap-3">
            {Icon ? (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-surface-2 text-blue">
                <Icon size={17} aria-hidden />
              </div>
            ) : (
              <span />
            )}
            {indexLabel ? (
              <span className="inline-flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full border border-border bg-surface px-2 text-[11px] font-semibold tabular-nums text-muted-2">
                {indexLabel}
              </span>
            ) : null}
          </div>
        ) : null}
        <h3 className={cn("text-sm font-semibold tracking-tight text-foreground", labelClassName)}>{label}</h3>
        {description ? (
          <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
        ) : null}
        {body}
        {children}
        {aside}
      </Tag>
    );
  }

  return (
    <Tag
      className={cn(
        "flex flex-col gap-2 py-5 md:flex-row md:items-start md:justify-between md:gap-6 lg:gap-8",
        divided && "border-t border-border",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 gap-4">
        {indexLabel ? (
          <span className="mt-0.5 shrink-0 font-mono-plex text-xs tabular-nums text-muted-2">
            {indexLabel}
          </span>
        ) : Icon ? (
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2 text-blue">
            <Icon size={17} aria-hidden />
          </span>
        ) : null}
        <div className="min-w-0">
          <h3 className={cn("text-sm font-semibold tracking-tight text-foreground", labelClassName)}>{label}</h3>
          {description ? (
            <div className="mt-1 text-sm leading-relaxed text-muted">{description}</div>
          ) : null}
          {children}
        </div>
      </div>
      {body ? <div className="min-w-0 flex-1 text-sm leading-snug text-muted">{body}</div> : null}
      {aside ? <div className="shrink-0 md:text-right">{aside}</div> : null}
    </Tag>
  );
}
