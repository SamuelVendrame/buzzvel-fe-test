import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Categories } from "@/components/sections/categories";
import { Community } from "@/components/sections/community";
import { Contact } from "@/components/sections/contact";
import { FeaturedCourse } from "@/components/sections/featured-course";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Testimonial } from "@/components/sections/testimonial";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Categories />
        <FeaturedCourse />
        <HowItWorks />
        <Testimonial />
        <Community />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
