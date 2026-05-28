"use client";

import * as React from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/store/useCart";
import { Book } from "@/components/catalog/BookCard";
import { useRouter } from "next/navigation";

export function AddToCartActions({ book }: { book: Book }) {
  const { addItem, setIsOpen } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addItem(book);
  };

  const handleBuyNow = () => {
    addItem(book);
    setIsOpen(false);
    router.push("/checkout");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button size="lg" className="flex-1 text-lg rounded-bookzen bg-brand-primary hover:bg-opacity-90 text-white transition-bookzen" onClick={handleBuyNow}>
        Buy Now
      </Button>
      <Button variant="outline" size="lg" className="flex-1 text-lg rounded-bookzen gap-2 text-brand-primary border-brand-primary hover:bg-brand-primary hover:text-white transition-bookzen" onClick={handleAddToCart}>
        <ShoppingCart className="w-5 h-5" />
        Add to Cart
      </Button>
      <Button variant="outline" size="icon" className="rounded-bookzen w-12 h-12 flex-shrink-0 border-gray-200">
        <Heart className="w-5 h-5 text-gray-400 hover:text-brand-primary transition-bookzen" />
      </Button>
    </div>
  );
}
