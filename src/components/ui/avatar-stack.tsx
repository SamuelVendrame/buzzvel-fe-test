import Image from "next/image";
import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/types/content";

interface AvatarStackProps {
  avatars: ImageAsset[];
  size?: "sm" | "md";
  /** Border color class. It should match the background behind the stack. */
  ringClassName?: string;
  className?: string;
}

const sizes = {
  sm: { px: 32, className: "size-8" },
  md: { px: 40, className: "size-10" },
} as const;

/** Row of overlapping round avatars. */
export function AvatarStack({
  avatars,
  size = "sm",
  ringClassName = "border-cream",
  className,
}: AvatarStackProps) {
  const { px, className: sizeClassName } = sizes[size];

  return (
    <div className={cn("flex -space-x-2", className)}>
      {avatars.map((avatar) => (
        <Image
          key={avatar.src.src}
          src={avatar.src}
          alt={avatar.alt}
          width={px}
          height={px}
          className={cn(
            "rounded-full border-2 bg-primary-light object-cover",
            sizeClassName,
            ringClassName,
          )}
        />
      ))}
    </div>
  );
}
