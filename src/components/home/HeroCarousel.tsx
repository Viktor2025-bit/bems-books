"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const FEATURED_BOOKS = [
  {
    id: 1,
    title: "The Art of Simplicity",
    author: "Elena Rossi",
    description: "Discover how living with less can bring more joy, focus, and clarity to your everyday life.",
    price: "$14.99",
    bgColor: "bg-[#F3F4F6]",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Midnight in Tokyo",
    author: "Kenji Sato",
    description: "A gripping mystery thriller set in the neon-lit streets of modern Tokyo.",
    price: "$19.99",
    bgColor: "bg-[#E5E7EB]",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Design Systems",
    author: "Sarah Drasner",
    description: "A comprehensive guide to building modern, scalable design systems for the web.",
    price: "$29.99",
    bgColor: "bg-[#F9FAFB]",
    cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    description: "A shocking psychological thriller of a woman's act of violence against her husband.",
    price: "$21.99",
    bgColor: "bg-[#F3F4F6]",
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Atomic Habits",
    author: "James Clear",
    description: "No matter your goals, Atomic Habits offers a proven framework for improving every day.",
    price: "$16.99",
    bgColor: "bg-[#E5E7EB]",
    cover: "https://images.unsplash.com/photo-1522407183863-c0bf2256188c?q=80&w=800&auto=format&fit=crop",
  }
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) return FEATURED_BOOKS.length - 1;
      if (next >= FEATURED_BOOKS.length) return 0;
      return next;
    });
  };

  // Auto-play
  React.useEffect(() => {
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, []);

  const current = FEATURED_BOOKS[currentIndex];

  return (
    <div className="relative w-full h-[600px] overflow-hidden flex items-center pt-20">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className={`absolute inset-0 flex items-center justify-center ${current.bgColor}`}
        >
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full pt-12">
            {/* Text Content */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-highlight uppercase bg-highlight/10 rounded-full"
              >
                Featured Release
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              >
                {current.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-600 max-w-lg"
              >
                {current.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center space-x-4 pt-4"
              >
                <Button size="lg" className="rounded-full px-8">
                  Buy Now - {current.price}
                </Button>
                <Button variant="outline" size="lg" className="rounded-full px-8 bg-white/50 backdrop-blur-sm">
                  Read Preview
                </Button>
              </motion.div>
            </div>

            {/* Book Cover */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              className="relative hidden md:block perspective-1000"
            >
              <div className="relative w-72 h-[450px] mx-auto shadow-2xl group hover:-translate-y-4 transition-transform duration-500 rounded-r-xl overflow-hidden">
                <Image
                  src={current.cover}
                  alt={current.title}
                  fill
                  className="object-cover"
                />
                {/* Book spine effect */}
                <div className="absolute left-0 inset-y-0 w-4 bg-gradient-to-r from-black/20 to-transparent z-10 mix-blend-multiply" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/80 backdrop-blur-sm"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/80 backdrop-blur-sm"
          onClick={() => paginate(1)}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
