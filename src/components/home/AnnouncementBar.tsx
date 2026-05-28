"use client";

import * as React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MESSAGES = [
  "🎉 Free shipping on all orders over $30 — Limited time!",
  "📚 New arrivals added weekly — Shop the latest releases",
  "✨ Use code BEMS20 at checkout for 20% off your first order",
];

export function AnnouncementBar() {
  const [visible, setVisible] = React.useState(true);
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="relative z-50 bg-primary text-white text-center text-sm py-2.5 px-10">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.3 }}
          className="font-medium tracking-wide"
        >
          {MESSAGES[index]}
        </motion.p>
      </AnimatePresence>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
