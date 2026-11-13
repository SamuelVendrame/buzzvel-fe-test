import Image from "next/image";
import quoteIcon from "@/assets/icons/quote.svg";
import { Container } from "@/components/ui/container";
import { stats, testimonial } from "@/data/content";

export function Testimonial() {
  const { quote, author } = testimonial;

  return (
    <section aria-labelledby="testimonial-title" className="bg-white py-15 lg:py-25">
      <Container
        wide
        className="flex flex-col gap-15 lg:flex-row lg:items-center lg:justify-between"
      >
        <h2 id="testimonial-title" className="sr-only">
          What learners say
        </h2>

        <figure className="max-w-150 lg:flex-1">
          <Image src={quoteIcon} alt="" width={24} height={22} className="block" />
          <blockquote className="mt-4 font-display text-quote-mobile font-semibold text-ink lg:text-quote">
            <p>{quote}</p>
          </blockquote>
          {/* lg:h-12: on desktop Figma sizes this row by the 48px avatar; the 52px text block overflows it by 2px on each side. */}
          <figcaption className="mt-8 flex items-center gap-4 lg:h-12">
            <Image
              src={author.avatar.src}
              alt={author.avatar.alt}
              width={48}
              height={48}
              sizes="48px"
              className="size-12 rounded-full bg-primary-light object-cover"
            />
            <div>
              <p className="text-subtitle-1-mobile font-bold text-ink lg:text-subtitle-2">
                {author.name}
              </p>
              <p className="text-body text-ink-secondary">{author.role}</p>
            </div>
          </figcaption>
        </figure>

        <dl className="grid grid-cols-3 lg:w-[401px] lg:shrink-0 lg:grid-cols-1 lg:gap-5 lg:border-l lg:border-line lg:pl-12">
          {stats.map((stat) => (
            // The number is shown first, but in the markup the label is the term and the number its value.
            <div key={stat.label} className="flex flex-col-reverse justify-end">
              <dt className="mt-1 pr-4 text-body text-ink-tertiary lg:h-[21px]">{stat.label}</dt>
              {/* Below 380px the three numbers no longer fit side by side at 40px, so the size follows the viewport. */}
              <dd className="font-display text-h1-mobile font-extrabold text-primary max-[380px]:text-[10.5vw] lg:text-h1">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
