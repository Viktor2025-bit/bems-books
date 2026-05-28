"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, ShoppingCart, BookOpen, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/store/useCart";
import { useWishlist } from "@/store/useWishlist";
import type { Book } from "./BookCard";

interface QuickViewModalProps {
 book: Book | null;
 isOpen: boolean;
 onClose: () => void;
}

export function QuickViewModal({ book, isOpen, onClose }: QuickViewModalProps) {
 const { addItem } = useCart();
 const { toggleItem, isInWishlist } = useWishlist();
 const [mounted, setMounted] = React.useState(false);

 React.useEffect(() => {
 setMounted(true);
 if (isOpen) {
 document.body.style.overflow = "hidden";
 } else {
 document.body.style.overflow = "unset";
 }
 return () => {
 document.body.style.overflow = "unset";
 };
 }, [isOpen]);

 if (!mounted || !book) return null;

 const inWishlist = isInWishlist(book.id);

 return (
 <AnimatePresence>
 {isOpen && (
 <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
 {/* Backdrop */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 0.2 }}
 className="absolute inset-0 bg-black/60 backdrop-blur-sm"
 onClick={onClose}
 />

 {/* Modal Content */}
 <motion.div
 initial={{ opacity: 0, scale: 0.95, y: 20 }}
 animate={{ opacity: 1, scale: 1, y: 0 }}
 exit={{ opacity: 0, scale: 0.95, y: 20 }}
 transition={{ type: "spring", duration: 0.5 }}
 className="relative w-full max-w-4xl bg-card rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
 onClick={(e) => e.stopPropagation()}
 >
 {/* Close Button */}
 <div className="absolute top-4 right-4 z-10 flex gap-2">
 <button
 onClick={(e) => { e.stopPropagation(); toggleItem(book); }}
 className="w-8 h-8 flex items-center justify-center rounded-full bg-card shadow-sm hover:scale-110 transition-transform"
 aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
 >
 <Heart className={`w-4 h-4 transition-colors ${inWishlist ? "fill-brand-primary text-brand-primary" : "text-muted-foreground hover:text-brand-primary"}`} />
 </button>
 <button
 onClick={onClose}
 className="w-8 h-8 flex items-center justify-center rounded-full bg-muted text-muted-foreground hover:opacity-80 hover:text-primary transition-colors"
 >
 <X className="w-5 h-5" />
 </button>
 </div>

 {/* Left: Image Container */}
 <div className="w-full md:w-1/2 bg-muted/50 p-8 flex items-center justify-center relative min-h-[300px] md:min-h-0">
 <div className="relative w-[200px] h-[300px] shadow-2xl">
 <Image
 src={book.coverImage}
 alt={book.title}
 fill
 sizes="(max-width: 768px) 200px, 200px"
 className="object-cover rounded-bookzen"
 />
 {/* Spine effect */}
 <div className="absolute left-0 inset-y-0 w-3 bg-gradient-to-r from-black/20 to-transparent mix-blend-multiply" />
 </div>
 </div>

 {/* Right: Details Container */}
 <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto">
 {/* Rating */}
 <div className="flex items-center space-x-2 text-brand-secondary mb-4">
 <div className="flex">
 {Array.from({ length: 5 }).map((_, i) => (
 <Star
 key={i}
 className={`w-4 h-4 ${i < Math.floor(book.rating) ? "fill-current" : "text-muted"}`}
 />
 ))}
 </div>
 <span className="text-sm font-medium text-muted-foreground">
 {book.rating} Rating
 </span>
 </div>

 {/* Title & Author */}
 <h2 className="text-3xl font-bold text-card-foreground mb-2 leading-tight">
 {book.title}
 </h2>
 <p className="text-lg text-muted-foreground mb-6">
 by <span className="font-medium text-brand-primary">{book.author}</span>
 </p>

 {/* Price */}
 <div className="flex items-end gap-3 mb-6">
 <span className="text-3xl font-bold text-card-foreground">
 ${book.price.toFixed(2)}
 </span>
 {/* Optional Original Price simulation */}
 <span className="text-lg line-through text-muted-foreground mb-1">
 ${(book.price * 1.3).toFixed(2)}
 </span>
 </div>

 {/* Short Description */}
 <p className="text-muted-foreground leading-relaxed mb-8">
 {/* Fallback description if the book object doesn't have it explicitly passed */}
 {(book as any).description || `Dive into ${book.title}, a captivating read by ${book.author} that has captured the hearts of readers worldwide. Get your digital copy instantly.`}
 </p>

 {/* Specs */}
 <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
 <div className="flex items-center gap-2">
 <BookOpen className="w-4 h-4 text-muted-foreground" />
 <span>EPUB & PDF</span>
 </div>
 <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
 <span>Instant Delivery</span>
 </div>

 {/* Actions */}
 <div className="mt-auto flex flex-col sm:flex-row gap-4">
 <Button
 onClick={() => {
 addItem(book);
 onClose();
 }}
 size="lg"
 className="flex-1 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-bookzen shadow-md shadow-brand-primary/20 group"
 >
 <ShoppingCart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
 Add to Cart
 </Button>
 <Link href={`/book/${book.id}`} className="flex-1" onClick={onClose}>
 <Button
 variant="outline"
 size="lg"
 className="w-full rounded-bookzen border-border text-card-foreground hover:border-primary hover:bg-muted"
 >
 View Full Details
 </Button>
 </Link>
 </div>
 </div>
 </motion.div>
 </div>
 )}
 </AnimatePresence>
 );
}
