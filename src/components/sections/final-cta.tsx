import Image from "next/image";
import bookIcon from "@/assets/icons/cta-book.svg";
import chatIcon from "@/assets/icons/cta-chat.svg";
import cubeIcon from "@/assets/icons/cta-cube.svg";
import ideaIcon from "@/assets/icons/cta-idea.svg";
import letterIcon from "@/assets/icons/cta-letter.svg";
import { AvatarStack } from "@/components/ui/avatar-stack";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { finalCta, learnerAvatars } from "@/data/content";

export function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="relative overflow-hidden bg-butter py-15 lg:py-25"
    >
      <Decorations />

      <Container className="relative flex flex-col items-center text-center">
        <AvatarStack avatars={learnerAvatars} size="md" ringClassName="border-yellow" />
        <h2
          id="final-cta-title"
          className="mt-8 font-display text-h2-mobile font-extrabold text-ink lg:text-h2"
        >
          {finalCta.title}
        </h2>
        <p className="mt-4 text-subtitle-1-mobile text-ink-secondary lg:text-subtitle-1">
          {finalCta.description}
        </p>
        <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <ButtonLink href={finalCta.primaryAction.href}>{finalCta.primaryAction.label}</ButtonLink>
          <ButtonLink href={finalCta.secondaryAction.href} variant="secondary">
            {finalCta.secondaryAction.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

const shape = "absolute";
const filled = `${shape} bg-peach`;
const outlined = `${shape} border-2 border-peach`;

/**
 * Background shapes of the desktop frame (the mobile frame has none).
 * They live on a 1280px-wide canvas centred in the section, so the positions
 * are the Figma coordinates and stay around the content on any screen width.
 */
function Decorations() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-7xl -translate-x-1/2 lg:block"
    >
      <span className={`${outlined} top-4 left-[22px] size-27 rounded-full`} />
      <span className={`${filled} top-[373px] left-14 size-30 rounded-full`} />
      <span className={`${filled} -top-3.5 left-[1155px] size-[115px] rotate-12 rounded-lg`} />
      <span className={`${filled} top-[235px] -left-7 size-14 rotate-12 rounded-lg`} />
      <span className={`${outlined} top-[429px] left-[1208px] size-8 rounded-full`} />
      <span className={`${outlined} top-[43px] left-[877px] size-8 rounded-full`} />
      <span
        className={`${shape} top-[48px] left-[322px] size-14 rotate-12 rounded-lg border border-peach`}
      />
      <Image src={letterIcon} alt="" className={`${shape} top-[369px] left-[281px] rotate-15`} />
      <Image src={cubeIcon} alt="" className={`${shape} top-[180px] left-[1080px]`} />
      <Image src={chatIcon} alt="" className={`${shape} top-[214px] left-[141px]`} />
      <Image src={ideaIcon} alt="" className={`${shape} top-[82px] left-[1016px]`} />
      <Image src={bookIcon} alt="" className={`${shape} top-[381px] left-[963px]`} />
    </div>
  );
}
