import Image from "next/image";
import arrowIcon from "@/assets/icons/arrow-light.svg";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { featuredCourse, sectionIds } from "@/data/content";

export function FeaturedCourse() {
  const course = featuredCourse;

  return (
    <section
      id={sectionIds.featuredCourse}
      aria-labelledby="featured-course-title"
      // White focus outline: the default blue one would not be visible on this background.
      className="bg-primary py-15 [--focus-ring:var(--color-white)] lg:py-25"
    >
      <Container wide className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-15">
        <div className="relative">
          <div className="relative h-70 overflow-hidden rounded-2xl md:h-90 lg:h-102">
            <Image
              src={course.image.src}
              alt={course.image.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <p className="absolute -top-3 -left-3 rounded-md bg-yellow px-3 py-1.5 text-overline font-semibold text-ink uppercase">
            {course.badge}
          </p>
        </div>

        <div>
          <SectionHeading
            id="featured-course-title"
            eyebrow={course.eyebrow}
            title={course.title}
            tone="inverse"
          />
          <p className="mt-5 text-body text-white lg:text-subtitle-2">{course.description}</p>
          <p className="mt-6 text-body text-white lg:text-subtitle-2">{course.instructor}</p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {course.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-lg border border-line px-3.5 py-1.5 text-body text-white"
              >
                {tag}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={course.primaryAction.href} variant="accent">
              {course.primaryAction.label}
            </ButtonLink>
            <ButtonLink href={course.secondaryAction.href} variant="ghost">
              {course.secondaryAction.label}
              <Image
                src={arrowIcon}
                alt=""
                width={20}
                height={20}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
