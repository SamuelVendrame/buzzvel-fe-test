/**
 * All page content lives here (local mock data, no backend or CMS).
 * Copy and images come from the Figma file "Buzzvel FE - Test 2026".
 *
 * Links to pages that are out of scope for this test point to the matching
 * section of the page, or to "#" when there is none.
 */
import alexMorgan from "@/assets/images/alex-morgan.jpg";
import avatar1 from "@/assets/images/avatar-1.jpg";
import avatar2 from "@/assets/images/avatar-2.jpg";
import avatar3 from "@/assets/images/avatar-3.jpg";
import avatar4 from "@/assets/images/avatar-4.jpg";
import featuredCourseImage from "@/assets/images/featured-course.jpg";
import heroImage from "@/assets/images/hero.jpg";
import people01 from "@/assets/images/people-01.jpg";
import people02 from "@/assets/images/people-02.jpg";
import people03 from "@/assets/images/people-03.jpg";
import people04 from "@/assets/images/people-04.jpg";
import people05 from "@/assets/images/people-05.jpg";
import people06 from "@/assets/images/people-06.jpg";
import people07 from "@/assets/images/people-07.jpg";
import people08 from "@/assets/images/people-08.jpg";
import people09 from "@/assets/images/people-09.jpg";
import people10 from "@/assets/images/people-10.jpg";
import type {
  Category,
  CollageColumn,
  ContactMethod,
  FeaturedCourse,
  FooterColumn,
  ImageAsset,
  LinkItem,
  Stat,
  Step,
  Testimonial,
} from "@/types/content";

export const site = {
  name: "Luma",
  title: "Luma — Build skills that actually move you forward",
  description:
    "Practical courses taught by people who do the work every day. Learn design, technology, business and more — one focused lesson at a time.",
} as const;

export const sectionIds = {
  courses: "courses",
  featuredCourse: "featured-course",
  howItWorks: "how-it-works",
  community: "community",
  contact: "contact",
} as const;

export const navigation: LinkItem[] = [
  { label: "Courses", href: `#${sectionIds.courses}` },
  { label: "For Teams", href: `#${sectionIds.contact}` },
  { label: "Community", href: `#${sectionIds.community}` },
  { label: "About", href: `#${sectionIds.howItWorks}` },
];

export const headerActions = {
  login: { label: "Log in", href: "#" },
  cta: { label: "Start learning", href: `#${sectionIds.courses}` },
} satisfies Record<string, LinkItem>;

/** Small avatars used as social proof. Decorative: the text next to them carries the meaning. */
export const learnerAvatars: ImageAsset[] = [
  { src: avatar1, alt: "" },
  { src: avatar2, alt: "" },
  { src: avatar3, alt: "" },
  { src: avatar4, alt: "" },
];

export const hero = {
  eyebrow: "Learn at your own pace",
  title: "Build skills that actually move you forward.",
  description: site.description,
  primaryAction: { label: "Explore courses", href: `#${sectionIds.courses}` },
  secondaryAction: { label: "See how it works", href: `#${sectionIds.howItWorks}` },
  image: { src: heroImage, alt: "Person focused on learning at their laptop" },
  trust: { highlight: "Trusted by 24,000+", rest: "learners" },
  coursesBadge: { value: "120+", label: "expert-led courses" },
  rating: { stars: 5, label: "4.9 avg rating" },
} as const;

export const categoriesSection = {
  eyebrow: "Find your next skill",
  title: "Learn something worth knowing.",
  description: "Short, practical courses designed around skills you can put to work immediately.",
  linkLabel: "Explore",
} as const;

export const categories: Category[] = [
  {
    number: "01",
    title: "Product Design",
    description: "Turn complex problems into clear, useful experiences.",
    href: "#",
  },
  {
    number: "02",
    title: "Technology",
    description: "Build a stronger understanding of the tools shaping digital products.",
    href: "#",
  },
  {
    number: "03",
    title: "Business",
    description: "Develop practical skills for better decisions and stronger teams.",
    href: "#",
  },
  {
    number: "04",
    title: "Creative",
    description: "Explore new ways to communicate, create and tell stories.",
    href: "#",
  },
];

export const featuredCourse: FeaturedCourse = {
  badge: "Featured Course",
  eyebrow: "Most popular this month",
  title: "Designing products people understand.",
  description:
    "Learn how to turn complex workflows into simple, intentional product experiences through research, structure and thoughtful interaction design.",
  instructor: "with Maya Chen · Senior Product Designer",
  tags: ["8 lessons", "2h 40min", "Intermediate"],
  image: {
    src: featuredCourseImage,
    alt: "Product design course — student working on interface designs",
  },
  primaryAction: { label: "View course", href: "#" },
  secondaryAction: { label: "Browse all courses", href: `#${sectionIds.courses}` },
};

export const howItWorksSection = {
  eyebrow: "How Luma works",
  title: "Less browsing. More learning.",
} as const;

export const steps: Step[] = [
  {
    label: "Step 01",
    title: "Choose your focus",
    description:
      "Find courses based on the skill you want to build, not endless content categories.",
    icon: "focus",
  },
  {
    label: "Step 02",
    title: "Learn from experience",
    description: "Follow concise lessons created by professionals who use these skills.",
    icon: "experience",
  },
  {
    label: "Step 03",
    title: "Put it into practice",
    description:
      "Every course includes practical exercises designed to turn knowledge into action.",
    icon: "practice",
  },
];

