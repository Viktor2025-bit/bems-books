"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const REVIEWS = [
 {
 id: 1,
 name: "Sarah Mitchell",
 avatar: "SM",
 rating: 5,
 title: "Absolutely love this bookstore!",
 text: "The selection is incredible and delivery is lightning fast. I've already recommended Bems Books to all my reading friends. The e-book quality is top-notch!",
 date: "2 weeks ago",
 verified: true,
 },
 {
 id: 2,
 name: "James Rodriguez",
 avatar: "JR",
 rating: 5,
 title: "Best online book shopping experience",
 text: "From browsing to checkout, everything is seamless. The curated recommendations helped me discover amazing authors I never would have found on my own.",
 date: "1 month ago",
 verified: true,
 },
 {
 id: 3,
 name: "Emily Chen",
 avatar: "EC",
 rating: 4,
 title: "Great prices and fast delivery",
 text: "I switched from another platform and I'm so glad I did. The prices are better, the interface is cleaner, and my e-books are delivered instantly after purchase.",
 date: "3 weeks ago",
 verified: true,
 },
 {
 id: 4,
 name: "David Thompson",
 avatar: "DT",
 rating: 5,
 title: "A reader's paradise",
 text: "The variety of genres available is impressive. I especially love the self-help section — found some real gems that changed my daily routine.",
 date: "5 days ago",
 verified: true,
 },
 {
 id: 5,
 name: "Priya Patel",
 avatar: "PP",
 rating: 5,
 title: "Fantastic customer service",
 text: "Had an issue with a download and the team resolved it within minutes. The attention to detail and care for customers really sets Bems Books apart.",
 date: "1 week ago",
 verified: true,
 },
];

export function TestimonialsCarousel() {
 const scrollRef = React.useRef<HTMLDivElement>(null);

 const scroll = (direction: "left" | "right") => {
 if (scrollRef.current) {
 const amount = direction === "left" ? -380 : 380;
 scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
 }
 };

 return (
 <section className="py-20 bg-bg-accent">
 <div className="container mx-auto px-4">
 {/* Header */}
 <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
 <div>
 <motion.span
 initial={{ opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="inline-block text-xs font-semibold tracking-widest text-brand-primary uppercase mb-3"
 >
 Testimonials
 </motion.span>
 <motion.h2
 initial={{ opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.1 }}
 className="text-4xl font-bold text-primary"
 >
 What Our Readers Say
 </motion.h2>
 </div>
 <div className="flex space-x-2">
 <button
 onClick={() => scroll("left")}
 className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-300"
 >
 <ChevronLeft className="w-5 h-5" />
 </button>
 <button
 onClick={() => scroll("right")}
 className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-300"
 >
 <ChevronRight className="w-5 h-5" />
 </button>
 </div>
 </div>

 {/* Cards */}
 <div
 ref={scrollRef}
 className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory"
 style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
 >
 {REVIEWS.map((review, i) => (
 <motion.div
 key={review.id}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.08 }}
 className="min-w-[320px] md:min-w-[360px] snap-start bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
 >
 {/* Quote icon */}
 <Quote className="w-8 h-8 text-brand-primary/20 mb-4" />

 {/* Stars */}
 <div className="flex gap-0.5 mb-3">
 {Array.from({ length: 5 }).map((_, j) => (
 <Star
 key={j}
 className={`w-4 h-4 ${j < review.rating ? "fill-current text-brand-secondary" : "text-gray-200"}`}
 />
 ))}
 </div>

 {/* Title */}
 <h4 className="font-bold text-primary text-base mb-2">
 {review.title}
 </h4>

 {/* Text */}
 <p className="text-sm text-gray-500 leading-relaxed flex-grow mb-5">
 &ldquo;{review.text}&rdquo;
 </p>

 {/* Footer */}
 <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
 <div className="w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm flex items-center justify-center">
 {review.avatar}
 </div>
 <div className="flex-grow">
 <p className="text-sm font-semibold text-primary">
 {review.name}
 </p>
 <p className="text-xs text-gray-400">{review.date}</p>
 </div>
 {review.verified && (
 <span className="text-[10px] font-bold text-brand-secondary bg-brand-secondary/10 px-2 py-0.5 rounded-full">
 Verified
 </span>
 )}
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 </section>
 );
}
