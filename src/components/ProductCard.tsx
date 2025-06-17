// components/ProductCard.tsx
'use client';

import Link from "next/link";
import { Star } from "lucide-react";
import { useCart } from "./CartContext";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
}

interface ProductCardProps {
  product: Product;
  isFeatured?: boolean;
}

export default function ProductCard({ product, isFeatured = false }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div
      className={`border border-gray-200 rounded-lg p-4 bg-white shadow-sm ${
        isFeatured ? "col-span-2 flex" : ""
      }`}
    >
      <Link href={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className={isFeatured ? "w-1/3 h-48 object-contain" : "w-full h-48 object-contain"}
        />
      </Link>
      <div className={isFeatured ? "flex-1 pl-6" : "mt-2"}>
        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
        </Link>
        <p className="mt-1 text-xl font-bold text-gray-800">$ {product.price}</p>
        {isFeatured && (
          <>
            <div className="flex my-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="mt-1 text-sm text-gray-500">Category: {product.category}</p>
          </>
        )}
        <button
          onClick={() => addToCart(product)}
          className="px-4 py-2 mt-3 text-sm font-medium text-white bg-blue-900 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}