export const testimonial: Testimonial = {
  quote:
    "The lessons are short enough to fit into my week, but detailed enough that I actually leave with something I can use.",
  author: {
    name: "Alex Morgan",
    role: "Product Manager",
    avatar: { src: alexMorgan, alt: "Alex Morgan" },
  },
};

export const stats: Stat[] = [
  { value: "24K+", label: "active learners" },
  { value: "120+", label: "expert-led courses" },
  { value: "92%", label: "complete their first course" },
];

export const communitySection = {
  eyebrow: "The people",
  title: "Meet international students & teachers",
  description:
    "Morbi sit egestas dignissim pharetra, sed amet. Tempus justo senectus risus ac vel, velit, nunc. Eget commodo eget in aliquam facilisi facilisi nec magna hendrerit. Placerat ipsum sit tellus urna, faucibus aenean lorem faucibus integer.",
  action: { label: "Explore teachers and students", href: "#" },
} as const;

/** Photo collage, column by column, with the size of each photo in both Figma frames. */
export const communityCollage: CollageColumn[] = [
  {
    align: "end",
    offsetTop: { mobile: 48, desktop: 64 },
    photos: [
      {
        image: { src: people01, alt: "Young student raising her hand during a class" },
        mobile: { width: 72, height: 96 },
        desktop: { width: 103, height: 154 },
      },
      {
        image: { src: people02, alt: "Group of students working together around a laptop" },
        mobile: { width: 94, height: 129 },
        desktop: { width: 138, height: 207 },
      },
    ],
  },
  {
    align: "start",
    offsetTop: { mobile: 0, desktop: 26 },
    photos: [
      {
        image: { src: people03, alt: "Student in a blue hoodie reading a book in a library" },
        mobile: { width: 72, height: 106 },
        desktop: { width: 103, height: 170 },
      },
      {
        image: { src: people04, alt: "Two students rehearsing next to a music stand" },
        mobile: { width: 72, height: 107.5 },
        desktop: { width: 103, height: 173 },
      },
      {
        image: { src: people05, alt: "Man studying with a book and a tablet" },
        mobile: { width: 72, height: 80 },
        desktop: { width: 103, height: 128 },
      },
    ],
  },
  {
    align: "start",
    offsetTop: { mobile: 0, desktop: 0 },
    photos: [
      {
        image: { src: people06, alt: "Graduate in cap and gown holding a diploma" },
        mobile: { width: 72, height: 85.5 },
        desktop: { width: 103, height: 137 },
      },
      {
        image: { src: people07, alt: "Woman working on a laptop at a desk" },
        mobile: { width: 72, height: 86 },
        desktop: { width: 103, height: 138 },
      },
      {
        image: {
          src: people08,
          alt: "Student following an online lesson with a teacher on screen",
        },
        mobile: { width: 72, height: 96 },
        desktop: { width: 103, height: 154 },
      },
    ],
  },
  {
    align: "start",
    offsetTop: { mobile: 0, desktop: 0 },
    photos: [
      {
        image: { src: people09, alt: "Smiling student holding red folders outside a university" },
        mobile: { width: 88, height: 127.5 },
        desktop: { width: 128, height: 205 },
      },
      {
        image: { src: people10, alt: "Student wearing a hijab holding a coffee cup and notebooks" },
        mobile: { width: 72, height: 82.5 },
        desktop: { width: 103, height: 132 },
      },
    ],
  },
];

export const contactSection = {
  eyebrow: "Contact",
  title: "Get in touch",
  description:
    "Have a question? We’re here to help. Whether you’re looking for the right course, learning with your team or interested in teaching with Luma, we’d love to hear from you.",
  form: {
    title: "Contact us",
    description: "Fill out the fields and we will get in touch.",
    submitLabel: "Send message",
  },
} as const;

export const contactMethods: ContactMethod[] = [
  {
    icon: "mail",
    title: "Email",
    detail: "contact@luma.com",
    href: "mailto:contact@luma.com",
  },
  {
    icon: "clock",
    title: "Response Time",
    detail: "Up to 24 hours on business days",
  },
];

export const finalCta = {
  title: "What will you learn next?",
  description: "Start with one course. Build from there.",
  primaryAction: { label: "Explore all courses", href: `#${sectionIds.courses}` },
  secondaryAction: { label: "Join Luma", href: "#" },
} as const;

export const footer = {
  tagline: "Practical learning for curious people.",
  copyright: "© 2026 Luma Learning",
} as const;

export const footerColumns: FooterColumn[] = [
  {
    title: "Explore",
    links: [
      { label: "Courses", href: `#${sectionIds.courses}` },
      { label: "Categories", href: `#${sectionIds.courses}` },
      { label: "Instructors", href: `#${sectionIds.community}` },
      { label: "For Teams", href: `#${sectionIds.contact}` },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: `#${sectionIds.howItWorks}` },
      { label: "Careers", href: "#" },
      { label: "Journal", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Contact", href: `#${sectionIds.contact}` },
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" },
    ],
  },
];
