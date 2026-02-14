"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4 tilt-1">
      {/* Main image */}
      <div className="relative aspect-square sketchy-border overflow-hidden bg-warm-100 sketch-shadow">
        <Image
          src={images[selectedImage] || images[0]}
          alt={name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative w-20 h-20 sketchy-border-sm overflow-hidden transition ${
                index === selectedImage
                  ? "border-primary-600"
                  : "border-transparent hover:border-warm-400"
              }`}
            >
              <Image
                src={img}
                alt={`${name} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
