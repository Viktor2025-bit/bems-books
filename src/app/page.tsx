import { HeroCarousel } from "@/components/home/HeroCarousel";
import { CategoryCarousel } from "@/components/home/CategoryCarousel";
import { getBooks } from "@/lib/actions/books";

export default async function Home() {
  const books = await getBooks();
  
  // For the demo, we'll use the same books for both carousels
  // In a real app, we'd have separate logic for trending vs new
  const trendingBooks = books.slice(0, 5);
  const newReleases = [...books].reverse().slice(0, 5);

  return (
    <div className="min-h-screen pb-20">
      <HeroCarousel />
      {books.length > 0 && (
        <>
          <CategoryCarousel title="Trending Now" books={trendingBooks} />
          <CategoryCarousel title="New Releases" books={newReleases} />
        </>
      )}
    </div>
  );
}
