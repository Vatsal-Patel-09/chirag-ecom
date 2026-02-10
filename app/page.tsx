'use client';

import Link from 'next/link';
import { ShoppingBag, Truck, Shield, Heart, Star, TrendingUp, Users, CreditCard } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Premium T-Shirts for Every Style
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Discover our exclusive collection of high-quality t-shirts. From casual to premium, find your perfect fit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/products"
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
              >
                Shop Now
              </Link>
              <Link
                href="/products?category=New Arrivals"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all"
              >
                New Arrivals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users className="w-12 h-12 text-purple-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">50K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <ShoppingBag className="w-12 h-12 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">60+</div>
              <div className="text-gray-600">Products</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Star className="w-12 h-12 text-yellow-500" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">4.8/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <TrendingUp className="w-12 h-12 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">100%</div>
              <div className="text-gray-600">Quality Guaranteed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide the best shopping experience with premium quality products and exceptional service
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group hover:transform hover:scale-105 transition-all">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-2xl transition-shadow">
                <Truck className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Fast Delivery</h3>
              <p className="text-gray-600 leading-relaxed">
                Get your orders delivered within 5-7 working days. Track your package in real-time.
              </p>
            </div>
            <div className="text-center group hover:transform hover:scale-105 transition-all">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-2xl transition-shadow">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">100% Secure</h3>
              <p className="text-gray-600 leading-relaxed">
                Your data is safe with us. We use industry-standard encryption for all transactions.
              </p>
            </div>
            <div className="text-center group hover:transform hover:scale-105 transition-all">
              <div className="bg-gradient-to-br from-pink-500 to-red-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-2xl transition-shadow">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Premium Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                Made from 100% cotton with superior stitching. Comfort that lasts wash after wash.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600">
              Find the perfect t-shirt for every occasion
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <Link
              href="/products?category=Casual"
              className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all transform hover:scale-105 group"
            >
              <div className="text-5xl mb-4">👕</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                Casual
              </h3>
              <p className="text-gray-600">Everyday comfort</p>
            </Link>
            <Link
              href="/products?category=Graphic"
              className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all transform hover:scale-105 group"
            >
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                Graphic
              </h3>
              <p className="text-gray-600">Express yourself</p>
            </Link>
            <Link
              href="/products?category=Sports"
              className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all transform hover:scale-105 group"
            >
              <div className="text-5xl mb-4">⚽</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                Sports
              </h3>
              <p className="text-gray-600">Active lifestyle</p>
            </Link>
            <Link
              href="/products?category=Premium"
              className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all transform hover:scale-105 group"
            >
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                Premium
              </h3>
              <p className="text-gray-600">Luxury feel</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied customers
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 hover:shadow-xl transition-shadow">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "Best quality t-shirts I've ever bought! The fabric is soft and the fit is perfect. Will definitely order more!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  AK
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">Amit Kumar</div>
                  <div className="text-sm text-gray-600">Delhi</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 hover:shadow-xl transition-shadow">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "Fast delivery and excellent customer service. The graphic prints are amazing and haven't faded after multiple washes."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                  PS
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">Priya Sharma</div>
                  <div className="text-sm text-gray-600">Mumbai</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl p-8 hover:shadow-xl transition-shadow">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "Great value for money! The premium collection is worth every penny. Highly recommended for anyone looking for quality tees."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                  RV
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">Rahul Verma</div>
                  <div className="text-sm text-gray-600">Bangalore</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment & Trust Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-12 shadow-xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Safe & Secure Shopping
              </h2>
              <p className="text-gray-600 text-lg">
                Multiple payment options for your convenience
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <CreditCard className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">All Payment Methods</h3>
                <p className="text-gray-600 text-sm">Credit Card, Debit Card, UPI, COD</p>
              </div>
              <div className="text-center">
                <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Secure Checkout</h3>
                <p className="text-gray-600 text-sm">SSL encrypted transactions</p>
              </div>
              <div className="text-center">
                <Heart className="w-16 h-16 text-pink-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">30-Day Returns</h3>
                <p className="text-gray-600 text-sm">Easy returns and exchanges</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Upgrade Your Wardrobe?
          </h2>
          <p className="text-xl mb-10 text-white/90">
            Browse our collection of premium t-shirts and find your perfect style today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-white text-purple-600 px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl inline-flex items-center justify-center"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Shop All Products
            </Link>
            <Link
              href="/products?sale=true"
              className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all inline-flex items-center justify-center"
            >
              <Star className="w-5 h-5 mr-2" />
              View Sale Items
            </Link>
          </div>
          <div className="mt-12 text-white/80">
            <p className="text-sm">
              ✨ Use code <span className="font-bold bg-white/20 px-3 py-1 rounded-full">FIRSTORDER</span> for 15% off your first purchase
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
