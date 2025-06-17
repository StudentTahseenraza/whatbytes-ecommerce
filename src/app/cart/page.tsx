// app/cart/page.tsx
'use client';

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useCart } from "../../components/CartContext";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity ?? 1), // Use ?? to provide a default of 1
    0
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full mx-auto max-w-7xl">
        <Header onSearch={handleSearch} />
        <main className="flex-1 p-6 bg-light-blue-gray">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center py-3 border-b border-gray-200"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-contain w-16 h-16 mr-4 rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                    <p className="mt-1 text-gray-800">$ {item.price}</p>
                    <div className="flex items-center mt-2">
                      <label htmlFor={`quantity-${item.id}`} className="mr-3 text-sm text-gray-800">
                        Quantity:
                      </label>
                      <input
                        id={`quantity-${item.id}`}
                        type="number"
                        min="1"
                        value={item.quantity ?? 1} // Use ?? to provide a default of 1
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
                        className="w-16 p-1 border border-gray-300 rounded focus:outline-none"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>
              ))}
              <div className="mt-6">
                <h3 className="text-xl font-bold text-gray-800">Total: $ {total}</h3>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}