import { HeroSection } from "@/components/shared/hero-section";
import { FeaturedModels } from "@/components/shared/featured-models";
import { PopularCategories } from "@/components/shared/popular-categories";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HeroSection />
      <FeaturedModels />
      <PopularCategories />
    </main>
  );
}
