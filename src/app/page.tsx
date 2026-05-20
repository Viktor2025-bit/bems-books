import { HeroCarousel } from "@/components/home/HeroCarousel";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroCarousel />
      {/* Category Carousels will go here */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Trending Now</h2>
        <div className="h-64 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400">
          Book Carousel Component Placeholder
        </div>
      </section>
    </div>
  );
}
