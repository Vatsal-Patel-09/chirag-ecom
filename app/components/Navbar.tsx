'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '../store/cart-store';
import { ShoppingCart } from 'lucide-react';

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  
  // Calculate total items from the items array
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingCart className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold text-white">T-Shirt Store</span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-white hover:text-blue-100 font-medium transition"
            >
              Home
            </Link>
            <Link
              href="/cart"
              className="relative flex items-center space-x-1 text-white hover:text-blue-100 font-medium transition"
            >
              <ShoppingCart className="h-6 w-6" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
