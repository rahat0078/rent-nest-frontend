"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Ruler, MapPin } from "lucide-react";
import { IProperty } from "@/types/property";
import Image from "next/image";
import Link from "next/link";

export default function PropertyCard({
  id,
  images,
  title,
  location,
  bedrooms,
  bathrooms,
  sizeSqFt,
  rentAmount,
  category,
  isAvailable,
}: IProperty) {
  return (
    <div className="group rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card">
      {/* Image Placeholder */}
      <div className="relative h-48 overflow-hidden bg-linear-to-br from-primary/10 to-accent/10 border-b border-border">
        <div className="w-full h-full flex items-center justify-center">
          {images ? (
            <Image unoptimized fill src={images} alt={title} />
          ) : (
            <p>N/A</p>
          )}
        </div>
        <Badge className="absolute top-4 left-4 bg-primary/90 hover:bg-primary">
          {category.name}
        </Badge>
        {isAvailable ? (
          <Badge
            variant="outline"
            className="absolute top-4 right-4 border-border bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
          >
            Available
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="absolute top-4 right-4 border-border bg-red-50 text-red-700 dark:bg-re-950 dark:text-red-300"
          >
            N/A
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title and Location */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground line-clamp-1">
            {title}
          </h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            {location}
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-3 gap-3 py-4 border-y border-border">
          <div className="flex flex-col items-center gap-1 text-center">
            <Bed className="w-4 h-4 text-primary/70" />
            <span className="text-sm font-medium text-foreground">
              {bedrooms}
            </span>
            <span className="text-xs text-muted-foreground">Beds</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <Bath className="w-4 h-4 text-primary/70" />
            <span className="text-sm font-medium text-foreground">
              {bathrooms}
            </span>
            <span className="text-xs text-muted-foreground">Baths</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <Ruler className="w-4 h-4 text-primary/70" />
            <span className="text-sm font-medium text-foreground">
              {sizeSqFt} square Ft
            </span>
            <span className="text-xs text-muted-foreground">Size</span>
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Monthly Rent</p>
            <p className="text-2xl font-bold text-primary"> ৳{rentAmount}</p>
          </div>
          <Link href={`/properties/${id}`}>
            <Button
              size="sm"
              variant="outline"
              className="hover:bg-primary hover:text-primary-foreground"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
