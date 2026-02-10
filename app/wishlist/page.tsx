'use client';

import { useWishlistStore } from '../store/wishlist-store';
import { useCartStore } from '../store/cart-store';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ShoppingCart } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();

  const moveToCart = (item: any) => {
    addItem({ ...item, quantity: 1, size: 'M' });
    removeItem(item.id);
    toast.success('Moved to cart!');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Toaster />
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
          <Link href="/products" className="bg-purple-600 text-white px-6 py-3 rounded-lg">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Toaster />
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">My Wishlist ({items.length})</h1>
          <button onClick={clearWishlist} className="text-red-600 hover:underline">
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow p-4">
              <Image src={item.image} alt={item.name} width={300} height={300} className="rounded" />
              <h3 className="font-bold mt-4">{item.name}</h3>
              <p className="text-purple-600 font-bold">${item.price.toFixed(2)}</p>
              <div className="flex gap-2 mt-4">
                <button onClick={() => moveToCart(item)} className="flex-1 bg-purple-600 text-white py-2 rounded flex items-center justify-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
                <button onClick={() => removeItem(item.id)} className="bg-red-600 text-white p-2 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
