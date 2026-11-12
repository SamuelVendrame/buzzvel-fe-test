"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import closeIcon from "@/assets/icons/close.svg";
import menuIcon from "@/assets/icons/menu.svg";
import { ButtonLink } from "@/components/ui/button";
import type { LinkItem } from "@/types/content";

interface MobileMenuProps {
  links: LinkItem[];
  secondaryAction: LinkItem;
  primaryAction: LinkItem;
}

/** Tailwind "lg" breakpoint: from here up the desktop navigation is shown instead. */
const DESKTOP_QUERY = "(min-width: 64rem)";

/**
 * Hamburger button + dropdown panel (disclosure pattern).
 * The only interactive part of the header, so it is the only Client Component in it.
 */
export function MobileMenu({ links, secondaryAction, primaryAction }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    const desktop = window.matchMedia(DESKTOP_QUERY);
    function handleBreakpoint(event: MediaQueryListEvent) {
      if (event.matches) setIsOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    desktop.addEventListener("change", handleBreakpoint);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      desktop.removeEventListener("change", handleBreakpoint);
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <div ref={containerRef} className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-label="Menu"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((open) => !open)}
        className="-mr-1.5 flex size-9 items-center justify-center rounded-lg"
      >
        <Image src={isOpen ? closeIcon : menuIcon} alt="" width={24} height={24} />
      </button>

      <div
        id={panelId}
        hidden={!isOpen}
        className="absolute inset-x-0 top-full animate-menu-in border-b border-line bg-cream px-gutter pt-2 pb-6 shadow-panel"
      >
        <nav aria-label="Mobile">
          <ul>
            {links.map((link) => (
              <li key={link.label} className="border-b border-line">
                <Link
                  href={link.href}
                  onClick={close}
                  className="block py-3.5 text-subtitle-2 text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-6 flex flex-col gap-3">
          <ButtonLink href={secondaryAction.href} variant="secondary" onClick={close}>
            {secondaryAction.label}
          </ButtonLink>
          <ButtonLink href={primaryAction.href} onClick={close}>
            {primaryAction.label}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
