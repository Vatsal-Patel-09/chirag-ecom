import { db } from "@/lib/db";
import { products, categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import ProductGalleryClient from "@/components/product/ProductGallery";
import AddToCartButton from "@/components/product/AddToCartButton";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.slug, slug))
      .limit(1);
    if (!product) return { title: "Product Not Found" };
    return {
      title: product.name,
      description: product.description.slice(0, 160),
    };
  } catch {
    return { title: "Product" };
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  let product: any = null;
  let category: any = null;
  let relatedProducts: any[] = [];

  try {
    const [foundProduct] = await db
      .select()
      .from(products)
      .where(eq(products.slug, slug))
      .limit(1);

    if (!foundProduct) notFound();
    product = foundProduct;

    if (product.categoryId) {
      const [cat] = await db
        .select()
        .from(categories)
        .where(eq(categories.id, product.categoryId))
        .limit(1);
      category = cat;

      relatedProducts = await db
        .select()
        .from(products)
        .where(eq(products.categoryId, product.categoryId))
        .limit(4);
      relatedProducts = relatedProducts.filter((p: any) => p.id !== product.id);
    }
  } catch {
    // Fallback for when DB not connected
    product = {
      id: "fallback",
      name: "Stranger Things: Upside Down",
      slug: slug,
      description:
        "Premium oversized t-shirt with a relaxed drop-shoulder fit. Made from 100% cotton with 240 GSM fabric weight for a structured drape. Features ribbed crew neck and side-seam construction.",
      price: "849",
      compareAtPrice: "899",
      images: [
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1759595763_7509683.jpg",
      ],
      stock: 50,
      material: "100% Cotton, 240 GSM",
      sizes: ["S", "M", "L", "XL", "XXL"],
      color: "Multi",
      isFeatured: true,
      categoryId: "1",
    };
    category = { name: "T-Shirts", slug: "t-shirts" };
    relatedProducts = [
      {
        id: "2",
        name: "Deadpool: Samurai",
        slug: "deadpool-samurai-men-oversized-tshirts",
        price: "849",
        images: ["https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1756032069_5891792.jpg"],
      },
      {
        id: "3",
        name: "Gojo: After Dark",
        slug: "jujutsu-kaisen-gojo-after-dark-men-oversized-tshirt",
        price: "849",
        images: ["https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1763961989_3714652.jpg"],
      },
      {
        id: "4",
        name: "Iron Man: Armored Avenger",
        slug: "iron-man-armoured-avenger-men-oversized-tshirts",
        price: "849",
        images: ["https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1769075396_5416099.jpg"],
      },
    ];
  }

  const productImages: string[] = Array.isArray(product.images)
    ? product.images
    : ["https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1759595763_7509683.jpg"];
  const price =
    typeof product.price === "string"
      ? parseFloat(product.price)
      : product.price;
  const comparePrice = product.compareAtPrice
    ? typeof product.compareAtPrice === "string"
      ? parseFloat(product.compareAtPrice)
      : product.compareAtPrice
    : null;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-warm-500 font-caveat mb-6 sm:mb-8 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-primary-600 transition">
          Home
        </Link>
        <span>~&gt;</span>
        <Link href="/products" className="hover:text-primary-600 transition">
          Shop
        </Link>
        {category && (
          <>
            <span>~&gt;</span>
            <Link
              href={`/products?category=${category.slug}`}
              className="hover:text-primary-600 transition"
            >
              {category.name}
            </Link>
          </>
        )}
        <span>~&gt;</span>
        <span className="text-warm-900">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Product Gallery */}
        <ProductGalleryClient images={productImages} name={product.name} />

        {/* Product Info */}
        <div>
          {product.isFeatured && (
            <span className="inline-block cartoon-badge bg-secondary-200 text-warm-800 text-xs font-medium px-3 py-1 mb-3">
              Bestseller
            </span>
          )}
          <h1 className="text-3xl md:text-4xl font-bold font-marker text-warm-900 mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-warm-900 hand-circle">
              {formatPrice(price)}
            </span>
            {comparePrice && (
              <>
                <span className="text-xl text-warm-400 line-through">
                  {formatPrice(comparePrice)}
                </span>
                <span className="cartoon-badge bg-primary-100 text-primary-700 text-sm font-medium px-2 py-0.5">
                  {Math.round(((comparePrice - price) / comparePrice) * 100)}%
                  OFF
                </span>
              </>
            )}
          </div>

          <p className="text-warm-600 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8">
            {product.material && (
              <div className="bg-warm-100 p-4 sketchy-border-light">
                <p className="text-sm text-warm-500 font-caveat">Material</p>
                <p className="font-medium text-warm-900">{product.material}</p>
              </div>
            )}
            {product.color && (
              <div className="bg-warm-100 p-4 sketchy-border-light">
                <p className="text-sm text-warm-500 font-caveat">Color</p>
                <p className="font-medium text-warm-900">{product.color}</p>
              </div>
            )}
            <div className="bg-warm-100 p-4 sketchy-border-light">
              <p className="text-sm text-warm-500 font-caveat">Availability</p>
              <p
                className={`font-medium ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock > 0
                  ? `In Stock (${product.stock} left)`
                  : "Out of Stock"}
              </p>
            </div>
          </div>

          {/* Add to cart */}
          <AddToCartButton
            product={{
              productId: product.id,
              name: product.name,
              price: price,
              image: productImages[0],
              stock: product.stock,
              slug: product.slug,
              sizes: product.sizes,
              color: product.color,
            }}
            disabled={product.stock <= 0}
          />

          {/* Trust badges */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-warm-500 font-caveat text-sm">
              <svg
                className="w-5 h-5 text-accent-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Free Shipping above Rs.999
            </div>
            <div className="flex items-center gap-2 text-warm-500 font-caveat text-sm">
              <svg
                className="w-5 h-5 text-accent-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Premium Quality Cotton
            </div>
            <div className="flex items-center gap-2 text-warm-500 font-caveat text-sm">
              <svg
                className="w-5 h-5 text-accent-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              30-Day Returns
            </div>
            <div className="flex items-center gap-2 text-warm-500 font-caveat text-sm">
              <svg
                className="w-5 h-5 text-accent-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Secure Checkout
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-bold font-marker hand-underline inline-block text-warm-900 mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((rp: any) => {
              const rpImg =
                Array.isArray(rp.images) && rp.images.length > 0
                  ? rp.images[0]
                  : "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1759595763_7509683.jpg";
              const rpPrice =
                typeof rp.price === "string"
                  ? parseFloat(rp.price)
                  : rp.price;
              return (
                <Link
                  key={rp.id}
                  href={`/products/${rp.slug}`}
                  className="group"
                >
                  <div className="relative aspect-square sketchy-border-light overflow-hidden bg-warm-100 mb-3">
                    <Image
                      src={rpImg}
                      alt={rp.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-medium text-warm-900 group-hover:text-primary-600 transition line-clamp-1 text-sm">
                    {rp.name}
                  </h3>
                  <p className="font-bold text-warm-900 text-sm mt-1">
                    {formatPrice(rpPrice)}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
