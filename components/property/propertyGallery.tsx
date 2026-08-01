"use client";

import { useState } from "react";
import Image from "next/image";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const displayImages = images.slice(0, 5);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative h-96 md:h-125 rounded-xl overflow-hidden bg-muted">
        <Image
          unoptimized
          src={displayImages[selectedIndex]}
          alt={`${title} - ${selectedIndex + 1}`}
          fill
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {displayImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${
              selectedIndex === index
                ? "border-primary ring-2 ring-primary/50"
                : "border-border hover:border-muted-foreground"
            }`}
          >
            <Image
              unoptimized
              src={image}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
