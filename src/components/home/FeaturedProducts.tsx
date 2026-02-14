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
      { id: "1", name: "Stranger Things: Upside Down", slug: "stranger-things-upside-down-spray-men-oversized-tshirt", price: "849", compareAtPrice: "899", images: ["https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1759595763_7509683.jpg"], isFeatured: true },
      { id: "2", name: "Cotton Linen: Deep Blue", slug: "solids-blue-men-cotton-linen-shirts", price: "1399", compareAtPrice: "1499", images: ["https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1730352766_5470975.jpg"], isFeatured: true },
      { id: "3", name: "Stranger Things: Hawkins High", slug: "stranger-things-hawkins-men-oversized-polo", price: "1399", compareAtPrice: "1499", images: ["https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1769236936_2776330.jpg"], isFeatured: true },
      { id: "4", name: "UBZ Convertible: Luminous", slug: "ubz-convertible-glow-in-dark-men-high-top-sneakers", price: "3299", compareAtPrice: "3499", images: ["https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1770964536_9754011.jpg"], isFeatured: true },
      { id: "5", name: "Holiday Print: Tropical Vibes", slug: "holiday-shirt-tropical-vibes", price: "1299", compareAtPrice: "1399", images: ["https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1753098937_4780598.jpg"], isFeatured: true },
      { id: "6", name: "Cargo Jeans: Washed Black", slug: "cargo-jeans-washed-black", price: "1999", compareAtPrice: "2199", images: ["https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1757572640_6478293.jpg"], isFeatured: true },
      { id: "7", name: "Nomad: Phoenix", slug: "super-oversized-t-shirts-nomad-phoenix", price: "1899", compareAtPrice: "1999", images: ["https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1769075509_6135520.jpg"], isFeatured: true },
      { id: "8", name: "Bomber Jacket: Midnight Black", slug: "bomber-jacket-midnight-black", price: "2499", compareAtPrice: "2799", images: ["https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1753098843_9517382.jpg"], isFeatured: true },
    ];
  }

  return (
    <section className="py-16 bg-warm-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-warm-900 mb-3 font-marker hand-underline inline-block">
            Our Bestsellers
          </h2>
          <p className="text-warm-500 font-caveat text-lg max-w-2xl mx-auto mt-4">
            Handpicked favourites loved by our customers
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => {
            const imageUrl = Array.isArray(product.images) && product.images.length > 0
              ? product.images[0]
              : "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1759595763_7509683.jpg";
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
                  <span className="font-bold text-warm-900 hand-circle">
                    {formatPrice(price)}
                  </span>
                  {comparePrice && (
                    <span className="text-warm-400 line-through text-sm">
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
            className="sketchy-border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white sketch-shadow-sm px-8 py-3 font-medium transition inline-block"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
