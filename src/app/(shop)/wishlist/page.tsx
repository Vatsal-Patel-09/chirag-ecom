"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Trash2, ShoppingBag, Loader2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";

interface WishlistProduct {
  id: string;
  productId: string;
  product: {
    id: string;
    name: string;
    slug: string;
    price: string;
    compareAtPrice: string | null;
    images: string[];
    stock: number;
    sizes: string[];
    color: string | null;
  };
}

export default function WishlistPage() {
  const { data: session, status } = useSession();
  const [items, setItems] = useState<WishlistProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);
  const addToCart = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (status === "authenticated") {
      fetchWishlist();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);

  const fetchWishlist = async () => {
    try {
      const res = await fetch("/api/wishlist");
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch {
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    setRemoving(productId);
    try {
      const res = await fetch("/api/wishlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.product.id !== productId));
        toast.success("Removed from wishlist");
      }
    } catch {
      toast.error("Failed to remove item");
    } finally {
      setRemoving(null);
    }
  };

  const handleAddToCart = (product: WishlistProduct["product"]) => {
    const defaultSize = product.sizes?.[0] || "M";
    addToCart({
      productId: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.images?.[0] || "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1759595763_7509683.jpg",
      stock: product.stock,
      slug: product.slug,
      quantity: 1,
      size: defaultSize,
      color: product.color || undefined,
    });
    toast.success(`${product.name} (${defaultSize}) added to cart`);
  };

  if (status === "unauthenticated") {
    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-20 text-center">
        <Heart size={64} className="mx-auto text-warm-300 mb-6" />
        <h1 className="text-3xl font-bold font-marker text-warm-900 mb-4">Your Wishlist</h1>
        <p className="text-warm-500 mb-8">Sign in to save your favourite items</p>
        <Link
          href="/login"
          className="inline-block sketchy-border bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 font-medium transition"
        >
          Sign In
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-20 text-center">
        <Loader2 size={40} className="mx-auto text-primary-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <nav className="flex items-center gap-2 text-sm text-warm-500 font-caveat mb-6">
        <Link href="/" className="hover:text-primary-600 transition">Home</Link>
        <span>~&gt;</span>
        <span className="text-warm-900">Wishlist</span>
      </nav>

      <h1 className="text-3xl font-bold font-marker text-warm-900 mb-8">
        My Wishlist ({items.length})
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <Heart size={64} className="mx-auto text-warm-300 mb-6" />
          <p className="text-warm-500 text-lg mb-6">Your wishlist is empty</p>
          <Link
            href="/products"
            className="inline-block sketchy-border bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 font-medium transition"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((item) => {
            const product = item.product;
            const imageUrl = product.images?.[0] || "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1759595763_7509683.jpg";
            const price = parseFloat(product.price);
            const comparePrice = product.compareAtPrice
              ? parseFloat(product.compareAtPrice)
              : null;

            return (
              <div key={item.id} className="group relative">
                <Link href={`/products/${product.slug}`}>
                  <div className="relative aspect-square sketchy-border-light overflow-hidden bg-warm-100 mb-3">
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {comparePrice && (
                      <span className="absolute top-3 left-3 cartoon-badge bg-primary-500 text-white text-xs px-2 py-1 font-medium">
                        Sale
                      </span>
                    )}
                  </div>
                  <h3 className="font-medium text-warm-900 group-hover:text-primary-600 transition line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-warm-900">{formatPrice(price)}</span>
                    {comparePrice && (
                      <span className="text-warm-400 line-through text-sm">
                        {formatPrice(comparePrice)}
                      </span>
                    )}
                  </div>
                </Link>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 flex items-center justify-center gap-1.5 sketchy-border-sm bg-primary-600 hover:bg-primary-700 text-white text-sm py-2 font-medium transition"
                  >
                    <ShoppingBag size={16} /> Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    disabled={removing === product.id}
                    className="p-2 border-warm-200 text-warm-400 hover:text-red-500 sketchy-border-sm transition"
                  >
                    {removing === product.id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
