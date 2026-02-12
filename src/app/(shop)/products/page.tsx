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
      { id: "1", name: "Men", slug: "men" },
      { id: "2", name: "Women", slug: "women" },
      { id: "3", name: "Unisex", slug: "unisex" },
      { id: "4", name: "Kids", slug: "kids" },
      { id: "5", name: "Sports", slug: "sports" },
      { id: "6", name: "Premium", slug: "premium" },
    ];
    const fallbackProducts = [];
    for (let i = 1; i <= 12; i++) {
      fallbackProducts.push({
        id: String(i),
        name: `T-Shirt Style ${i}`,
        slug: `tshirt-style-${i}`,
        price: String(19.99 + i * 5),
        compareAtPrice: i % 3 === 0 ? String(29.99 + i * 5) : null,
        images: [`/images/product/${i}.jpg`],
        isFeatured: i % 2 === 0,
      });
    }
    allProducts = fallbackProducts;
    totalCount = 32;
  }

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-purple-600 transition">Home</Link>
        <span>/</span>
        <span className="text-gray-900">Shop</span>
        {params.category && (
          <>
            <span>/</span>
            <span className="text-gray-900 capitalize">{params.category}</span>
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
            <p className="text-gray-500 text-sm">
              {params.search && (
                <span>Results for &quot;{params.search}&quot; · </span>
              )}
              Showing {allProducts.length} of {totalCount} products
            </p>
          </div>

          {allProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg mb-4">No products found</p>
              <Link
                href="/products"
                className="text-purple-600 hover:text-purple-700 font-medium"
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
                    : "/images/product/1.jpg";
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
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3">
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
                      {product.isFeatured && (
                        <span className="absolute top-3 right-3 bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    <h3 className="font-medium text-gray-900 group-hover:text-purple-600 transition line-clamp-1 text-sm md:text-base">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-gray-900 text-sm md:text-base">
                        {formatPrice(price)}
                      </span>
                      {comparePrice && (
                        <span className="text-gray-400 line-through text-xs md:text-sm">
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
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
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
                  className={`px-4 py-2 rounded-lg text-sm transition ${
                    p === page
                      ? "bg-purple-600 text-white"
                      : "border border-gray-300 hover:bg-gray-50"
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
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
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
