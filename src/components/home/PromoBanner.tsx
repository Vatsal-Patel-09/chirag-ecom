import Image from "next/image";
import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Banner 1 */}
          <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden group">
            <Image
              src="/images/banner/bg-2.jpg"
              alt="New Collection"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
              <div className="p-8 md:p-12">
                <p className="text-purple-400 font-medium mb-2">New Collection</p>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Summer<br />Streetwear
                </h3>
                <Link
                  href="/products?category=men"
                  className="inline-block bg-white text-gray-900 hover:bg-purple-600 hover:text-white px-6 py-2.5 rounded-full font-medium transition"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>

          {/* Banner 2 */}
          <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden group">
            <Image
              src="/images/banner/bg-3.jpg"
              alt="Special Offer"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
              <div className="p-8 md:p-12">
                <p className="text-purple-400 font-medium mb-2">Premium Quality</p>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Premium<br />Collection
                </h3>
                <Link
                  href="/products?category=premium"
                  className="inline-block bg-white text-gray-900 hover:bg-purple-600 hover:text-white px-6 py-2.5 rounded-full font-medium transition"
                >
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
