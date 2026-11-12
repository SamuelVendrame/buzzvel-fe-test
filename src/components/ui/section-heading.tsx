import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "default" | "inverse";

interface EyebrowProps {
  children: ReactNode;
  /** "inverse" is for dark or blue backgrounds. */
  tone?: Tone;
  className?: string;
}

/** Small uppercase label shown above headings (Figma "Overline" style). */
export function Eyebrow({ children, tone = "default", className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-overline font-semibold uppercase",
        tone === "inverse" ? "text-white" : "text-primary",
        className,
      )}
    >
      {children}
    </p>
  );
}

interface SectionHeadingProps {
  /** Id of the <h2>, referenced by the section's aria-labelledby. */
  id: string;
  eyebrow: string;
  title: string;
  align?: "start" | "center";
  tone?: Tone;
  /** Space between the eyebrow and the title. Most sections use 16px, one uses 8px. */
  gap?: "sm" | "md";
  className?: string;
}

/** Eyebrow + section title (<h2>), shared by every content section. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  align = "start",
  tone = "default",
  gap = "md",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className={cn(
          "font-display text-h3-mobile font-extrabold lg:text-h3",
          gap === "sm" ? "mt-2" : "mt-4",
          tone === "inverse" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
    </div>
  );
}
