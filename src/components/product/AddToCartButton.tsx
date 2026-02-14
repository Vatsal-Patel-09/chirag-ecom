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
      size: selectedSize || product.sizes?.[0] || "One Size",
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
          <p className="text-sm font-medium text-warm-700 font-caveat text-base mb-2">Select Size</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 text-sm font-medium border transition sketchy-border-sm ${
                  selectedSize === size
                    ? "bg-primary-600 text-white border-primary-600"
                    : "bg-warm-50 text-warm-700 border-warm-300 hover:border-primary-400"
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
        <div className="flex items-center sketchy-border-light">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-3 text-warm-600 hover:text-warm-900 transition"
            disabled={quantity <= 1}
          >
            <Minus size={18} />
          </button>
          <span className="px-4 py-3 font-medium text-warm-900 min-w-[3rem] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            className="px-4 py-3 text-warm-600 hover:text-warm-900 transition"
            disabled={quantity >= product.stock}
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          disabled={disabled || added}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-8 font-medium text-lg transition ${
            added
              ? "bg-accent-600 text-white sketchy-border"
              : disabled
              ? "bg-warm-300 text-warm-500 cursor-not-allowed"
              : "sketchy-border bg-primary-600 hover:bg-primary-700 text-white sketch-shadow-primary"
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
