import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ChevronLeft } from "lucide-react";
import { CategoryCarousel } from "@/components/home/CategoryCarousel";
import { AddToCartActions } from "@/components/catalog/AddToCartActions";
import { getBookById, getBooks } from "@/lib/actions/books";
import { notFound } from "next/navigation";

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const book = await getBookById(resolvedParams.id);

  if (!book) {
    notFound();
  }

  const allBooks = await getBooks();
  const relatedBooks = allBooks.filter(b => b.id !== book.id).slice(0, 5);

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
                  src={book.coverImage}
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
                <span className="text-sm text-gray-500 ml-2 font-medium">{book.rating} / 5.0 ({book.reviews.length} reviews)</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold font-jost text-primary mb-2">
                {book.title}
              </h1>
              <p className="text-xl text-gray-500 mb-6">By <span className="text-highlight font-medium hover:underline cursor-pointer">{book.author}</span></p>
              
              <div className="text-3xl font-bold text-primary mb-8">
                ${book.price.toFixed(2)}
              </div>

              <div className="prose prose-gray max-w-none mb-10 text-gray-600 leading-relaxed">
                <p>{book.description}</p>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-3 gap-4 border-y border-gray-100 py-6 mb-10">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Format</div>
                  <div className="font-medium text-primary">EPUB, PDF</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Category</div>
                  <div className="font-medium text-primary">{book.category.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Stock</div>
                  <div className="font-medium text-primary">{book.stock > 0 ? "In Stock" : "Out of Stock"}</div>
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
        {relatedBooks.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <CategoryCarousel title="Readers Also Bought" books={relatedBooks} />
          </div>
        )}
      </div>
    </div>
  );
}
