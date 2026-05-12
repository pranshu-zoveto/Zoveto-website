import { cva, type VariantProps } from "class-variance-authority";

/**
 * One button system. Five variants, one canonical scale.
 *
 *   primary       blue → main CTAs (Book demo, Sign up, Request access)
 *   secondary     dark filled → strong dark CTA on light surfaces
 *   outline       transparent + border → secondary action paired with primary
 *   ghost         transparent + muted → nav links rendered as buttons, icon buttons
 *   blue-outline  blue border + blue text → secondary CTA against a dark background
 *
 * Legacy aliases (`gradient`, `link`) are kept so historical call sites keep working;
 * they resolve to the closest canonical variant.
 */
export const buttonVariants = cva(
  // Base: type-system owns weight/tracking via per-size classes below.
  [
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap rounded-lg",
    "border border-transparent",
    "transition-[background-color,border-color,box-shadow,transform,color] duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-40",
    "motion-reduce:transition-none",
    "select-none active:scale-[0.98]",
  ].join(" "),
  {
    variants: {
      variant: {
        // PRIMARY — the one blue button. Variant fully owns bg / border / shadow.
        primary: [
          "bg-[var(--blue)] text-white",
          "border-[var(--blue-border)]",
          "shadow-[0_8px_24px_var(--blue-shadow)]",
          "hover:bg-[var(--blue-hover)]",
          "hover:shadow-[0_10px_32px_var(--blue-shadow-hover)]",
          "active:bg-[var(--blue-active)] active:shadow-none",
        ].join(" "),

        // SECONDARY — dark filled CTA (paired with primary on dense layouts)
        secondary: [
          "bg-[var(--foreground)] text-white border-transparent",
          "hover:bg-[#2d2d2f]",
          "active:bg-[#1a1a1c]",
        ].join(" "),

        // OUTLINE — neutral secondary
        outline: [
          "bg-[var(--card)] text-[var(--foreground)]",
          "border-[var(--border)] shadow-sm",
          "hover:bg-[var(--surface)] hover:border-[var(--border-strong)]",
          "active:bg-[var(--surface-hover)]",
        ].join(" "),

        // GHOST — chrome / nav usage
        ghost: [
          "bg-transparent text-[var(--muted)] border-transparent",
          "hover:bg-[var(--surface)] hover:text-[var(--foreground)]",
          "active:bg-[var(--surface-hover)]",
        ].join(" "),

        // BLUE-OUTLINE — blue text + blue border (for dark-background secondary CTAs)
        "blue-outline": [
          "bg-transparent text-[var(--blue)]",
          "border-[var(--blue-border)]",
          "hover:bg-[var(--blue-dim)]",
          "active:bg-[var(--blue-dim-hover)]",
        ].join(" "),

        // Legacy aliases — preserved so historical call sites keep working.
        gradient: [
          "bg-[var(--blue)] text-white",
          "border-[var(--blue-border)]",
          "shadow-[0_8px_24px_var(--blue-shadow)]",
          "hover:bg-[var(--blue-hover)]",
          "hover:shadow-[0_10px_32px_var(--blue-shadow-hover)]",
          "active:bg-[var(--blue-active)] active:shadow-none",
        ].join(" "),

        link: "bg-transparent border-transparent text-[var(--blue)] underline-offset-4 hover:underline hover:text-[var(--blue-hover)]",
      },
      size: {
        // Padding/height stay layout-only; type/weight/tracking are owned by the type system.
        xs: "h-7 px-3 text-[0.75rem] tracking-[0] rounded-md",
        sm: "h-9 px-4 text-[0.8125rem] font-medium tracking-[-0.005em]",
        md: "h-10 px-5 text-[0.875rem] font-medium tracking-[-0.005em]",
        lg: "h-12 px-8 text-[0.9375rem] font-semibold tracking-[-0.01em]",
        xl: "h-14 px-9 text-[1rem] font-semibold tracking-[-0.01em]",
        "2xl": "h-16 px-10 text-[1.0625rem] font-semibold tracking-[-0.01em]",
        icon: "h-11 w-11 text-[0.875rem] font-medium",
        // Legacy alias preserved (used as Button defaultVariants size in many call sites).
        default: "h-11 px-6 text-[0.875rem] font-medium tracking-[-0.005em]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
