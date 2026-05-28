"use client";

import * as React from "react";
import { Truck, ShieldCheck, Clock, CreditCard } from "lucide-react";

export function Features() {
 const features = [
 {
 icon: <Truck className="w-8 h-8 text-brand-primary" />,
 title: "Instant Delivery",
 description: "Get your e-books instantly via email upon purchase.",
 },
 {
 icon: <ShieldCheck className="w-8 h-8 text-brand-primary" />,
 title: "Secure Payments",
 description: "Your transactions are 100% safe and secure.",
 },
 {
 icon: <Clock className="w-8 h-8 text-brand-primary" />,
 title: "24/7 Support",
 description: "Our team is here to help you anytime, anywhere.",
 },
 {
 icon: <CreditCard className="w-8 h-8 text-brand-primary" />,
 title: "Easy Returns",
 description: "Not satisfied? Get a hassle-free refund.",
 },
 ];

 return (
 <section className="py-16 bg-white border-y border-gray-50">
 <div className="container mx-auto px-4">
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
 {features.map((feature, index) => (
 <div key={index} className="flex flex-col items-center text-center space-y-4 p-6 rounded-bookzen hover:shadow-md transition-bookzen border border-transparent hover:border-gray-50">
 <div className="w-16 h-16 rounded-full bg-bg-accent flex items-center justify-center">
 {feature.icon}
 </div>
 <h3 className="text-xl font-medium text-primary">{feature.title}</h3>
 <p className="text-gray-500 text-sm">{feature.description}</p>
 </div>
 ))}
 </div>
 </div>
 </section>
 );
}
