// src/app/product/[id]/ProductDetailClient.tsx
'use client';

import { useState } from "react";
import Image from "next/image";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Star } from "lucide-react";
import { useCart } from "../../../components/CartContext";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
}

interface ProductDetailClientProps {
  product: Product; // Remove null since notFound() handles the error
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full mx-auto max-w-7xl">
        <Header onSearch={() => {}} />
        <main className="flex flex-1 p-6 bg-light-blue-gray">
          <div className="w-1/2">
            <Image
              src={product.image}
              alt={product.title}
              width={600}
              height={384}
              className="object-contain w-full rounded-lg h-96"
            />
          </div>
          <div className="w-1/2 p-6">
            <h1 className="mb-2 text-3xl font-bold text-gray-800">{product.title}</h1>
            <p className="mb-3 text-2xl font-bold text-gray-800">$ {product.price}</p>
            <p className="mb-3 text-sm text-gray-600">{product.description}</p>
            <p className="mb-3 text-sm text-gray-500">Category: {product.category}</p>
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="quantity" className="mr-3 text-sm font-medium text-gray-800">
                Quantity:
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-16 p-1 border border-gray-300 rounded focus:outline-none"
              />
            </div>
            <button
              onClick={() => {
                for (let i = 0; i < quantity; i++) addToCart(product);
              }}
              className="px-4 py-2 text-sm font-medium text-white rounded bg-deep-blue"
            >
              Add to Cart
            </button>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}