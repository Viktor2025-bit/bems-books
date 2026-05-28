import { HeroCarousel } from "@/components/home/HeroCarousel";
import { Features } from "@/components/home/Features";
import { Newsletter } from "@/components/home/Newsletter";
import { GenreGrid } from "@/components/home/GenreGrid";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { StatsBar } from "@/components/home/StatsBar";
import { DealOfTheDay } from "@/components/home/DealOfTheDay";
import { TabbedProducts } from "@/components/home/TabbedProducts";
import { LatestArticles } from "@/components/home/LatestArticles";
import { getBooks } from "@/lib/actions/books";

export default async function Home() {
  const books = await getBooks();
  
  const trendingBooks = books.slice(0, 5);
  const newReleases = [...books].reverse().slice(0, 5);
  const topRated = [...books].sort((a, b) => b.rating - a.rating).slice(0, 5);

  const tabCategories = [
    { id: "new", label: "New Arrivals", books: newReleases },
    { id: "trending", label: "Trending Now", books: trendingBooks },
    { id: "top", label: "Top Rated", books: topRated },
  ];

  return (
    <div className="min-h-screen">
      <HeroCarousel />
      <StatsBar />
      <Features />
      
      {books.length > 0 && (
        <TabbedProducts categories={tabCategories} title="Discover Our Books" />
      )}
      
      <GenreGrid />
      
      {books.length > 0 && (
        <DealOfTheDay book={books[Math.floor(Math.random() * books.length)]} />
      )}
      
      <TestimonialsCarousel />
      <LatestArticles />
      <Newsletter />
    </div>
  );
}
