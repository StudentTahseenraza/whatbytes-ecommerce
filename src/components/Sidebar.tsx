// src/components/Sidebar.tsx
'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Filters {
  category: string | null;
  price: number;
}

interface SidebarProps {
  setFilters: (filters: Filters) => void;
}

export default function Sidebar({ setFilters }: SidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState(5000);

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Sports",
    "Travel",
    "Photography",
    "Wearables",
  ];

  useEffect(() => {
    const urlCategory = searchParams.get("category");
    const urlPrice = searchParams.get("price");
    setCategory(urlCategory || "All");
    setPrice(urlPrice ? parseInt(urlPrice) : 5000);
  }, [searchParams]);

  useEffect(() => {
    setFilters({ category: category === "All" ? null : category, price });
    const params = new URLSearchParams(searchParams);
    if (category !== "All") {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    params.set("price", price.toString());
    router.push(`/?${params.toString()}`, { scroll: false });
  }, [category, price, router, searchParams, setFilters]);

  return (
    <div className="w-64 h-full pt-8 pl-8 mt-4 ml-4 text-white bg-blue-700">
      <h2 className="mb-6 text-xl font-bold tracking-wide uppercase">Filters</h2>
      <div className="mb-8">
        <h3 className="mb-3 text-sm font-semibold uppercase">Category</h3>
        {categories.map((cat) => (
          <div key={cat} className="flex items-center mb-2">
            <input
              type="radio"
              id={cat}
              name="category"
              checked={category === cat}
              onChange={() => setCategory(cat)}
              className="w-4 h-4 mr-3 accent-white"
            />
            <label htmlFor={cat} className="text-sm">{cat}</label>
          </div>
        ))}
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase">Price</h3>
        <input
          title="Price"
          type="range"
          min="0"
          max="5000"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          className="w-full accent-white"
        />
        <p className="mt-2 text-sm">{price}</p>
      </div>
    </div>
  );
}