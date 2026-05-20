import * as React from "react";
import { FilterSidebar } from "@/components/catalog/FilterSidebar";
import { BookCard, Book } from "@/components/catalog/BookCard";

// Mock data
const BOOKS: Book[] = [
  {
    id: "1",
    title: "The Art of Simplicity",
    author: "Elena Rossi",
    price: 14.99,
    rating: 4.8,
    cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Midnight in Tokyo",
    author: "Kenji Sato",
    price: 19.99,
    rating: 4.5,
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Design Systems",
    author: "Sarah Drasner",
    price: 29.99,
    rating: 5.0,
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: 21.99,
    rating: 4.2,
    cover: "https://images.unsplash.com/photo-1522407183863-c0bf2256188c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Atomic Habits",
    author: "James Clear",
    price: 16.99,
    rating: 4.9,
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: 24.99,
    rating: 4.7,
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
  },
];

export default function CatalogPage() {
  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-jost mb-4">Explore Our Catalog</h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          Browse through our extensive collection of premium e-books. Find your next favorite read and get it delivered directly to your inbox.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <FilterSidebar />
        
        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {BOOKS.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
