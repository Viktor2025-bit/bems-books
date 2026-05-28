"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";

const FEATURED_BOOK = {
 title: "The Midnight Library",
 author: "Matt Haig",
 rating: 4.8,
 reviewCount: 12483,
 price: "$12.99",
 originalPrice: "$18.99",
 description:
 "Between life and death there is a library, and within it, every book tells the story of another possible life you could have lived. When Nora Seed finds herself in the Midnight Library, she has a chance to make things right — if she can figure out what the perfect life really looks like.",
 badges: ["Bestseller", "Staff Pick"],
 pages: 304,
 format: "EPUB & PDF",
 image:
 "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop&crop=entropy",
 coverBg: "bg-rose-50",
};

export function BookOfTheMonth() {
 return (
 <section className="py-20 bg-bg-soft overflow-hidden">
 <div className="container mx-auto px-4">
 {/* Header */}
 <div className="text-center mb-14">
 <motion.span
 initial={{ opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="inline-block text-xs font-semibold tracking-widest text-brand-primary uppercase mb-3"
 >
 Editor's Choice
 </motion.span>
 <motion.h2
 initial={{ opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.1 }}
 className="text-4xl font-bold text-primary"
 >
 Book of the Month
 </motion.h2>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
 {/* Book Cover */}
 <motion.div
 initial={{ opacity: 0, x: -40 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6, ease: "easeOut" }}
 className="flex justify-center"
 >
 <div className="relative">
 {/* Decorative circles */}
 <div className="absolute -top-8 -left-8 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl" />
 <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-brand-secondary/10 rounded-full blur-3xl" />

 {/* Book */}
 <div className="relative w-72 h-[440px] md:w-80 md:h-[480px] shadow-2xl rounded-bookzen overflow-hidden group hover:-rotate-2 hover:scale-105 transition-transform duration-500">
 <Image
 src={FEATURED_BOOK.image}
 alt={FEATURED_BOOK.title}
 fill
 sizes="(max-width: 768px) 288px, 320px"
 className="object-cover"
 priority
 />
 {/* Spine */}
 <div className="absolute left-0 inset-y-0 w-4 bg-gradient-to-r from-black/30 to-transparent" />

 {/* Badges */}
 <div className="absolute top-4 right-4 flex flex-col gap-2">
 {FEATURED_BOOK.badges.map((badge) => (
 <span
 key={badge}
 className="text-xs font-bold bg-brand-primary text-white px-3 py-1 rounded-full shadow-md"
 >
 {badge}
 </span>
 ))}
 </div>
 </div>
 </div>
 </motion.div>

 {/* Book Details */}
 <motion.div
 initial={{ opacity: 0, x: 40 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
 className="space-y-6"
 >
 {/* Rating */}
 <div className="flex items-center gap-2">
 <div className="flex text-brand-secondary">
 {Array.from({ length: 5 }).map((_, i) => (
 <Star
 key={i}
 className={`w-5 h-5 ${i < Math.floor(FEATURED_BOOK.rating) ? "fill-current" : "text-gray-200"}`}
 />
 ))}
 </div>
 <span className="text-sm text-gray-500 font-medium">
 {FEATURED_BOOK.rating} ({FEATURED_BOOK.reviewCount.toLocaleString()} reviews)
 </span>
 </div>

 {/* Title & Author */}
 <div>
 <h3 className="text-4xl md:text-5xl font-bold text-primary leading-tight mb-2">
 {FEATURED_BOOK.title}
 </h3>
 <p className="text-lg text-gray-500">
 by{" "}
 <span className="text-brand-primary font-semibold">{FEATURED_BOOK.author}</span>
 </p>
 </div>

 {/* Description */}
 <p className="text-gray-600 leading-relaxed text-base">
 {FEATURED_BOOK.description}
 </p>

 {/* Specs */}
 <div className="flex items-center gap-6 text-sm text-gray-500 border-y border-gray-100 py-4">
 <div className="flex items-center gap-2">
 <BookOpen className="w-4 h-4 text-brand-primary" />
 <span>{FEATURED_BOOK.pages} pages</span>
 </div>
 <div className="w-px h-4 bg-gray-200" />
 <span>{FEATURED_BOOK.format}</span>
 <div className="w-px h-4 bg-gray-200" />
 <span>Instant delivery</span>
 </div>

 {/* Price & CTA */}
 <div className="flex items-center gap-6">
 <div>
 <span className="text-3xl font-bold text-primary">
 {FEATURED_BOOK.price}
 </span>
 <span className="ml-2 text-base line-through text-gray-400">
 {FEATURED_BOOK.originalPrice}
 </span>
 <span className="ml-2 text-sm font-semibold text-brand-secondary bg-brand-secondary/10 px-2 py-0.5 rounded-full">
 Save 32%
 </span>
 </div>
 </div>

 <div className="flex flex-wrap gap-4">
 <Link href="/catalog">
 <Button
 size="lg"
 className="bg-brand-primary hover:bg-brand-primary/90 text-white rounded-bookzen px-8 gap-2"
 >
 Get This Book
 <ArrowRight className="w-4 h-4" />
 </Button>
 </Link>
 <Link href="/catalog">
 <Button
 variant="outline"
 size="lg"
 className="rounded-bookzen px-8 border-primary text-primary hover:bg-primary hover:text-white"
 >
 Browse All Books
 </Button>
 </Link>
 </div>
 </motion.div>
 </div>
 </div>
 </section>
 );
}
