import { db } from "@/lib/db";
import { products, categories } from "@/lib/db/schema";
import { eq, and, gte, lte, ilike, or, desc, asc, sql } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import ProductFilters from "@/components/product/ProductFilters";

interface Props {
  searchParams: Promise<{
    category?: string;
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    size?: string;
    sort?: string;
    featured?: string;
    page?: string;
  }>;
}

const ITEMS_PER_PAGE = 12;

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const offset = (page - 1) * ITEMS_PER_PAGE;

  let allProducts: any[] = [];
  let allCategories: any[] = [];
  let totalCount = 0;

  try {
    // Fetch categories
    allCategories = await db.select().from(categories);

    // Build conditions
    const conditions: any[] = [eq(products.isActive, true)];

    if (params.category) {
      const cat = allCategories.find((c: any) => c.slug === params.category);
      if (cat) conditions.push(eq(products.categoryId, cat.id));
    }

    if (params.search) {
      conditions.push(
        or(
          ilike(products.name, `%${params.search}%`),
          ilike(products.description, `%${params.search}%`)
        )
      );
    }

    if (params.minPrice) {
      conditions.push(gte(products.price, params.minPrice));
    }

    if (params.maxPrice) {
      conditions.push(lte(products.price, params.maxPrice));
    }

    if (params.size) {
      conditions.push(sql`${products.sizes}::jsonb @> ${JSON.stringify([params.size])}::jsonb`);
    }

    if (params.featured === "true") {
      conditions.push(eq(products.isFeatured, true));
    }

    // Sort
    let orderBy: any = desc(products.createdAt);
    if (params.sort === "price_asc") orderBy = asc(products.price);
    else if (params.sort === "price_desc") orderBy = desc(products.price);
    else if (params.sort === "newest") orderBy = desc(products.createdAt);
    else if (params.sort === "name_asc") orderBy = asc(products.name);

    const whereClause = conditions.length > 1 ? and(...conditions) : conditions[0];

    // Get count
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(products)
      .where(whereClause);
    totalCount = Number(countResult[0]?.count || 0);

    // Get products
    allProducts = await db
      .select()
      .from(products)
      .where(whereClause)
      .orderBy(orderBy)
      .limit(ITEMS_PER_PAGE)
      .offset(offset);
  } catch {
    // Fallback when DB is not connected
    allCategories = [
      { id: "1", name: "T-Shirts", slug: "t-shirts" },
      { id: "2", name: "Shirts", slug: "shirts" },
      { id: "3", name: "Polos", slug: "polos" },
      { id: "4", name: "Jeans & Pants", slug: "jeans-pants" },
      { id: "5", name: "Jackets & Outerwear", slug: "jackets-outerwear" },
      { id: "6", name: "Sneakers", slug: "sneakers" },
    ];
    const fallbackProducts = [
      { id: "1", name: "Stranger Things: Upside Down", slug: "stranger-things-upside-down-spray-men-oversized-tshirt", price: "849", compareAtPrice: "899", images: ["https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1759595763_7509683.jpg"], isFeatured: true },
      { id: "2", name: "Cotton Linen: Deep Blue", slug: "solids-blue-men-cotton-linen-shirts", price: "1399", compareAtPrice: "1499", images: ["https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1730352766_5470975.jpg"], isFeatured: true },
      { id: "3", name: "Solids: Graphite Grey", slug: "solids-graphite-grey-mens-oversized-t-shirts", price: "799", compareAtPrice: "849", images: ["https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1711606942_5048133.jpg"], isFeatured: false },
      { id: "4", name: "Deadpool: Samurai", slug: "deadpool-samurai-men-oversized-tshirts", price: "849", compareAtPrice: "899", images: ["https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1756032069_5891792.jpg"], isFeatured: false },
      { id: "5", name: "Milano: Walnut", slug: "van-guard-beige-men-low-top-sneakers", price: "2399", compareAtPrice: "2499", images: ["https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1770467378_3371828.jpg"], isFeatured: true },
      { id: "6", name: "Textured Shirt: Mulberry", slug: "textured-mulberry-knit-shirts", price: "1499", compareAtPrice: "1599", images: ["https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1754715290_9593419.jpg"], isFeatured: false },
      { id: "7", name: "Cargo Jeans: Washed Black", slug: "cargo-jeans-washed-black", price: "1999", compareAtPrice: "2199", images: ["https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1757572640_6478293.jpg"], isFeatured: true },
      { id: "8", name: "Solids: Forest Green Polo", slug: "solids-forest-green-oversized-polo", price: "999", compareAtPrice: "1099", images: ["https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1757572888_7254638.jpg"], isFeatured: false },
      { id: "9", name: "Bomber Jacket: Midnight Black", slug: "bomber-jacket-midnight-black", price: "2499", compareAtPrice: "2799", images: ["https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1753098843_9517382.jpg"], isFeatured: true },
      { id: "10", name: "Iron Man: Armored Avenger", slug: "iron-man-armoured-avenger-men-oversized-tshirts", price: "849", compareAtPrice: "899", images: ["https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1769075396_5416099.jpg"], isFeatured: false },
      { id: "11", name: "Chino Pants: Khaki", slug: "chino-pants-khaki", price: "1499", compareAtPrice: "1599", images: ["https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1757572416_9374521.jpg"], isFeatured: false },
      { id: "12", name: "Holiday Print: Tropical Vibes", slug: "holiday-shirt-tropical-vibes", price: "1299", compareAtPrice: "1399", images: ["https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1753098937_4780598.jpg"], isFeatured: true },
    ];
    allProducts = fallbackProducts;
    totalCount = 120;
  }

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-warm-500 font-caveat mb-6">
        <Link href="/" className="hover:text-primary-600 transition">Home</Link>
        <span>~&gt;</span>
        <span className="text-warm-900">Shop</span>
        {params.category && (
          <>
            <span>~&gt;</span>
            <span className="text-warm-900 capitalize">{params.category}</span>
          </>
        )}
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters sidebar */}
        <ProductFilters
          categories={allCategories}
          currentCategory={params.category}
          currentSort={params.sort}
          currentSize={params.size}
          currentMinPrice={params.minPrice}
          currentMaxPrice={params.maxPrice}
          searchQuery={params.search}
        />

        {/* Products grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-warm-500 text-sm">
              {params.search && (
                <span>Results for &quot;{params.search}&quot; · </span>
              )}
              Showing {allProducts.length} of {totalCount} products
            </p>
          </div>

          {allProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-warm-500 font-marker text-lg mb-4">No products found</p>
              <Link
                href="/products"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear all filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {allProducts.map((product: any) => {
                const imageUrl =
                  Array.isArray(product.images) && product.images.length > 0
                    ? product.images[0]
                    : "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1759595763_7509683.jpg";
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
                        <span className="absolute top-3 left-3 cartoon-badge bg-primary-500 text-white text-xs font-medium">
                          Sale
                        </span>
                      )}
                      {product.isFeatured && (
                        <span className="absolute top-3 right-3 cartoon-badge bg-secondary-400 text-warm-900 text-xs font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    <h3 className="font-medium text-warm-900 group-hover:text-primary-600 transition line-clamp-1 text-sm md:text-base">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-warm-900 text-sm md:text-base">
                        {formatPrice(price)}
                      </span>
                      {comparePrice && (
                        <span className="text-warm-400 line-through text-xs md:text-sm">
                          {formatPrice(comparePrice)}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              {page > 1 && (
                <Link
                  href={{
                    pathname: "/products",
                    query: { ...params, page: String(page - 1) },
                  }}
                  className="px-4 py-2 sketchy-border-sm border-warm-300 hover:bg-warm-100 transition text-sm"
                >
                  Previous
                </Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={{
                    pathname: "/products",
                    query: { ...params, page: String(p) },
                  }}
                  className={`px-4 py-2 text-sm transition ${
                    p === page
                      ? "bg-primary-600 text-white sketchy-border-sm"
                      : "border-warm-300 hover:bg-warm-100 sketchy-border-sm"
                  }`}
                >
                  {p}
                </Link>
              ))}
              {page < totalPages && (
                <Link
                  href={{
                    pathname: "/products",
                    query: { ...params, page: String(page + 1) },
                  }}
                  className="px-4 py-2 sketchy-border-sm border-warm-300 hover:bg-warm-100 transition text-sm"
                >
                  Next
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
