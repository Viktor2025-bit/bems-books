"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Book } from "@prisma/client";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/store/useCart";
import { ShoppingCart, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface DealOfTheDayProps {
 book: Book;
}

export function DealOfTheDay({ book }: DealOfTheDayProps) {
 const { addItem, setIsOpen } = useCart();
 const [timeLeft, setTimeLeft] = React.useState({
 hours: 23,
 minutes: 59,
 seconds: 59,
 });

 // Mock countdown timer
 React.useEffect(() => {
 const timer = setInterval(() => {
 setTimeLeft((prev) => {
 if (prev.seconds > 0) {
 return { ...prev, seconds: prev.seconds - 1 };
 } else if (prev.minutes > 0) {
 return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
 } else if (prev.hours > 0) {
 return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
 }
 return { hours: 24, minutes: 0, seconds: 0 }; // Reset
 });
 }, 1000);

 return () => clearInterval(timer);
 }, []);

 const handleAddToCart = () => {
 addItem(book);
 setIsOpen(true);
 };

 const discountedPrice = book.price * 0.7; // 30% off deal

 return (
 <section className="py-20 bg-muted/30">
 <div className="container mx-auto px-4">
 <div className="flex flex-col md:flex-row bg-card rounded-2xl shadow-xl overflow-hidden border border-border">
 {/* Image Side */}
 <div className="w-full md:w-1/2 bg-muted p-12 flex items-center justify-center relative">
 {/* Decorative background elements */}
 <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
 <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-brand-primary blur-3xl" />
 <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-brand-secondary blur-3xl" />
 </div>
 
 <motion.div 
 initial={{ y: 10, opacity: 0 }}
 whileInView={{ y: 0, opacity: 1 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="relative w-[280px] h-[400px] shadow-2xl z-10"
 >
 <Image
 src={book.coverImage}
 alt={book.title}
 fill
 sizes="(max-width: 768px) 100vw, 50vw"
 className="object-cover rounded-sm"
 />
 <div className="absolute top-4 left-4 bg-brand-primary text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
 Save 30%
 </div>
 </motion.div>
 </div>

 {/* Content Side */}
 <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
 <div className="flex items-center gap-2 text-brand-primary mb-4">
 <Clock className="w-5 h-5" />
 <span className="font-semibold uppercase tracking-wider text-sm">Deal of the Day</span>
 </div>

 <h2 className="text-4xl md:text-5xl font-bold text-card-foreground mb-4 leading-tight">
 {book.title}
 </h2>
 
 <p className="text-xl text-muted-foreground mb-8">
 By <span className="font-medium text-card-foreground">{book.author}</span>
 </p>

 <div className="flex items-end gap-4 mb-8">
 <span className="text-4xl font-bold text-brand-primary">${discountedPrice.toFixed(2)}</span>
 <span className="text-2xl line-through text-muted-foreground mb-1">${book.price.toFixed(2)}</span>
 </div>

 {/* Countdown */}
 <div className="flex gap-4 mb-10">
 <div className="flex flex-col items-center">
 <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center text-2xl font-bold text-card-foreground shadow-inner border border-border">
 {timeLeft.hours.toString().padStart(2, '0')}
 </div>
 <span className="text-xs text-muted-foreground mt-2 uppercase tracking-wider font-medium">Hours</span>
 </div>
 <div className="text-2xl font-bold text-muted-foreground self-start mt-4">:</div>
 <div className="flex flex-col items-center">
 <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center text-2xl font-bold text-card-foreground shadow-inner border border-border">
 {timeLeft.minutes.toString().padStart(2, '0')}
 </div>
 <span className="text-xs text-muted-foreground mt-2 uppercase tracking-wider font-medium">Mins</span>
 </div>
 <div className="text-2xl font-bold text-muted-foreground self-start mt-4">:</div>
 <div className="flex flex-col items-center">
 <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center text-2xl font-bold text-brand-primary shadow-inner border border-border">
 {timeLeft.seconds.toString().padStart(2, '0')}
 </div>
 <span className="text-xs text-muted-foreground mt-2 uppercase tracking-wider font-medium">Secs</span>
 </div>
 </div>

 <div className="flex flex-col sm:flex-row gap-4">
 <Button 
 size="lg" 
 onClick={handleAddToCart}
 className="flex-1 rounded-bookzen text-lg shadow-lg hover:shadow-xl transition-all"
 >
 <ShoppingCart className="w-5 h-5 mr-2" />
 Add to Cart
 </Button>
 <Link href={`/book/${book.id}`} className="flex-1">
 <Button 
 variant="outline" 
 size="lg" 
 className="w-full rounded-bookzen border-border text-lg hover:bg-muted"
 >
 View Details
 </Button>
 </Link>
 </div>
 </div>
 </div>
 </div>
 </section>
 );
}
