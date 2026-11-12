import Image from "next/image";
import starIcon from "@/assets/icons/star.svg";
import { AvatarStack } from "@/components/ui/avatar-stack";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { hero, learnerAvatars } from "@/data/content";

const floatingCardClasses =
  "absolute flex items-center rounded-xl bg-white px-4 py-3 text-body whitespace-nowrap text-ink shadow-float";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-cream py-15 lg:py-25">
      <Container className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-15">
        {/* The text comes first in the DOM (heading before image); on small screens it is shown below the image, as in the mobile frame. */}
        <div className="order-2 min-w-0 lg:order-1 lg:flex-1">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1
            id="hero-title"
            className="mt-4 font-display text-h1-mobile font-extrabold text-ink lg:text-h1"
          >
            {hero.title}
          </h1>
          <p className="mt-6 max-w-120 text-subtitle-1-mobile text-ink-secondary lg:text-subtitle-1">
            {hero.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={hero.primaryAction.href}>{hero.primaryAction.label}</ButtonLink>
            <ButtonLink href={hero.secondaryAction.href} variant="secondary">
              {hero.secondaryAction.label}
            </ButtonLink>
          </div>
          <div className="mt-8 flex items-center justify-center gap-3 sm:justify-start">
            <AvatarStack avatars={learnerAvatars.slice(0, 3)} />
            <p className="text-body text-ink-secondary">
              <strong className="font-bold text-ink">{hero.trust.highlight}</strong>{" "}
              {hero.trust.rest}
            </p>
          </div>
        </div>

        <HeroVisual />
      </Container>
    </section>
  );
}

/**
 * Photo with the decorative shapes and the two floating cards.
 * Everything is positioned from the edges of the block, so it keeps the Figma
 * composition while the block itself scales with the available width.
 */
function HeroVisual() {
  return (
    <div className="relative order-1 mx-auto h-95 w-full max-w-[362px] md:aspect-[500/520] md:h-auto md:max-w-125 lg:order-2 lg:mx-0 lg:w-[44.64%] lg:shrink-0">
      <span
        aria-hidden="true"
        className="absolute top-6 -right-2.5 bottom-3.5 left-[28%] rounded-2xl bg-peach md:-right-[39px] md:bottom-7 md:left-auto md:w-[89px]"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-3 -left-2.5 size-16 rounded-full bg-primary-light md:bottom-[11px] md:-left-[45px] md:size-[106px]"
      />

      <div className="absolute inset-x-2 inset-y-0 overflow-hidden rounded-2xl bg-primary-light md:inset-x-0 md:rounded-3xl">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          preload
          placeholder="blur"
          sizes="(min-width: 768px) 500px, 100vw"
          className="object-cover"
        />
      </div>

      <p className={`${floatingCardClasses} top-1.5 left-0 gap-3 md:top-4 md:-left-[22px]`}>
        <span className="flex h-8 items-center rounded-lg bg-primary-light px-1 font-bold text-primary">
          {hero.coursesBadge.value}
        </span>
        {hero.coursesBadge.label}
      </p>

      <p className={`${floatingCardClasses} -right-[11px] bottom-9 gap-2 md:-right-[57px]`}>
        <span aria-hidden="true" className="flex gap-0.5">
          {Array.from({ length: hero.rating.stars }, (_, index) => (
            <Image key={index} src={starIcon} alt="" width={14} height={14} />
          ))}
        </span>
        {hero.rating.label}
      </p>
    </div>
  );
}
