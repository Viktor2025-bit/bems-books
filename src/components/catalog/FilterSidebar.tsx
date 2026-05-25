"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check } from "lucide-react";
import { getCategories } from "@/lib/actions/books";

export function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = React.useState<{id: string, name: string}[]>([]);

  React.useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleFilterChange = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/catalog?${params.toString()}`);
  };

  const activeCategory = searchParams.get("category");

  return (
    <aside className="w-full md:w-64 flex-shrink-0 space-y-8 pr-8">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-bold mb-4 font-jost">Categories</h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => handleFilterChange("category", null)}
              className={`text-sm w-full text-left transition-colors flex items-center justify-between ${
                !activeCategory ? "text-highlight font-semibold" : "text-gray-600 hover:text-primary"
              }`}
            >
              All
              {!activeCategory && <Check className="w-4 h-4" />}
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => handleFilterChange("category", cat.id)}
                className={`text-sm w-full text-left transition-colors flex items-center justify-between ${
                  activeCategory === cat.id ? "text-highlight font-semibold" : "text-gray-600 hover:text-primary"
                }`}
              >
                {cat.name}
                {activeCategory === cat.id && <Check className="w-4 h-4" />}
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
