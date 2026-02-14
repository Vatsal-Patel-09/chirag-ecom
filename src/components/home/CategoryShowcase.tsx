import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "T-Shirts", slug: "t-shirts", image: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1759595763_7509683.jpg" },
  { name: "Shirts", slug: "shirts", image: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1730352766_5470975.jpg" },
  { name: "Polos", slug: "polos", image: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1769236936_2776330.jpg" },
  { name: "Jeans & Pants", slug: "jeans-pants", image: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1757572936_8366141.jpg" },
  { name: "Jackets & Outerwear", slug: "jackets-outerwear", image: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1753098937_4780598.jpg" },
  { name: "Sneakers", slug: "sneakers", image: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1770964536_9754011.jpg" },
];

const tiltClasses = ["tilt-1", "tilt-2", "tilt-3"];

export default function CategoryShowcase() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="text-center mb-12">
          <h2 className="font-marker hand-underline inline-block text-3xl md:text-4xl font-bold text-warm-900 mb-3">
            Shop by Category
          </h2>
          <p className="text-warm-500 font-caveat text-lg max-w-2xl mx-auto">
            Browse our collection across all categories
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat, index) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className={`group relative aspect-square sketchy-border overflow-hidden ${tiltClasses[index % 3]}`}
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-warm-900/50" />
              <div className="absolute inset-0 flex items-end p-4 md:p-6">
                <div>
                  <h3 className="cartoon-badge bg-secondary-200 text-warm-900 text-lg md:text-xl inline-block">
                    {cat.name}
                  </h3>
                  <span className="block text-primary-300 font-caveat text-base font-medium opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                    Explore &gt;&gt;&gt;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
