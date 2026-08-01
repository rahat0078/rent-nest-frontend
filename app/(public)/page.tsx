import CategoriesSection from "@/components/home/categorySection";
import CTA from "@/components/home/cta";
import FeaturedProperties from "@/components/home/featuredProperties";
import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/howItWorks";
import Testimonials from "@/components/home/testimonials";
import WhyChooseUs from "@/components/home/whyChooseUs";
import { getAllProperty } from "./_propertyActions/getAllProperty";

export default async function Home() {
  const response = await getAllProperty({ page: 1, limit: 6 });

  return (
    <div>
      <Hero />
      <FeaturedProperties properties={response.data.data} />
      <CategoriesSection />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </div>
  );
}
