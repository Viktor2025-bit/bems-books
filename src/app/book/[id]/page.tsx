import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, ChevronLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CategoryCarousel } from "@/components/home/CategoryCarousel";
import { Book } from "@/components/catalog/BookCard";
import { AddToCartActions } from "@/components/catalog/AddToCartActions";

// Mock Data
const BOOKS: Book[] = [
  { id: "1", title: "The Art of Simplicity", author: "Elena Rossi", price: 14.99, rating: 4.8, cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=800&auto=format&fit=crop" },
  { id: "2", title: "Midnight in Tokyo", author: "Kenji Sato", price: 19.99, rating: 4.5, cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop" },
  { id: "3", title: "Design Systems", author: "Sarah Drasner", price: 29.99, rating: 5.0, cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop" },
  { id: "4", title: "The Silent Patient", author: "Alex Michaelides", price: 21.99, rating: 4.2, cover: "https://images.unsplash.com/photo-1522407183863-c0bf2256188c?q=80&w=800&auto=format&fit=crop" },
  { id: "5", title: "Atomic Habits", author: "James Clear", price: 16.99, rating: 4.9, cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop" },
];

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const book = BOOKS.find(b => b.id === resolvedParams.id) || BOOKS[0];
  const relatedBooks = BOOKS.filter(b => b.id !== book.id);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50/30">
      <div className="container mx-auto px-4">
        {/* Back Link */}
        <Link href="/catalog" className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Catalog
        </Link>

        {/* Product Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Left: Book Cover Image */}
            <div className="flex justify-center items-center">
              <div className="relative w-64 h-[400px] md:w-80 md:h-[500px] shadow-2xl rounded-r-xl overflow-hidden hover:scale-105 transition-transform duration-500">
                <Image
                  src={book.cover}
                  alt={book.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute left-0 inset-y-0 w-4 bg-gradient-to-r from-black/20 to-transparent mix-blend-multiply" />
              </div>
            </div>

            {/* Right: Book Details */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center space-x-1 text-highlight mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(book.rating) ? "fill-current" : "text-gray-300"}`} />
                ))}
                <span className="text-sm text-gray-500 ml-2 font-medium">{book.rating} / 5.0 (128 reviews)</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold font-jost text-primary mb-2">
                {book.title}
              </h1>
              <p className="text-xl text-gray-500 mb-6">By <span className="text-highlight font-medium hover:underline cursor-pointer">{book.author}</span></p>
              
              <div className="text-3xl font-bold text-primary mb-8">
                ${book.price.toFixed(2)}
              </div>

              <div className="prose prose-gray max-w-none mb-10 text-gray-600 leading-relaxed">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                </p>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-3 gap-4 border-y border-gray-100 py-6 mb-10">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Format</div>
                  <div className="font-medium text-primary">EPUB, PDF</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Language</div>
                  <div className="font-medium text-primary">English</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Pages</div>
                  <div className="font-medium text-primary">342</div>
                </div>
              </div>

              {/* Actions */}
              <AddToCartActions book={book} />
              
              <p className="text-sm text-gray-400 mt-6 flex items-center justify-center sm:justify-start">
                <span className="w-2 h-2 rounded-full bg-highlight mr-2" />
                Instant delivery to your email upon purchase.
              </p>
            </div>
          </div>
        </div>

        {/* Related Books */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <CategoryCarousel title="Readers Also Bought" books={relatedBooks} />
        </div>
      </div>
    </div>
  );
}
