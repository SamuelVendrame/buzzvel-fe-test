import Image, { type StaticImageData } from "next/image";
import clockIcon from "@/assets/icons/clock.svg";
import mailIcon from "@/assets/icons/mail.svg";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { contactMethods, contactSection, sectionIds } from "@/data/content";
import type { ContactIconName, ContactMethod } from "@/types/content";
import { ContactForm } from "./contact-form";

const icons: Record<ContactIconName, { src: StaticImageData; size: number }> = {
  mail: { src: mailIcon, size: 24 },
  clock: { src: clockIcon, size: 20 },
};

export function Contact() {
  const { form } = contactSection;

  return (
    <section
      id={sectionIds.contact}
      aria-labelledby="contact-title"
      className="bg-white py-15 lg:py-25"
    >
      <Container className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="lg:max-w-120 lg:flex-1">
          <SectionHeading
            id="contact-title"
            eyebrow={contactSection.eyebrow}
            title={contactSection.title}
          />
          <p className="mt-4 text-body text-ink-secondary lg:text-subtitle-1">
            {contactSection.description}
          </p>
          <ul className="mt-8 flex flex-col gap-4 lg:mt-10">
            {contactMethods.map((method) => (
              <ContactMethodCard key={method.title} method={method} />
            ))}
          </ul>
        </div>

        {/* 540px of 1120px on desktop. Padding is 1px under the Figma value because Figma draws the border inside it. */}
        <div className="rounded-2xl border border-line bg-white px-[19px] py-[23px] shadow-panel lg:w-[48.2143%] lg:max-w-135 lg:shrink-0 lg:p-[39px]">
          <h3 className="font-display text-h5 font-bold text-ink">{form.title}</h3>
          <p className="mt-2 mb-6 text-body text-ink-secondary">{form.description}</p>
          <ContactForm submitLabel={form.submitLabel} />
        </div>
      </Container>
    </section>
  );
}

function ContactMethodCard({ method }: { method: ContactMethod }) {
  const icon = icons[method.icon];

  return (
    <li className="flex items-center gap-4 rounded-xl bg-cream p-4 lg:p-5">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-light">
        <Image src={icon.src} alt="" width={icon.size} height={icon.size} />
      </span>
      <p className="flex min-w-0 flex-col gap-0.5 text-body lg:gap-1">
        <span className="text-ink">{method.title}</span>
        {method.href ? (
          <a href={method.href} className="rounded-sm text-primary hover:underline">
            {method.detail}
          </a>
        ) : (
          <span className="text-ink-tertiary">{method.detail}</span>
        )}
      </p>
    </li>
  );
}
