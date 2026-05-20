"use client";

import * as React from "react";
import { Book, BookCard } from "@/components/catalog/BookCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryCarouselProps {
  title: string;
  books: Book[];
}

export function CategoryCarousel({ title, books }: CategoryCarouselProps) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = direction === "left" ? -400 : 400;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold font-jost text-primary">{title}</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-highlight hover:text-white hover:border-highlight transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-highlight hover:text-white hover:border-highlight transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {books.map((book) => (
            <div key={book.id} className="min-w-[280px] md:min-w-[320px] snap-start">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
