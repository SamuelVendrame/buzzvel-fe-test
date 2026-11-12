import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { headerActions, navigation } from "@/data/content";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";

const navLinkClasses = "rounded-sm text-body text-ink-secondary transition-colors hover:text-ink";

export function Header() {
  return (
    <header className="relative z-40 h-[69px] border-b border-line bg-cream lg:h-[70px]">
      <Container className="flex h-full items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <Logo className="block w-fit justify-self-start rounded-sm" />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navigation.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={navLinkClasses}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center justify-end gap-2 lg:flex">
          <Link href={headerActions.login.href} className={`${navLinkClasses} px-4 py-2.5`}>
            {headerActions.login.label}
          </Link>
          <ButtonLink href={headerActions.cta.href} size="sm">
            {headerActions.cta.label}
          </ButtonLink>
        </div>

        <MobileMenu
          links={navigation}
          secondaryAction={headerActions.login}
          primaryAction={headerActions.cta}
        />
      </Container>
    </header>
  );
}
