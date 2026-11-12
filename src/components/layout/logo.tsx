import Image from "next/image";
import Link from "next/link";
import logoLight from "@/assets/icons/logo-light.svg";
import logoDark from "@/assets/icons/logo.svg";
import { site } from "@/data/content";

interface LogoProps {
  /** "light" is the white version, for dark backgrounds. */
  variant?: "dark" | "light";
  className?: string;
}

export function Logo({ variant = "dark", className }: LogoProps) {
  return (
    <Link href="/" className={className}>
      <Image
        src={variant === "light" ? logoLight : logoDark}
        alt={`${site.name} home`}
        width={54}
        height={17}
        className="block"
      />
    </Link>
  );
}
