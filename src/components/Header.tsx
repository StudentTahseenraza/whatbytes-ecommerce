// components/Header.tsx
'use client';

import Link from "next/link";
import { ShoppingCart, Search } from "lucide-react";
import { useCart } from "./CartContext";
import { useState } from "react";

interface HeaderProps {
  onSearch: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <header className="flex items-center justify-between p-4 text-white bg-blue-900">
      <Link href="/">
        <div className="text-2xl font-bold tracking-wider">LOGO</div>
      </Link>
      <div className="relative flex-1 max-w-lg mx-6">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 pl-8 text-sm text-black placeholder-gray-500 bg-white rounded focus:outline-none"
        />
        <Search className="absolute w-4 h-4 text-gray-500 transform -translate-y-1/2 left-2 top-1/2" />
      </div>
      <Link href="/cart">
        <div className="relative">
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute px-2 py-1 text-xs text-white bg-red-500 rounded-full -top-2 -right-2">
              {cartCount}
            </span>
          )}
        </div>
      </Link>
    </header>
  );
}