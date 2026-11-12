import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { howItWorksSection, sectionIds, steps } from "@/data/content";
import type { StepIconName } from "@/types/content";

export function HowItWorks() {
  return (
    <section
      id={sectionIds.howItWorks}
      aria-labelledby="how-it-works-title"
      className="bg-cream py-15 lg:py-25"
    >
      <Container>
        <SectionHeading
          id="how-it-works-title"
          eyebrow={howItWorksSection.eyebrow}
          title={howItWorksSection.title}
          align="center"
        />

        {/* --step-gap is shared by the grid gap and the connector line between two steps. */}
        <ol className="mt-10 grid [--step-gap:2.5rem] md:grid-cols-3 md:gap-(--step-gap) lg:mt-20 lg:py-7 lg:[--step-gap:5rem]">
          {steps.map((step, index) => (
            <li key={step.label} className="relative pb-19 last:pb-0 md:pb-0">
              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-7 h-12.5 w-px bg-line md:top-7 md:bottom-auto md:left-14 md:h-px md:w-[calc(100%+var(--step-gap)-3.5rem)]"
                />
              )}
              <StepIcon name={step.icon} />
              <p className="mt-6 text-overline font-semibold text-ink-tertiary uppercase">
                {step.label}
              </p>
              <h3 className="mt-2 font-display text-h5-mobile font-bold text-ink lg:text-h5">
                {step.title}
              </h3>
              <p className="mt-3 text-body text-ink-secondary lg:text-subtitle-2">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** The step illustrations are simple shapes in the design, so they are drawn with CSS instead of images. */
function StepIcon({ name }: { name: StepIconName }) {
  switch (name) {
    case "focus":
      return (
        <div aria-hidden="true" className="relative z-10 size-14 rounded-full bg-primary-light">
          <span className="absolute top-2 left-2 size-6 rounded-md bg-primary" />
        </div>
      );
    case "experience":
      return (
        <div aria-hidden="true" className="relative z-10 size-14">
          <span className="absolute inset-0 rotate-12 rounded-lg bg-peach" />
          <span className="absolute top-6 left-6 size-7 rounded-full bg-orange" />
        </div>
      );
    case "practice":
      return (
        <div aria-hidden="true" className="relative z-10 size-14 rounded-xl bg-butter">
          <span className="absolute top-7 left-2 size-5 rounded-full bg-yellow-dark" />
        </div>
      );
  }
}
