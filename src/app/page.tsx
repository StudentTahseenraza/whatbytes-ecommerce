// src/app/page.tsx
'use client';

import { useState, useEffect, useMemo, Suspense } from "react"; // Import Suspense
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import products from "../data/products.json";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
}

interface Filters {
  category: string | null;
  price: number;
}

// Fallback component for Sidebar while it loads on the client
const SidebarFallback = () => (
  <div className="w-64 h-full pt-8 pl-8 mt-4 ml-4 text-white bg-deep-blue">
    <h2 className="mb-6 text-xl font-bold tracking-wide uppercase">Filters</h2>
    <p className="text-gray-300">Loading filters...</p>
  </div>
);

export default function Home() {
  const [filters, setFilters] = useState<Filters>({ category: null, price: 5000 });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isLoading, setIsLoading] = useState(false);

  const { category, price } = filters;
  const memoizedFilters = useMemo(() => ({ category, price }), [category, price]);

  useEffect(() => {
    setIsLoading(true);
    console.log("Search Query:", searchQuery);
    console.log("Filters:", memoizedFilters);

    let result = products;

    if (searchQuery.trim()) {
      result = result.filter((p: Product) =>
        p.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
      );
    }

    if (memoizedFilters.category) {
      result = result.filter((p: Product) => p.category === memoizedFilters.category);
    }

    result = result.filter((p: Product) => p.price <= memoizedFilters.price);

    console.log("Filtered Products:", result);
    setFilteredProducts(result);
    setIsLoading(false);
  }, [memoizedFilters, searchQuery]);

  const handleSearch = (query: string) => {
    console.log("Handling Search:", query);
    setSearchQuery(query);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full mx-auto max-w-7xl">
        <Header onSearch={handleSearch} />
        <div className="flex flex-1">
          <Suspense fallback={<SidebarFallback />}>
            <Sidebar setFilters={setFilters} />
          </Suspense>
          <main className="flex-1 p-6 bg-light-blue-gray">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">Product Listing</h2>
            {isLoading ? (
              <p className="text-gray-600">Loading products...</p>
            ) : filteredProducts.length === 0 ? (
              <p className="text-gray-600">No products found.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFeatured={index === filteredProducts.length - 1}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}