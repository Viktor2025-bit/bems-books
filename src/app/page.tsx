import { HeroCarousel } from "@/components/home/HeroCarousel";
import { CategoryCarousel } from "@/components/home/CategoryCarousel";
import { Book } from "@/components/catalog/BookCard";

// Mock data for homepage
const TRENDING_BOOKS: Book[] = [
  { id: "1", title: "The Art of Simplicity", author: "Elena Rossi", price: 14.99, rating: 4.8, cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=800&auto=format&fit=crop" },
  { id: "2", title: "Midnight in Tokyo", author: "Kenji Sato", price: 19.99, rating: 4.5, cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop" },
  { id: "3", title: "Design Systems", author: "Sarah Drasner", price: 29.99, rating: 5.0, cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop" },
  { id: "4", title: "The Silent Patient", author: "Alex Michaelides", price: 21.99, rating: 4.2, cover: "https://images.unsplash.com/photo-1522407183863-c0bf2256188c?q=80&w=800&auto=format&fit=crop" },
  { id: "5", title: "Atomic Habits", author: "James Clear", price: 16.99, rating: 4.9, cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop" },
];

export default function Home() {
  return (
    <div className="min-h-screen pb-20">
      <HeroCarousel />
      <CategoryCarousel title="Trending Now" books={TRENDING_BOOKS} />
      <CategoryCarousel title="New Releases" books={TRENDING_BOOKS.slice().reverse()} />
    </div>
  );
}
