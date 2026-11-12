import type { StaticImageData } from "next/image";

export interface LinkItem {
  label: string;
  href: string;
}

export interface ImageAsset {
  src: StaticImageData;
  /** Empty string marks the image as decorative. */
  alt: string;
}

export interface Category {
  number: string;
  title: string;
  description: string;
  href: string;
}

export interface FeaturedCourse {
  badge: string;
  eyebrow: string;
  title: string;
  description: string;
  instructor: string;
  tags: string[];
  image: ImageAsset;
  primaryAction: LinkItem;
  secondaryAction: LinkItem;
}

export type StepIconName = "focus" | "experience" | "practice";

export interface Step {
  label: string;
  title: string;
  description: string;
  icon: StepIconName;
}

export interface Testimonial {
  quote: string;
  author: {
    name: string;
    role: string;
    avatar: ImageAsset;
  };
}

export interface Stat {
  value: string;
  label: string;
}

/** Size of an element in one Figma frame, in px. */
export interface FrameSize {
  width: number;
  height: number;
}

export interface CollagePhoto {
  image: ImageAsset;
  mobile: FrameSize;
  desktop: FrameSize;
}

export interface CollageColumn {
  /** Horizontal alignment of photos narrower than the column. */
  align: "start" | "end";
  /** Top offset of the column in each frame, in px. */
  offsetTop: { mobile: number; desktop: number };
  photos: CollagePhoto[];
}

export type ContactIconName = "mail" | "clock";

export interface ContactMethod {
  icon: ContactIconName;
  title: string;
  detail: string;
  href?: string;
}

export interface FooterColumn {
  title: string;
  links: LinkItem[];
}
