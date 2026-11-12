import Image from "next/image";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { communityCollage, communitySection, sectionIds } from "@/data/content";
import { cn } from "@/lib/cn";
import type { CollageColumn, CollagePhoto } from "@/types/content";

export function Community() {
  return (
    <section
      id={sectionIds.community}
      aria-labelledby="community-title"
      className="bg-cream py-15 lg:py-25"
    >
      <Container className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-15">
        <div>
          <SectionHeading
            id="community-title"
            eyebrow={communitySection.eyebrow}
            title={communitySection.title}
            gap="sm"
          />
          <p className="mt-6 text-subtitle-1-mobile text-ink lg:mt-8 lg:text-subtitle-1 lg:text-ink-secondary">
            {communitySection.description}
          </p>
          <ButtonLink
            href={communitySection.action.href}
            variant="secondary"
            className="mt-6 lg:mt-8"
          >
            {communitySection.action.label}
          </ButtonLink>
        </div>

        <PhotoCollage columns={communityCollage} />
      </Container>
    </section>
  );
}

const columnWidth = (column: CollageColumn, frame: "mobile" | "desktop") =>
  Math.max(...column.photos.map((photo) => photo[frame].width));

/**
 * Width, in px, the photo is actually drawn at inside its slot. With object-cover
 * a landscape photo in a portrait slot is scaled by height, so it is wider than
 * the slot. This is the value `sizes` needs, otherwise the browser picks a file
 * that is too small and the photo looks blurry.
 */
function renderedWidth({ image, ...frames }: CollagePhoto, frame: "mobile" | "desktop") {
  const slot = frames[frame];
  const photoRatio = image.src.width / image.src.height;
  return Math.ceil(Math.max(slot.width, slot.height * photoRatio));
}

/**
 * Photo collage over a circle. The two Figma frames use different photo
 * proportions, so each photo gets its sizes for both frames as CSS variables
 * and the classes pick the right ones per breakpoint. Widths are relative
 * (fr and %), which lets the collage shrink on narrow screens.
 */
function PhotoCollage({ columns }: { columns: CollageColumn[] }) {
  const gridStyle = {
    "--cols": columns.map((column) => `${columnWidth(column, "mobile")}fr`).join(" "),
    "--cols-md": columns.map((column) => `${columnWidth(column, "desktop")}fr`).join(" "),
  } as CSSProperties;

  return (
    <div
      style={gridStyle}
      className="relative mx-auto grid w-full max-w-[362px] grid-cols-(--cols) items-center gap-x-3 md:max-w-130 md:grid-cols-(--cols-md) md:gap-x-4 lg:mx-0"
    >
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 aspect-square w-[91%] -translate-1/2 rounded-full bg-primary-light md:w-[96%]"
      />

      {columns.map((column, columnIndex) => {
        const mobileWidth = columnWidth(column, "mobile");
        const desktopWidth = columnWidth(column, "desktop");

        return (
          <div
            key={columnIndex}
            style={
              {
                "--offset": `${column.offsetTop.mobile}px`,
                "--offset-md": `${column.offsetTop.desktop}px`,
              } as CSSProperties
            }
            className={cn(
              "relative flex flex-col gap-2 pt-(--offset) md:gap-[13px] md:pt-(--offset-md)",
              column.align === "end" ? "items-end" : "items-start",
            )}
          >
            {column.photos.map((photo) => {
              const { image, mobile, desktop } = photo;

              return (
                <div
                  key={image.src.src}
                  style={
                    {
                      "--w": `${(mobile.width / mobileWidth) * 100}%`,
                      "--ratio": `${mobile.width} / ${mobile.height}`,
                      "--w-md": `${(desktop.width / desktopWidth) * 100}%`,
                      "--ratio-md": `${desktop.width} / ${desktop.height}`,
                    } as CSSProperties
                  }
                  className="relative aspect-(--ratio) w-(--w) overflow-hidden rounded-[5px] shadow-photo md:aspect-(--ratio-md) md:w-(--w-md) md:rounded-sm"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={`(min-width: 768px) ${renderedWidth(photo, "desktop")}px, ${renderedWidth(photo, "mobile")}px`}
                    className="object-cover"
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
