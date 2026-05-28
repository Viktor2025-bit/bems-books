"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check } from "lucide-react";
import { getCategories } from "@/lib/actions/books";

const PRICE_RANGES = [
 { id: "all", label: "All Prices", min: null, max: null },
 { id: "under-10", label: "Under $10", min: null, max: 10 },
 { id: "10-to-20", label: "$10 - $20", min: 10, max: 20 },
 { id: "over-20", label: "Over $20", min: 20, max: null },
];

export function FilterSidebar() {
 const router = useRouter();
 const searchParams = useSearchParams();
 const [categories, setCategories] = React.useState<{id: string, name: string}[]>([]);

 React.useEffect(() => {
 getCategories().then(setCategories);
 }, []);

 const handleCategoryChange = (value: string | null) => {
 const params = new URLSearchParams(searchParams.toString());
 if (value) {
 params.set("category", value);
 } else {
 params.delete("category");
 }
 router.push(`/catalog?${params.toString()}`);
 };

 const handlePriceChange = (min: number | null, max: number | null) => {
 const params = new URLSearchParams(searchParams.toString());
 
 if (min !== null) params.set("minPrice", min.toString());
 else params.delete("minPrice");

 if (max !== null) params.set("maxPrice", max.toString());
 else params.delete("maxPrice");

 router.push(`/catalog?${params.toString()}`);
 };

 const activeCategory = searchParams.get("category");
 const currentMinPrice = searchParams.get("minPrice");
 const currentMaxPrice = searchParams.get("maxPrice");

 // Determine active price range id based on URL params
 let activePriceId = "all";
 if (currentMaxPrice === "10") activePriceId = "under-10";
 else if (currentMinPrice === "10" && currentMaxPrice === "20") activePriceId = "10-to-20";
 else if (currentMinPrice === "20") activePriceId = "over-20";

 return (
 <aside className="w-full md:w-64 flex-shrink-0 space-y-8 pr-8">
 {/* Categories */}
 <div>
 <h3 className="text-lg font-bold mb-4 ">Categories</h3>
 <ul className="space-y-2">
 <li>
 <button
 onClick={() => handleCategoryChange(null)}
 className={`text-sm w-full text-left transition-colors flex items-center justify-between ${
 !activeCategory ? "text-brand-secondary font-semibold" : "text-gray-600 hover:text-primary"
 }`}
 >
 All
 {!activeCategory && <Check className="w-4 h-4" />}
 </button>
 </li>
 {categories.map((cat) => (
 <li key={cat.id}>
 <button
 onClick={() => handleCategoryChange(cat.id)}
 className={`text-sm w-full text-left transition-colors flex items-center justify-between ${
 activeCategory === cat.id ? "text-brand-secondary font-semibold" : "text-gray-600 hover:text-primary"
 }`}
 >
 {cat.name}
 {activeCategory === cat.id && <Check className="w-4 h-4" />}
 </button>
 </li>
 ))}
 </ul>
 </div>

 {/* Price Range */}
 <div className="pt-6 border-t border-gray-100">
 <h3 className="text-lg font-bold mb-4 ">Price Range</h3>
 <div className="space-y-3">
 {PRICE_RANGES.map((range) => (
 <label key={range.id} className="flex items-center space-x-3 cursor-pointer group">
 <div className="relative flex items-center justify-center">
 <input
 type="radio"
 name="priceRange"
 checked={activePriceId === range.id}
 onChange={() => handlePriceChange(range.min, range.max)}
 className="peer appearance-none w-4 h-4 border border-gray-300 rounded-full checked:border-brand-secondary focus:ring-1 focus:ring-brand-secondary focus:ring-offset-1 transition-all"
 />
 <div className="absolute w-2 h-2 rounded-full bg-brand-secondary opacity-0 peer-checked:opacity-100 transition-opacity" />
 </div>
 <span className={`text-sm transition-colors ${activePriceId === range.id ? "text-primary font-medium" : "text-gray-600 group-hover:text-primary"}`}>
 {range.label}
 </span>
 </label>
 ))}
 </div>
 </div>
 </aside>
 );
}
