import Link from 'next/link';
import Image from 'next/image';
import { prisma } from './lib/prisma';
import { ShoppingBag, TrendingUp, Shield, Truck } from 'lucide-react';

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 animate-fade-in">
            Welcome to T-Shirt Store
          </h1>
          <p className="text-2xl md:text-3xl mb-8 text-blue-100">
            Discover Premium Quality T-Shirts for Every Style
          </p>
          <a
            href="#products"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all shadow-xl"
          >
            Shop Now
          </a>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(249, 250, 251)"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition">
              <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Free Shipping</h3>
              <p className="text-gray-600 text-sm">On all orders over $50</p>
            </div>
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition">
              <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Secure Payment</h3>
              <p className="text-gray-600 text-sm">100% secure transactions</p>
            </div>
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition">
              <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Best Quality</h3>
              <p className="text-gray-600 text-sm">Premium fabric materials</p>
            </div>
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition">
              <div className="inline-block p-4 bg-pink-100 rounded-full mb-4">
                <ShoppingBag className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Easy Returns</h3>
              <p className="text-gray-600 text-sm">30-day return policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Collection
            </h2>
            <p className="text-xl text-gray-600">
              Explore our carefully curated selection of premium t-shirts
            </p>
          </div>
        
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-72 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {product.stock < 10 && product.stock > 0 && (
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Only {product.stock} left!
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                    <span className="text-xs text-gray-500">{product.color}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold text-blue-600">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.stock > 0 ? '✓ In Stock' : '✗ Out of Stock'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-20">
              <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-xl">
                No products available. Please seed the database.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
