"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/jonin_vest_homepage.png?w=1500&dpr=2",
    title: "Tees for Every Mood!",
    subtitle: "Quirky, comfy, and oh-so-you. Dive into our hand-picked collection of tees that match every vibe.",
    cta: "Shop Now",
    link: "/products",
  },
  {
    image: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/homepage_1_TdrWhjO.jpg?w=1500&dpr=2",
    title: "Fresh Drops!",
    subtitle: "Hot off the press — snag the newest designs before your friends do. You snooze, you lose!",
    cta: "View Collection",
    link: "/products?sort=newest",
  },
  {
    image: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/cat_ban_Homepage.jpg?w=1500&dpr=2",
    title: "Premium Picks",
    subtitle: "Buttery-soft fabrics, killer fits — these tees are basically a warm hug you can wear.",
    cta: "Explore",
    link: "/products?featured=true",
  },
  {
    image: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Homepage_ZddV8DN.jpg?w=1500&dpr=2",
    title: "Top Sellers",
    subtitle: "Our most-loved tees — tried, tested, and obsessed over by thousands.",
    cta: "Shop Best Sellers",
    link: "/products",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-warm-900/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-2xl">
              <div className="tilt-1 inline-block">
                <h1 className="font-marker text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
                  {slide.title}
                </h1>
              </div>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                {slide.subtitle}
              </p>
              <Link
                href={slide.link}
                className="inline-block sketchy-border bg-primary-500 text-white hover:bg-primary-600 sketch-shadow-primary px-8 py-3.5 font-medium text-lg transition transform hover:scale-105"
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 sketchy-border-sm bg-warm-900/30 hover:bg-warm-900/60 backdrop-blur-sm text-white p-3 transition"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 sketchy-border-sm bg-warm-900/30 hover:bg-warm-900/60 backdrop-blur-sm text-white p-3 transition"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 transition ${
              index === current
                ? "bg-primary-500 sketchy-border-sm w-8"
                : "bg-warm-300/50 w-3 rounded-full"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
