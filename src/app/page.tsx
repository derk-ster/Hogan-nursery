import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { CategoryGrid } from "@/components/CategoryGrid";
import { StockCheckSection } from "@/components/StockCheckSection";
import { ProjectHelpSection } from "@/components/ProjectHelpSection";
import { GallerySection } from "@/components/GallerySection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { VisitInfoSection } from "@/components/VisitInfoSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <TrustBar />
        <CategoryGrid />
        <StockCheckSection />
        <ProjectHelpSection />
        <FeaturedProducts />
        <GallerySection />
        <VisitInfoSection />
      </main>
      <Footer />
    </>
  );
}
