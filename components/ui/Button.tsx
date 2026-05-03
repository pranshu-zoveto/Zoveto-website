"use client";

import React from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";

export interface ButtonProps
  extends Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd"
    >,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    void asChild;
    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, className }),
          "motion-safe:transition-transform motion-safe:hover:-translate-y-px motion-safe:active:translate-y-0",
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
export { buttonVariants } from "@/components/ui/button-variants";
