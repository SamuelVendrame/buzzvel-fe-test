import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

interface ContainerProps extends ComponentProps<"div"> {
  /**
   * In the desktop frame a few containers are 1136px wide instead of 1120px: they run
   * 16px into the right gutter. This reproduces that from the desktop breakpoint up.
   */
  wide?: boolean;
}

/**
 * Centers the content and applies the fluid page gutter.
 * Max width = 1200px of content (Figma container) + 2 × 80px of gutter.
 */
export function Container({ wide = false, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-340 px-gutter",
        wide && "lg:pr-[calc(var(--spacing-gutter)-1rem)]",
        className,
      )}
      {...props}
    />
  );
}
