"use client";

import { useState } from "react";
import { ShoppingBag, Minus, Plus, Check } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";

interface Props {
  product: {
    productId: string;
    name: string;
    price: number;
    image: string;
    stock: number;
    slug: string;
    sizes?: string[];
    color?: string;
  };
  disabled?: boolean;
}

export default function AddToCartButton({ product, disabled }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }

    addItem({
      ...product,
      quantity,
      ...(selectedSize && { size: selectedSize }),
      ...(product.color && { color: product.color }),
    });
    setAdded(true);
    toast.success(`${product.name} added to cart`);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Size selector */}
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Select Size</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                  selectedSize === size
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-purple-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Quantity selector */}
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-3 text-gray-600 hover:text-gray-900 transition"
            disabled={quantity <= 1}
          >
            <Minus size={18} />
          </button>
          <span className="px-4 py-3 font-medium text-gray-900 min-w-[3rem] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            className="px-4 py-3 text-gray-600 hover:text-gray-900 transition"
            disabled={quantity >= product.stock}
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          disabled={disabled || added}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-8 rounded-full font-medium text-lg transition ${
            added
              ? "bg-green-600 text-white"
              : disabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 text-white"
          }`}
        >
          {added ? (
            <>
              <Check size={20} /> Added to Cart
            </>
          ) : (
            <>
              <ShoppingBag size={20} /> Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
