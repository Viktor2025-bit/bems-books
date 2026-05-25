"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/store/useCart";

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

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to the book details page
    addItem(book);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex flex-col bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
    >
      <Link href={`/book/${book.id}`} className="relative h-64 w-full bg-gray-50 flex items-center justify-center p-4">
        <div className="relative w-[140px] h-[200px] shadow-md group-hover:scale-105 transition-transform duration-500">
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            className="object-cover rounded-r-md"
          />
          {/* Spine effect */}
          <div className="absolute left-0 inset-y-0 w-2 bg-gradient-to-r from-black/20 to-transparent mix-blend-multiply" />
        </div>

        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
          <Button 
            variant="primary" 
            onClick={handleQuickAdd}
            className="rounded-full shadow-lg gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
          >
            <ShoppingCart className="w-4 h-4" />
            Quick Add
          </Button>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center space-x-1 text-highlight mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.floor(book.rating) ? "fill-current" : "text-gray-300"}`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">({book.rating})</span>
        </div>
        <Link href={`/book/${book.id}`} className="hover:text-primary">
          <h3 className="font-semibold text-lg line-clamp-1">{book.title}</h3>
        </Link>
        <p className="text-sm text-gray-500 mb-4">{book.author}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-bold text-lg">${book.price.toFixed(2)}</span>
        </div>
      </div>
    </motion.div>
  );
}
