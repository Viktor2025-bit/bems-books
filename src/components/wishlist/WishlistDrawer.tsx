"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useWishlist } from "@/store/useWishlist";
import { useCart } from "@/store/useCart";

export function WishlistDrawer() {
 const { items, isOpen, setIsOpen, removeItem } = useWishlist();
 const { addItem, setIsOpen: setCartOpen } = useCart();
 const [mounted, setMounted] = React.useState(false);

 React.useEffect(() => {
 setMounted(true);
 }, []);

 React.useEffect(() => {
 if (isOpen) {
 document.body.style.overflow = "hidden";
 } else {
 document.body.style.overflow = "unset";
 }
 return () => {
 document.body.style.overflow = "unset";
 };
 }, [isOpen]);

 if (!mounted) return null;

 return (
 <AnimatePresence>
 {isOpen && (
 <>
 {/* Backdrop */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 onClick={() => setIsOpen(false)}
 className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
 />

 {/* Drawer */}
 <motion.div
 initial={{ x: "100%" }}
 animate={{ x: 0 }}
 exit={{ x: "100%" }}
 transition={{ type: "spring", stiffness: 300, damping: 30 }}
 className="fixed inset-y-0 right-0 z-[100] w-full max-w-md bg-card shadow-2xl flex flex-col border-l border-border"
 >
 {/* Header */}
 <div className="flex items-center justify-between p-6 border-b border-border">
 <h2 className="text-xl font-bold text-card-foreground flex items-center gap-2">
 <Heart className="w-5 h-5 text-brand-primary fill-current" />
 Your Wishlist
 </h2>
 <button
 onClick={() => setIsOpen(false)}
 className="p-2 rounded-full hover:bg-muted transition-colors"
 >
 <X className="w-5 h-5 text-muted-foreground" />
 </button>
 </div>

 {/* Wishlist Items */}
 <div className="flex-1 overflow-y-auto p-6 space-y-4">
 {items.length === 0 ? (
 <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground space-y-4">
 <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
 <Heart className="w-8 h-8 text-brand-primary/40" />
 </div>
 <p>Your wishlist is currently empty.</p>
 <Button variant="outline" onClick={() => setIsOpen(false)}>
 Discover Books
 </Button>
 </div>
 ) : (
 <AnimatePresence>
 {items.map((item) => (
 <motion.div
 key={item.id}
 layout
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 0.95 }}
 className="flex gap-4 bg-card p-3 rounded-bookzen border border-border shadow-sm hover:shadow-md transition-all group"
 >
 <Link href={`/book/${item.id}`} onClick={() => setIsOpen(false)} className="relative w-20 h-28 rounded-sm shadow-sm overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
 <Image src={item.coverImage} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
 <div className="absolute left-0 inset-y-0 w-1 bg-gradient-to-r from-black/20 to-transparent mix-blend-multiply" />
 </Link>
 
 <div className="flex-1 flex flex-col justify-between py-1">
 <div className="flex justify-between items-start">
 <Link href={`/book/${item.id}`} onClick={() => setIsOpen(false)} className="hover:text-brand-primary transition-colors">
 <h3 className="font-semibold text-card-foreground line-clamp-1 pr-4">{item.title}</h3>
 </Link>
 <button
 onClick={() => removeItem(item.id)}
 className="text-muted-foreground hover:text-red-500 p-1 -mt-1 -mr-1"
 aria-label="Remove from wishlist"
 >
 <Trash2 className="w-4 h-4" />
 </button>
 </div>
 <p className="text-sm text-muted-foreground -mt-1">{item.author}</p>
 
 <div className="flex items-center justify-between mt-auto">
 <span className="font-bold text-lg text-primary">${item.price.toFixed(2)}</span>
 <Button 
 size="sm" 
 onClick={() => {
 addItem(item);
 removeItem(item.id);
 setIsOpen(false);
 setCartOpen(true);
 }}
 className="h-8 px-3 rounded-full text-xs gap-1.5 bg-primary hover:bg-primary/90"
 >
 <ShoppingCart className="w-3 h-3" />
 Add to Cart
 </Button>
 </div>
 </div>
 </motion.div>
 ))}
 </AnimatePresence>
 )}
 </div>
 </motion.div>
 </>
 )}
 </AnimatePresence>
 );
}
