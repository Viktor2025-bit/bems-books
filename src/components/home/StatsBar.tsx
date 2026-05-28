"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, Star, Truck } from "lucide-react";

const STATS = [
 {
 icon: BookOpen,
 value: "10,000+",
 label: "E-Books Available",
 color: "text-brand-primary",
 bg: "bg-brand-primary/10",
 },
 {
 icon: Users,
 value: "50,000+",
 label: "Happy Readers",
 color: "text-brand-secondary",
 bg: "bg-brand-secondary/10",
 },
 {
 icon: Star,
 value: "4.9 ★",
 label: "Average Rating",
 color: "text-amber-500",
 bg: "bg-amber-50",
 },
 {
 icon: Truck,
 value: "Instant",
 label: "Digital Delivery",
 color: "text-indigo-500",
 bg: "bg-indigo-50",
 },
];

export function StatsBar() {
 return (
 <section className="py-14 bg-white border-y border-gray-100">
 <div className="container mx-auto px-4">
 <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
 {STATS.map((stat, i) => (
 <motion.div
 key={stat.label}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.1 }}
 className="flex flex-col items-center text-center group"
 >
 <div
 className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
 >
 <stat.icon className={`w-6 h-6 ${stat.color}`} />
 </div>
 <span className="text-3xl md:text-4xl font-bold text-primary mb-1">
 {stat.value}
 </span>
 <span className="text-sm text-gray-500 font-medium">
 {stat.label}
 </span>
 </motion.div>
 ))}
 </div>
 </div>
 </section>
 );
}
