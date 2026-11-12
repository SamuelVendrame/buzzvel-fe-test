import Link from "next/link";
import { Container } from "@/components/ui/container";
import { footer, footerColumns } from "@/data/content";
import { Logo } from "./logo";

export function Footer() {
  return (
    // White focus outline: the default blue one would not be visible on the dark background.
    <footer className="bg-ink pt-15 pb-5 [--focus-ring:var(--color-white)] lg:pt-20 lg:pb-10">
      <Container>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-8">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Logo variant="light" className="block w-fit rounded-sm" />
            <p className="mt-3 text-body text-on-dark-tertiary lg:max-w-60">{footer.tagline}</p>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-overline font-semibold text-on-dark-secondary uppercase">
                {column.title}
              </h2>
              <ul className="mt-4 flex flex-col gap-3 text-body">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="rounded-sm text-on-dark-tertiary transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className="mt-12 border-t border-ink-secondary pt-6 text-center text-caption text-on-dark-secondary lg:mt-16 lg:text-left">
          {footer.copyright}
        </p>
      </Container>
    </footer>
  );
}
