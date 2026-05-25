import * as React from "react";
import { FilterSidebar } from "@/components/catalog/FilterSidebar";
import { BookCard } from "@/components/catalog/BookCard";
import { getBooks } from "@/lib/actions/books";

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  
  const filters = {
    query: typeof params.q === "string" ? params.q : undefined,
    categoryId: typeof params.category === "string" ? params.category : undefined,
    minPrice: params.minPrice ? parseFloat(params.minPrice as string) : undefined,
    maxPrice: params.maxPrice ? parseFloat(params.maxPrice as string) : undefined,
    minRating: params.minRating ? parseFloat(params.minRating as string) : undefined,
  };

  const books = await getBooks(filters);

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
          {books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <h3 className="text-2xl font-semibold mb-2">No books found</h3>
              <p className="text-gray-500">Try adjusting your filters or check back later.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
