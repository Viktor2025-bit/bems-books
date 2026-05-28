"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const GENRES = [
 {
 name: "Fiction",
 slug: "fiction",
 count: "1,200+ books",
 image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=600&auto=format&fit=crop&crop=entropy",
 bg: "from-rose-900/80 to-rose-700/60",
 },
 {
 name: "Science Fiction",
 slug: "sci-fi",
 count: "850+ books",
 image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop&crop=entropy",
 bg: "from-indigo-900/80 to-indigo-700/60",
 },
 {
 name: "Self-Help",
 slug: "self-help",
 count: "640+ books",
 image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop&crop=entropy",
 bg: "from-emerald-900/80 to-emerald-700/60",
 },
 {
 name: "Biography",
 slug: "biography",
 count: "420+ books",
 image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop&crop=entropy",
 bg: "from-amber-900/80 to-amber-700/60",
 },
 {
 name: "Mystery",
 slug: "mystery",
 count: "730+ books",
 image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=600&auto=format&fit=crop&crop=entropy",
 bg: "from-slate-900/80 to-slate-700/60",
 },
 {
 name: "Romance",
 slug: "romance",
 count: "980+ books",
 image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop&crop=entropy",
 bg: "from-pink-900/80 to-pink-700/60",
 },
];

export function GenreGrid() {
 return (
 <section className="py-20 bg-white">
 <div className="container mx-auto px-4">
 {/* Header */}
 <div className="text-center mb-12">
 <motion.span
 initial={{ opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="inline-block text-xs font-semibold tracking-widest text-brand-primary uppercase mb-3"
 >
 Browse Collection
 </motion.span>
 <motion.h2
 initial={{ opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.1 }}
 className="text-4xl font-bold text-primary"
 >
 Shop by Genre
 </motion.h2>
 </div>

 {/* Grid */}
 <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
 {GENRES.map((genre, i) => (
 <motion.div
 key={genre.slug}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.08 }}
 >
 <Link
 href={`/catalog?category=${genre.slug}`}
 className="group relative block h-44 md:h-56 rounded-bookzen overflow-hidden"
 >
 {/* Background image */}
 <Image
 src={genre.image}
 alt={genre.name}
 fill
 sizes="(max-width: 768px) 50vw, 33vw"
 className="object-cover transition-transform duration-700 group-hover:scale-110"
 />
 {/* Gradient overlay */}
 <div className={`absolute inset-0 bg-gradient-to-t ${genre.bg} transition-opacity duration-300 group-hover:opacity-90`} />

 {/* Text */}
 <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
 <h3 className="text-xl md:text-2xl font-bold mb-1 drop-shadow-md">
 {genre.name}
 </h3>
 <span className="text-xs text-white/80 font-medium tracking-wide">
 {genre.count}
 </span>
 <span className="mt-3 text-xs font-semibold bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
 Explore →
 </span>
 </div>
 </Link>
 </motion.div>
 ))}
 </div>
 </div>
 </section>
 );
}
