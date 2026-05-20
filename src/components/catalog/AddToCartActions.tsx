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
      <Button size="lg" className="flex-1 text-lg rounded-full" onClick={handleBuyNow}>
        Buy Now
      </Button>
      <Button variant="outline" size="lg" className="flex-1 text-lg rounded-full gap-2" onClick={handleAddToCart}>
        <ShoppingCart className="w-5 h-5" />
        Add to Cart
      </Button>
      <Button variant="outline" size="icon" className="rounded-full w-12 h-12 flex-shrink-0">
        <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
      </Button>
    </div>
  );
}
