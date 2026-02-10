'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '../store/cart-store';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();

  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
            <ShoppingBag className="h-32 w-32 text-gray-300 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 text-lg mb-8">Add some awesome t-shirts to your cart!</p>
            <Link
              href="/"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg"
            >
              Continue Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {items.map((item, index) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className={`flex items-center gap-6 p-6 ${index !== items.length - 1 ? 'border-b' : ''}`}
                >
                  {/* Product Image */}
                  <div className="relative h-28 w-28 flex-shrink-0 rounded-xl overflow-hidden shadow-md">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Color:</span> {item.color} | <span className="font-medium">Size:</span> {item.size}
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="p-2 rounded-lg hover:bg-white transition shadow-sm"
                      >
                        <Minus className="h-4 w-4 text-gray-700" />
                      </button>
                      <span className="text-lg font-bold w-10 text-center text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="p-2 rounded-lg hover:bg-white transition shadow-sm"
                      >
                        <Plus className="h-4 w-4 text-gray-700" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id, item.size)}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={clearCart}
              className="mt-4 text-red-600 hover:text-red-700 font-semibold hover:underline"
            >
              Clear Entire Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8 sticky top-24">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-lg text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold">Free</span>
                </div>
                <div className="border-t-2 border-gray-300 pt-4 flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg mb-3"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/"
                className="block w-full border-2 border-gray-300 text-gray-700 text-center py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
