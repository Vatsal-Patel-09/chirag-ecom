"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

interface Props {
  categories: any[];
  currentCategory?: string;
  currentSort?: string;
  currentSize?: string;
  currentMinPrice?: string;
  currentMaxPrice?: string;
  searchQuery?: string;
}

const sizes = ["S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36", "38", "UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"];
const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name: A to Z" },
];

export default function ProductFilters({
  categories,
  currentCategory,
  currentSort,
  currentSize,
  currentMinPrice,
  currentMaxPrice,
  searchQuery,
}: Props) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const updateFilter = (key: string, value: string | undefined) => {
    const params = new URLSearchParams();
    if (currentCategory && key !== "category") params.set("category", currentCategory);
    if (currentSort && key !== "sort") params.set("sort", currentSort);
    if (currentSize && key !== "size") params.set("size", currentSize);
    if (currentMinPrice && key !== "minPrice") params.set("minPrice", currentMinPrice);
    if (currentMaxPrice && key !== "maxPrice") params.set("maxPrice", currentMaxPrice);
    if (searchQuery && key !== "search") params.set("search", searchQuery);

    if (value) {
      params.set(key, value);
    }

    params.delete("page");
    router.push(`/products?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push("/products");
  };

  const hasActiveFilters = currentCategory || currentSize || currentMinPrice || currentMaxPrice || searchQuery;

  const filterContent = (
    <div className="space-y-6">
      {/* Sort */}
      <div>
        <h3 className="font-semibold font-caveat text-lg text-warm-900 mb-3">Sort By</h3>
        <select
          value={currentSort || "newest"}
          onChange={(e) => updateFilter("sort", e.target.value)}
          className="w-full px-3 py-2.5 sketchy-border-light text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-warm-50"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold font-caveat text-lg text-warm-900 mb-3">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => updateFilter("category", undefined)}
            className={`block w-full text-left px-3 py-2 text-sm transition ${
              !currentCategory
                ? "bg-primary-50 text-primary-700 sketchy-border-primary font-medium"
                : "text-warm-600 hover:bg-warm-100"
            }`}
          >
            All Categories
          </button>
          {categories.map((cat: any) => (
            <button
              key={cat.slug || cat.id}
              onClick={() => updateFilter("category", cat.slug)}
              className={`block w-full text-left px-3 py-2 text-sm transition ${
                currentCategory === cat.slug
                  ? "bg-primary-50 text-primary-700 sketchy-border-primary font-medium"
                  : "text-warm-600 hover:bg-warm-100"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <h3 className="font-semibold font-caveat text-lg text-warm-900 mb-3">Size</h3>
        <select
          value={currentSize || ""}
          onChange={(e) => updateFilter("size", e.target.value || undefined)}
          className="w-full px-3 py-2.5 sketchy-border-light text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-warm-50"
        >
          <option value="">All Sizes</option>
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold font-caveat text-lg text-warm-900 mb-3">Price Range</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            defaultValue={currentMinPrice}
            onBlur={(e) => updateFilter("minPrice", e.target.value || undefined)}
            className="w-full px-3 py-2 sketchy-border-light text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-warm-50"
          />
          <input
            type="number"
            placeholder="Max"
            defaultValue={currentMaxPrice}
            onBlur={(e) => updateFilter("maxPrice", e.target.value || undefined)}
            className="w-full px-3 py-2 sketchy-border-light text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-warm-50"
          />
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="w-full py-2.5 text-sm text-red-600 hover:text-red-700 font-medium border border-red-200 sketchy-border-sm hover:bg-red-50 transition"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile filter toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2.5 sketchy-border-sm text-sm font-medium text-warm-700 hover:bg-warm-100 transition mb-4"
      >
        <SlidersHorizontal size={18} />
        Filters
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-warm-900/60"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-warm-50 sketchy-border-light p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold font-caveat">Filters</h2>
              <button onClick={() => setMobileOpen(false)}>
                <X size={24} />
              </button>
            </div>
            {filterContent}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-28">{filterContent}</div>
      </div>
    </>
  );
}
