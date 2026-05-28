"use client";

import * as React from "react";
import { Book } from "@prisma/client";
import { BookCard } from "@/components/catalog/BookCard";
import { motion, AnimatePresence } from "framer-motion";

interface CategoryTab {
 id: string;
 label: string;
 books: Book[];
}

interface TabbedProductsProps {
 categories: CategoryTab[];
 title?: string;
}

export function TabbedProducts({ categories, title = "Discover Our Books" }: TabbedProductsProps) {
 const [activeTab, setActiveTab] = React.useState(categories[0]?.id || "");

 const activeBooks = React.useMemo(() => {
 const category = categories.find((c) => c.id === activeTab);
 return category?.books || [];
 }, [activeTab, categories]);

 if (categories.length === 0) return null;

 return (
 <section className="py-20 bg-background">
 <div className="container mx-auto px-4">
 <div className="text-center mb-12">
 <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-8">
 {title}
 </h2>
 
 {/* Tabs Navigation */}
 <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
 {categories.map((category) => (
 <button
 key={category.id}
 onClick={() => setActiveTab(category.id)}
 className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 relative ${
 activeTab === category.id
 ? "text-white"
 : "text-muted-foreground hover:text-card-foreground hover:bg-muted"
 }`}
 >
 {activeTab === category.id && (
 <motion.div
 layoutId="activeTabPill"
 className="absolute inset-0 bg-primary rounded-full z-0"
 transition={{ type: "spring", stiffness: 300, damping: 25 }}
 />
 )}
 <span className="relative z-10">{category.label}</span>
 </button>
 ))}
 </div>
 </div>

 {/* Tab Content Grid */}
 <div className="min-h-[400px]">
 <AnimatePresence mode="wait">
 <motion.div
 key={activeTab}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -20 }}
 transition={{ duration: 0.3 }}
 className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
 >
 {activeBooks.map((book) => (
 <BookCard key={book.id} book={book} />
 ))}
 </motion.div>
 </AnimatePresence>
 </div>
 </div>
 </section>
 );
}
