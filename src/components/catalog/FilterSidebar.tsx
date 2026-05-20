"use client";

import * as React from "react";
import { Check } from "lucide-react";

const CATEGORIES = ["All", "Fiction", "Non-Fiction", "Mystery", "Sci-Fi & Fantasy", "Romance", "Biography", "Business"];

export function FilterSidebar() {
  const [activeCategory, setActiveCategory] = React.useState("All");

  return (
    <aside className="w-full md:w-64 flex-shrink-0 space-y-8 pr-8">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-bold mb-4 font-jost">Categories</h3>
        <ul className="space-y-2">
          {CATEGORIES.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => setActiveCategory(cat)}
                className={`text-sm w-full text-left transition-colors flex items-center justify-between ${
                  activeCategory === cat ? "text-highlight font-semibold" : "text-gray-600 hover:text-primary"
                }`}
              >
                {cat}
                {activeCategory === cat && <Check className="w-4 h-4" />}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range Placeholder */}
      <div className="pt-6 border-t border-gray-100">
        <h3 className="text-lg font-bold mb-4 font-jost">Price Range</h3>
        <div className="space-y-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="rounded text-highlight focus:ring-highlight border-gray-300" />
            <span className="text-sm text-gray-600">Under $10</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="rounded text-highlight focus:ring-highlight border-gray-300" />
            <span className="text-sm text-gray-600">$10 - $20</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="rounded text-highlight focus:ring-highlight border-gray-300" />
            <span className="text-sm text-gray-600">Over $20</span>
          </label>
        </div>
      </div>
    </aside>
  );
}
