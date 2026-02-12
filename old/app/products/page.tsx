'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, SlidersHorizontal, Heart, X } from 'lucide-react';
import { useWishlistStore } from '../store/wishlist-store';
import toast, { Toaster } from 'react-hot-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  subcategory: string | null;
  color: string;
  size: string[];
  stock: number;
  inStock: boolean;
  rating: number;
  reviews: number;
  isNew: boolean;
  isSale: boolean;
  discount: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [showOutOfStock, setShowOutOfStock] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  
  const { addItem, isInWishlist, removeItem } = useWishlistStore();

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...products];

    // Search
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.color.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Sizes
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(p => 
        p.size.some(s => selectedSizes.includes(s))
      );
    }

    // Colors
    if (selectedColors.length > 0) {
      filtered = filtered.filter(p => 
        selectedColors.includes(p.color)
      );
    }

    // Price range
    filtered = filtered.filter(p => {
      const price = p.isSale ? p.price * (1 - p.discount / 100) : p.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Out of stock
    if (!showOutOfStock) {
      filtered = filtered.filter(p => p.inStock);
    }

    // Sort
    switch (sortBy) {
      case 'priceLow':
        filtered.sort((a, b) => {
          const priceA = a.isSale ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.isSale ? b.price * (1 - b.discount / 100) : b.price;
          return priceA - priceB;
        });
        break;
      case 'priceHigh':
        filtered.sort((a, b) => {
          const priceA = a.isSale ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.isSale ? b.price * (1 - b.discount / 100) : b.price;
          return priceB - priceA;
        });
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        // Already in newest order from API
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, selectedSizes, selectedColors, priceRange, showOutOfStock, sortBy]);

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  const allColors = ['Black', 'White', 'Navy', 'Gray', 'Red', 'Blue', 'Green', 'Pink', 'Purple', 'Yellow', 'Orange', 'Burgundy', 'Olive', 'Teal', 'Coral'];
  const categories = ['All', 'Men', 'Women', 'Unisex', 'Kids'];

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 100]);
    setShowOutOfStock(false);
    setSortBy('newest');
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeItem(product.id);
      toast.success('Removed from wishlist');
    } else {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color: product.color,
        category: product.category,
      });
      toast.success('Added to wishlist');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-900 font-semibold">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Our Collection</h1>
          <p className="text-lg">Discover {products.length} amazing t-shirts</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Sort */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none bg-white text-gray-900 placeholder:text-gray-500"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden bg-purple-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-purple-700"
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none bg-white text-gray-900"
          >
            <option value="newest">Newest First</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 space-y-6`}>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-gray-900">Filters</h3>
                <button onClick={clearFilters} className="text-sm text-purple-600 hover:underline font-medium">
                  Clear All
                </button>
              </div>

              {/* Category */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-gray-900">Category</h4>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                        className="text-purple-600"
                      />
                      <span className="text-gray-700 font-medium">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-gray-900">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {allSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`px-3 py-1 rounded border-2 transition font-medium ${
                        selectedSizes.includes(size)
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'border-gray-300 hover:border-purple-600 text-gray-700 bg-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-gray-900">Color</h4>
                <div className="flex flex-wrap gap-2">
                  {allColors.map(color => (
                    <button
                      key={color}
                      onClick={() => toggleColor(color)}
                      className={`px-3 py-1 rounded border-2 text-sm transition font-medium ${
                        selectedColors.includes(color)
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'border-gray-300 hover:border-purple-600 text-gray-700 bg-white'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-gray-900">Price Range</h4>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>$0</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Stock */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showOutOfStock}
                    onChange={(e) => setShowOutOfStock(e.target.checked)}
                    className="text-purple-600"
                  />
                  <span className="text-gray-700 font-medium">Include Out of Stock</span>
                </label>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4 text-sm text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your filters</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-purple-600 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => {
                  const finalPrice = product.isSale
                    ? product.price * (1 - product.discount / 100)
                    : product.price;

                  return (
                    <div
                      key={product.id}
                      className={`group bg-white rounded-lg shadow hover:shadow-xl transition relative ${
                        !product.inStock ? 'opacity-60' : ''
                      }`}
                    >
                      {/* Badges */}
                      <div className="absolute top-2 left-2 z-10 space-y-1">
                        {product.isNew && (
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded block w-fit">
                            NEW
                          </span>
                        )}
                        {product.isSale && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded block w-fit">
                            SALE {product.discount}%
                          </span>
                        )}
                        {!product.inStock && (
                          <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded block w-fit">
                            OUT OF STOCK
                          </span>
                        )}
                      </div>

                      {/* Wishlist Button */}
                      <button
                        onClick={() => toggleWishlist(product)}
                        className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow hover:scale-110 transition"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            isInWishlist(product.id)
                              ? 'fill-red-500 text-red-500'
                              : 'text-gray-400'
                          }`}
                        />
                      </button>

                      <Link href={`/products/${product.id}`}>
                        <div className={`relative h-64 ${!product.inStock ? 'blur-sm' : ''}`}>
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover rounded-t-lg"
                          />
                        </div>

                        <div className="p-4">
                          <h3 className="font-bold text-lg mb-1 line-clamp-1">{product.name}</h3>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-yellow-400">★</span>
                            <span className="text-sm">{product.rating}</span>
                            <span className="text-sm text-gray-500">({product.reviews})</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {product.isSale ? (
                              <>
                                <span className="text-xl font-bold text-purple-600">
                                  ${finalPrice.toFixed(2)}
                                </span>
                                <span className="text-sm text-gray-500 line-through">
                                  ${product.price.toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <span className="text-xl font-bold text-purple-600">
                                ${product.price.toFixed(2)}
                              </span>
                            )}
                          </div>

                          <div className="mt-2 text-xs text-gray-500">
                            {product.category} • {product.color} • Stock: {product.stock}
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
