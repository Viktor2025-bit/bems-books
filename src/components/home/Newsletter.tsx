"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function Newsletter() {
 const [email, setEmail] = React.useState("");

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 // Simulate subscription
 setEmail("");
 alert("Thanks for subscribing!");
 };

 return (
 <section className="py-20 bg-bg-soft">
 <div className="container mx-auto px-4 text-center max-w-3xl">
 <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
 Subscribe to Our Newsletter
 </h2>
 <p className="text-gray-600 mb-8">
 Stay updated with the latest releases, author interviews, and exclusive discounts. No spam, we promise.
 </p>
 <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
 <Input
 type="email"
 placeholder="Enter your email address"
 className="w-full sm:w-96 rounded-bookzen border-none bg-white py-6 px-6 shadow-sm focus-visible:ring-1 focus-visible:ring-brand-primary"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 required
 />
 <Button type="submit" size="lg" className="rounded-bookzen bg-brand-primary hover:bg-opacity-90 text-white transition-bookzen px-8 py-6 h-auto">
 Subscribe
 </Button>
 </form>
 </div>
 </section>
 );
}
