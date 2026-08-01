import CategoriesSection from "@/components/home/categorySection";
import CTA from "@/components/home/cta";
import FeaturedProperties from "@/components/home/featuredProperties";
import Footer from "@/components/home/footer";
import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/howItWorks";
import Testimonials from "@/components/home/testimonials";
import WhyChooseUs from "@/components/home/whyChooseUs";

export default function Home() {
  return (
    <div>
      <Hero/>
      <FeaturedProperties/>
      <CategoriesSection/>
      <WhyChooseUs/>
      <HowItWorks/>
      <Testimonials/>
      <CTA/>
    </div>
  );
}
