"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, Truck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/store/useCart";

const FREE_SHIPPING_THRESHOLD = 50.00;

export function CartDrawer() {
 const { items, isOpen, setIsOpen, removeItem, updateQuantity, getCartTotal } = useCart();
 
 // Prevent scrolling when cart is open
 React.useEffect(() => {
 if (isOpen) {
 document.body.style.overflow = "hidden";
 } else {
 document.body.style.overflow = "auto";
 }
 return () => {
 document.body.style.overflow = "auto";
 };
 }, [isOpen]);

 const total = getCartTotal();
 const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - total);
 const progressPercentage = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100);

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
 className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
 />

 {/* Drawer */}
 <motion.div
 initial={{ x: "100%" }}
 animate={{ x: 0 }}
 exit={{ x: "100%" }}
 transition={{ type: "spring", stiffness: 300, damping: 30 }}
 className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-card shadow-2xl flex flex-col border-l border-border"
 >
 {/* Header */}
 <div className="flex items-center justify-between p-6 border-b border-border">
 <h2 className="text-xl font-bold text-card-foreground flex items-center gap-2">
 <ShoppingBag className="w-5 h-5" />
 Your Cart
 </h2>
 <button
 onClick={() => setIsOpen(false)}
 className="p-2 rounded-full hover:bg-muted transition-colors"
 >
 <X className="w-5 h-5 text-muted-foreground" />
 </button>
 </div>

 {/* Free Shipping Progress Bar */}
 {items.length > 0 && (
 <div className="px-6 py-4 bg-muted/30 border-b border-border">
 <div className="flex items-center gap-2 mb-2">
 <Truck className={`w-4 h-4 ${amountToFreeShipping === 0 ? "text-brand-secondary" : "text-muted-foreground"}`} />
 <p className="text-sm font-medium text-card-foreground">
 {amountToFreeShipping === 0 ? (
 <span className="text-brand-secondary">You've unlocked free shipping!</span>
 ) : (
 <span>You're <span className="font-bold text-brand-primary">${amountToFreeShipping.toFixed(2)}</span> away from free shipping!</span>
 )}
 </p>
 </div>
 <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
 <motion.div 
 initial={{ width: 0 }}
 animate={{ width: `${progressPercentage}%` }}
 transition={{ duration: 0.5, ease: "easeOut" }}
 className={`h-full rounded-full ${amountToFreeShipping === 0 ? "bg-brand-secondary" : "bg-brand-primary"}`}
 />
 </div>
 </div>
 )}

 {/* Cart Items */}
 <div className="flex-1 overflow-y-auto p-6 space-y-4">
 {items.length === 0 ? (
 <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground space-y-4">
 <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
 <ShoppingBag className="w-8 h-8 text-muted-foreground/30" />
 </div>
 <p>Your cart is currently empty.</p>
 <Button variant="outline" onClick={() => setIsOpen(false)}>
 Continue Shopping
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
 <div className="relative w-20 h-28 rounded-sm shadow-sm overflow-hidden flex-shrink-0">
 <Image src={item.coverImage} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
 <div className="absolute left-0 inset-y-0 w-1 bg-gradient-to-r from-black/20 to-transparent mix-blend-multiply" />
 </div>
 <div className="flex-1 flex flex-col justify-between py-1">
 <div className="flex justify-between items-start">
 <div>
 <h3 className="font-semibold text-card-foreground line-clamp-1 pr-2">{item.title}</h3>
 <p className="text-sm text-muted-foreground mt-0.5">{item.author}</p>
 </div>
 <button
 onClick={() => removeItem(item.id)}
 className="text-muted-foreground hover:text-red-500 p-1 -mt-1 -mr-1 transition-colors"
 >
 <Trash2 className="w-4 h-4" />
 </button>
 </div>
 <div className="flex items-center justify-between mt-auto">
 <span className="font-bold text-lg text-primary">${item.price.toFixed(2)}</span>
 
 {/* Quantity Controls */}
 <div className="flex items-center border border-border rounded-full overflow-hidden bg-muted/50">
 <button
 onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeItem(item.id)}
 className="px-2.5 py-1 text-muted-foreground hover:text-card-foreground hover:bg-muted transition-colors"
 >
 <Minus className="w-3 h-3" />
 </button>
 <span className="text-sm font-semibold w-6 text-center text-card-foreground">{item.quantity}</span>
 <button
 onClick={() => updateQuantity(item.id, item.quantity + 1)}
 className="px-2.5 py-1 text-muted-foreground hover:text-card-foreground hover:bg-muted transition-colors"
 >
 <Plus className="w-3 h-3" />
 </button>
 </div>
 </div>
 </div>
 </motion.div>
 ))}
 </AnimatePresence>
 )}
 </div>

 {/* Footer */}
 {items.length > 0 && (
 <div className="p-6 border-t border-border bg-muted/30">
 <div className="flex items-center justify-between mb-2">
 <span className="text-muted-foreground">Subtotal</span>
 <span className="text-xl font-bold text-primary">${total.toFixed(2)}</span>
 </div>
 <p className="text-sm text-muted-foreground mb-6 flex items-center gap-1.5">
 <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary" />
 Taxes and discounts calculated at checkout.
 </p>
 <Link href="/checkout" onClick={() => setIsOpen(false)}>
 <Button size="lg" className="w-full text-lg shadow-xl shadow-brand-primary/20 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-bookzen transition-all hover:-translate-y-0.5">
 Proceed to Checkout
 </Button>
 </Link>
 </div>
 )}
 </motion.div>
 </>
 )}
 </AnimatePresence>
 );
}
