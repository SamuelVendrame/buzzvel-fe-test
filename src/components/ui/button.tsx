import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "accent" | "ghost";
export type ButtonSize = "sm" | "md";

interface ButtonStyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  secondary: "border border-line bg-white text-ink hover:border-ink-tertiary",
  accent: "bg-yellow text-ink hover:bg-yellow-hover",
  // White instead of the #e7e7ec from Figma, which is 4.46:1 on the blue background (AA needs 4.5:1).
  ghost: "text-white hover:bg-white/10",
};

// Sizes come from padding, as in Figma: 44px and 52px tall. The bordered variant is
// 2px taller (54px) because its border sits outside that box.
const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5",
  md: "px-7 py-3.5",
};

function buttonClasses({ variant = "primary", size = "md" }: ButtonStyleProps, className?: string) {
  return cn(
    "group inline-flex items-center justify-center gap-2 rounded-lg text-body font-bold whitespace-nowrap transition-colors duration-200",
    variantClasses[variant],
    // The ghost variant is a text link with an icon, so it uses a tighter horizontal padding.
    variant === "ghost" ? "px-4 py-3.5" : sizeClasses[size],
    className,
  );
}

type ButtonProps = ButtonStyleProps & ComponentProps<"button">;

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses({ variant, size }, className)} {...props} />;
}

type ButtonLinkProps = ButtonStyleProps & ComponentProps<typeof Link>;

/** Same look as Button, rendered as a link for navigation. */
export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClasses({ variant, size }, className)} {...props} />;
}
