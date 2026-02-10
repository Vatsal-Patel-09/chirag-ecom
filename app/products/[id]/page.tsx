'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/app/store/cart-store';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  size: string[];
  color: string;
  stock: number;
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    if (!resolvedParams) return;

    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/${resolvedParams!.id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
          if (data.size.length > 0) {
            setSelectedSize(data.size[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [resolvedParams]);

  const handleAddToCart = () => {
    if (product && selectedSize) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
        color: product.color,
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <Link href="/" className="text-blue-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 font-medium group"
        >
          <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 lg:p-12">
            {/* Product Image */}
            <div className="relative h-96 md:h-full min-h-[500px] rounded-2xl overflow-hidden shadow-lg group">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              <div className="mb-4">
                <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {product.category}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                {product.name}
              </h1>
              
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
                ${product.price.toFixed(2)}
              </div>

              <p className="text-gray-700 text-lg mb-8 leading-relaxed">{product.description}</p>

              <div className="mb-8 space-y-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm font-semibold text-gray-700 mr-3 min-w-[80px]">Color:</span>
                  <span className="text-sm text-gray-900 font-medium">{product.color}</span>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm font-semibold text-gray-700 mr-3 min-w-[80px]">Stock:</span>
                  <span className={`text-sm font-bold ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-orange-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                  </span>
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <label className="block text-lg font-bold text-gray-900 mb-4">
                  Select Size
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.size.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 border-2 rounded-lg font-medium transition-all ${
                        selectedSize === size
                          ? 'border-blue-600 bg-blue-600 text-white shadow-lg scale-105'
                          : 'border-gray-400 bg-white text-gray-700 hover:border-blue-400 hover:shadow-md'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`w-full py-5 px-6 rounded-xl font-bold text-white text-lg transition-all flex items-center justify-center space-x-3 shadow-lg ${
                  product.stock === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : added
                    ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105'
                }`}
              >
                {added ? (
                  <>
                    <Check className="h-6 w-6" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-6 w-6" />
                    <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                  </>
                )}
              </button>

              {added && (
                <Link
                  href="/cart"
                  className="mt-4 w-full py-4 px-6 rounded-xl font-semibold text-blue-600 border-2 border-blue-600 hover:bg-blue-50 transition text-center"
                >
                  View Cart & Checkout
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
