// app/page.tsx
'use client';

import { useState, useEffect } from "react";
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

export default function Home() {
  const [filters, setFilters] = useState<Filters>({ category: null, price: 5000 });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    console.log("Search Query:", searchQuery);
    console.log("Filters:", filters);

    let result = products;

    if (searchQuery.trim()) {
      result = result.filter((p: Product) =>
        p.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
      );
    }

    if (filters.category) {
      result = result.filter((p: Product) => p.category === filters.category);
    }

    result = result.filter((p: Product) => p.price <= filters.price);

    console.log("Filtered Products:", result);
    setFilteredProducts(result);
  }, [filters.category, filters.price, searchQuery]);

  const handleSearch = (query: string) => {
    console.log("Handling Search:", query);
    setSearchQuery(query);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full mx-auto max-w-7xl">
        <Header onSearch={handleSearch} />
        <div className="flex flex-1">
          <Sidebar setFilters={setFilters} />
          <main className="flex-1 p-6 bg-light-blue-gray">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">Product Listing</h2>
            {filteredProducts.length === 0 ? (
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