'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '../store/cart-store';
import { useWishlistStore } from '../store/wishlist-store';
import { ShoppingCart, Heart, Package, Phone, HelpCircle } from 'lucide-react';

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);
  
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

          <div className="flex items-center space-x-6">
            <Link href="/" className="text-white hover:text-blue-100 font-medium transition">
              Home
            </Link>
            <Link href="/products" className="text-white hover:text-blue-100 font-medium transition">
              Products
            </Link>
            <Link href="/orders" className="text-white hover:text-blue-100 font-medium flex items-center gap-1 transition">
              <Package className="h-4 w-4" />
              Orders
            </Link>
            <Link href="/faq" className="text-white hover:text-blue-100 font-medium flex items-center gap-1 transition">
              <HelpCircle className="h-4 w-4" />
              FAQ
            </Link>
            <Link href="/contact" className="text-white hover:text-blue-100 font-medium flex items-center gap-1 transition">
              <Phone className="h-4 w-4" />
              Contact
            </Link>
            
            <Link href="/wishlist" className="relative text-white hover:text-blue-100 transition">
              <Heart className="h-6 w-6" />
              {mounted && wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link href="/cart" className="relative text-white hover:text-blue-100 transition">
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
