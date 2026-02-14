import Image from "next/image";
import Link from "next/link";

const posts = [
  {
    id: 1,
    title: "How to Style Oversized Tees Like a Pro",
    excerpt: "Master the art of rocking oversized t-shirts for any occasion.",
    image: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1750426444_9028342.jpg",
    date: "Feb 5, 2026",
  },
  {
    id: 2,
    title: "T-Shirt Care: Keep Your Tees Looking New",
    excerpt: "Expert tips on washing, drying, and storing your favourite t-shirts.",
    image: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1756476946_4773055.jpg",
    date: "Jan 28, 2026",
  },
  {
    id: 3,
    title: "Top T-Shirt Trends for 2026",
    excerpt: "From vintage washes to bold prints — the styles defining this year.",
    image: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1771072734_8540545.jpg",
    date: "Jan 15, 2026",
  },
  {
    id: 4,
    title: "The Ultimate Guide to T-Shirt Fabrics",
    excerpt: "Cotton, polyester, blends — find the perfect fabric for your lifestyle.",
    image: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1769593687_7127628.jpg",
    date: "Jan 8, 2026",
  },
];

export default function BlogPreview() {
  return (
    <section className="paper-bg py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-warm-900 mb-3 font-marker hand-underline inline-block">
            From Our Journal
          </h2>
          <p className="text-warm-500 font-caveat text-lg max-w-2xl mx-auto mt-4">
            Stories, tips, and inspiration from the world of fashion
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post, index) => (
            <article
              key={post.id}
              className={`bg-warm-50 sketchy-border-light overflow-hidden hover:sketch-shadow-sm transition group ${
                index % 2 === 0 ? "tilt-1" : "tilt-2"
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="text-primary-500 font-caveat text-sm font-medium mb-2">{post.date}</p>
                <h3 className="font-semibold text-warm-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition">
                  {post.title}
                </h3>
                <p className="text-warm-500 text-sm line-clamp-2">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
