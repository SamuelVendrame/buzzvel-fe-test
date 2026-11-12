import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/**
 * Centers the content and applies the fluid page gutter.
 * Max width = 1200px of content (Figma container) + 2 × 80px of gutter.
 */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-340 px-gutter", className)} {...props} />;
}
