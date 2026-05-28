"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/store/useCart";
import { useWishlist } from "@/store/useWishlist";
import { QuickViewModal } from "./QuickViewModal";

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  rating: number;
}

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const [isQuickViewOpen, setIsQuickViewOpen] = React.useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to the book details page
    e.stopPropagation();
    addItem(book);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(book);
  };

  // Badges Logic
  const isBestseller = book.rating >= 4.7;
  const isSale = book.price < 13;
  const inWishlist = isInWishlist(book.id);

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group relative flex flex-col bg-card rounded-bookzen hover:shadow-md transition-shadow duration-300 overflow-hidden border border-border"
      >
        <Link href={`/book/${book.id}`} className="relative h-64 w-full bg-muted flex items-center justify-center p-4">
          <div className="relative w-[140px] h-[200px] shadow-md group-hover:scale-105 transition-transform duration-500">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-bookzen"
            />
            {/* Spine effect */}
            <div className="absolute left-0 inset-y-0 w-2 bg-gradient-to-r from-black/20 to-transparent mix-blend-multiply" />
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {isBestseller && (
              <span className="text-[10px] uppercase font-bold tracking-wider bg-brand-primary text-white px-2 py-1 rounded shadow-sm">
                Bestseller
              </span>
            )}
            {isSale && (
              <span className="text-[10px] uppercase font-bold tracking-wider bg-brand-secondary text-white px-2 py-1 rounded shadow-sm">
                Sale
              </span>
            )}
          </div>

          {/* Wishlist Heart Button (Always visible or visible on hover) */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-4 h-4 transition-colors ${inWishlist ? "fill-brand-primary text-brand-primary" : "text-gray-400"}`} />
          </button>

          {/* Quick Add / Quick View Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
            <div className="flex flex-col gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              <Button 
                variant="outline" 
                onClick={handleQuickAdd}
                className="rounded-bookzen bg-white text-brand-primary border-brand-primary hover:bg-brand-primary hover:text-white shadow-lg gap-2 w-32"
              >
                <ShoppingCart className="w-4 h-4" />
                Add
              </Button>
              <Button 
                variant="outline" 
                onClick={handleQuickView}
                className="rounded-bookzen bg-primary text-white border-primary hover:bg-primary/90 shadow-lg gap-2 w-32"
              >
                <Eye className="w-4 h-4" />
                Quick View
              </Button>
            </div>
          </div>
        </Link>

        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center space-x-1 text-brand-secondary mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(book.rating) ? "fill-current" : "text-muted"}`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">({book.rating})</span>
          </div>
          <Link href={`/book/${book.id}`} className="hover:text-brand-primary transition-bookzen">
            <h3 className="font-medium text-lg line-clamp-1 text-card-foreground">{book.title}</h3>
          </Link>
          <p className="text-sm text-muted-foreground mb-4">{book.author}</p>
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-primary">${book.price.toFixed(2)}</span>
              {isSale && (
                <span className="text-sm line-through text-muted-foreground">${(book.price * 1.3).toFixed(2)}</span>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal (Portal-like, outside of the Link) */}
      <QuickViewModal 
        book={book} 
        isOpen={isQuickViewOpen} 
        onClose={() => setIsQuickViewOpen(false)} 
      />
    </>
  );
}
