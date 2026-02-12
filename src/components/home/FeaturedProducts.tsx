import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { products, categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { formatPrice } from "@/lib/utils";

export default async function FeaturedProducts() {
  let featuredProducts: any[] = [];
  
  try {
    featuredProducts = await db
      .select()
      .from(products)
      .where(eq(products.isFeatured, true))
      .limit(8);
  } catch {
    // DB not connected yet, use placeholder data
    featuredProducts = [
      { id: "1", name: "Classic Black Crew Neck", slug: "classic-black-crew-neck", price: "24.99", compareAtPrice: null, images: ["/images/product/1.jpg"], isFeatured: true },
      { id: "2", name: "White Essential Tee", slug: "white-essential-tee", price: "22.99", compareAtPrice: null, images: ["/images/product/3.jpg"], isFeatured: true },
      { id: "3", name: "Navy Blue Henley", slug: "navy-blue-henley", price: "29.99", compareAtPrice: null, images: ["/images/product/5.jpg"], isFeatured: true },
      { id: "4", name: "Burgundy Premium Tee", slug: "burgundy-premium-tee", price: "34.99", compareAtPrice: null, images: ["/images/product/12.jpg"], isFeatured: true },
      { id: "5", name: "Blush Pink Relaxed Fit", slug: "blush-pink-relaxed-fit", price: "26.99", compareAtPrice: null, images: ["/images/product/18.jpg"], isFeatured: true },
      { id: "6", name: "Heavyweight Black Tee", slug: "heavyweight-black-tee", price: "34.99", compareAtPrice: null, images: ["/images/product/36.jpg"], isFeatured: true },
      { id: "7", name: "Dri-Fit Training Tee", slug: "dri-fit-training-tee", price: "34.99", compareAtPrice: null, images: ["/images/product/49.jpg"], isFeatured: true },
      { id: "8", name: "Pima Cotton Luxury Tee", slug: "pima-cotton-luxury-tee", price: "49.99", compareAtPrice: null, images: ["/images/product/3.jpg"], isFeatured: true },
    ];
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Our Bestsellers
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Handpicked favourites loved by our customers
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => {
            const imageUrl = Array.isArray(product.images) && product.images.length > 0
              ? product.images[0]
              : "/images/product/1.jpg";
            const price = typeof product.price === "string" ? parseFloat(product.price) : product.price;
            const comparePrice = product.compareAtPrice
              ? typeof product.compareAtPrice === "string"
                ? parseFloat(product.compareAtPrice)
                : product.compareAtPrice
              : null;
            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-3">
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {comparePrice && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Sale
                    </span>
                  )}
                </div>
                <h3 className="font-medium text-gray-900 group-hover:text-purple-600 transition line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold text-gray-900">
                    {formatPrice(price)}
                  </span>
                  {comparePrice && (
                    <span className="text-gray-400 line-through text-sm">
                      {formatPrice(comparePrice)}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-block border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-3 rounded-full font-medium transition"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
