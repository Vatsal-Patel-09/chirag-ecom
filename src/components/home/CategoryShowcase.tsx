import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "Men", slug: "men", image: "/images/product/1.jpg" },
  { name: "Women", slug: "women", image: "/images/product/18.jpg" },
  { name: "Unisex", slug: "unisex", image: "/images/product/32.jpg" },
  { name: "Kids", slug: "kids", image: "/images/product/42.jpg" },
  { name: "Sports", slug: "sports", image: "/images/product/49.jpg" },
  { name: "Premium", slug: "premium", image: "/images/product/3.jpg" },
];

export default function CategoryShowcase() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Shop by Category
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Find the perfect t-shirt for every occasion and style
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="group relative aspect-square rounded-2xl overflow-hidden"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-end p-4 md:p-6">
                <div>
                  <h3 className="text-white font-semibold text-lg md:text-xl">{cat.name}</h3>
                  <span className="text-purple-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore →
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
