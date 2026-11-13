import Image from "next/image";
import Link from "next/link";
import arrowIcon from "@/assets/icons/arrow-dark.svg";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { categories, categoriesSection, sectionIds } from "@/data/content";
import type { Category } from "@/types/content";

export function Categories() {
  return (
    <section
      id={sectionIds.courses}
      aria-labelledby="categories-title"
      className="bg-white py-15 lg:py-25"
    >
      <Container>
        <div className="max-w-140">
          <SectionHeading
            id="categories-title"
            eyebrow={categoriesSection.eyebrow}
            title={categoriesSection.title}
          />
          <p className="mt-4 text-subtitle-1-mobile text-ink-secondary lg:text-subtitle-1">
            {categoriesSection.description}
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-5">
          {categories.map((category) => (
            <li key={category.number}>
              <CategoryCard category={category} linkLabel={categoriesSection.linkLabel} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

interface CategoryCardProps {
  category: Category;
  linkLabel: string;
}

/** The whole card is one link, so it is a single tab stop with a large hit area. */
function CategoryCard({ category, linkLabel }: CategoryCardProps) {
  return (
    <Link
      href={category.href}
      // Fractional values are the Figma ones: the badge row is 46.5px tall, and on the mobile
      // frame the card rows are fixed at 227.19px, 1.31px less than the card content.
      className="group flex h-full min-h-50 flex-col justify-between rounded-2xl border border-line bg-white p-6 transition-[border-color,box-shadow] duration-200 hover:border-primary hover:shadow-float max-sm:pb-[22.69px] lg:min-h-65 lg:p-7"
    >
      <div>
        <span
          aria-hidden="true"
          className="mt-0.5 inline-flex rounded-md bg-primary-light px-2 py-1 text-overline font-semibold text-primary"
        >
          {category.number}
        </span>
        <h3 className="mt-[20.5px] font-display text-h5-mobile font-bold text-ink lg:text-h5">
          {category.title}
        </h3>
        <p className="mt-3 text-body text-ink-tertiary">{category.description}</p>
      </div>
      {/* h-5: the design gives this row 20px, so the 24px line overflows it by 2px on each side. */}
      <span className="mt-6 flex h-5 items-center gap-2 text-body font-bold text-ink">
        {linkLabel}
        <Image
          src={arrowIcon}
          alt=""
          width={20}
          height={20}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}
