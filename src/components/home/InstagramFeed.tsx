import Image from "next/image";
import { Instagram } from "lucide-react";

const images = [
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1754297985_8592598.jpg",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1763190255_5396429.jpg",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1768923573_5775909.jpg",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1763961989_3714652.jpg",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1725603614_2139506.jpg",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1771067690_9165491.gif",
];

export default function InstagramFeed() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-warm-900 mb-3 font-marker hand-underline inline-block">
            Follow Us on Instagram
          </h2>
          <p className="text-warm-500 font-caveat text-lg mt-4">@myotees</p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
          {images.map((img, index) => (
            <a
              key={index}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`relative aspect-square sketchy-border-sm overflow-hidden group ${
                index % 2 === 0 ? "tilt-1" : "tilt-2"
              }`}
            >
              <Image
                src={img}
                alt={`Instagram post ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-warm-900/0 group-hover:bg-warm-900/40 transition flex items-center justify-center">
                <Instagram
                  size={28}
                  className="text-white opacity-0 group-hover:opacity-100 transition"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
