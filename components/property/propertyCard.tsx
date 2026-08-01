"use client";

import { Heart, MapPin, Bed, Bath, Ruler, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  rentAmount: number;
  bedrooms: number;
  bathrooms: number;
  sizeSqFt: number;
  image: string;
  isAvailable: boolean;
  category: string;
  landlord: {
    name: string;
    profilePhoto: string;
  };
  onViewDetails?: (id: string) => void;
}

export function PropertyCard({
  id,
  title,
  location,
  rentAmount,
  bedrooms,
  bathrooms,
  sizeSqFt,
  image,
  isAvailable,
  category,
  landlord,
  onViewDetails,
}: PropertyCardProps) {
  return (
    <div className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <Image
          unoptimized
          src={image}
          alt={title}
          fill
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex gap-2 flex-wrap">
          <Badge
            variant="secondary"
            className="bg-primary text-primary-foreground"
          >
            {category}
          </Badge>
          <Badge
            variant={isAvailable ? "default" : "destructive"}
            className="ml-auto"
          >
            {isAvailable ? "Available" : "Rented"}
          </Badge>
        </div>

        {/* Favorite Button */}
        <button
          className="absolute bottom-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-accent transition-colors"
          aria-label="Add to favorites"
        >
          <Heart className="w-5 h-5 text-destructive" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3">
        {/* Title and Location */}
        <div>
          <h3 className="font-semibold text-foreground line-clamp-2 mb-1">
            {title}
          </h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        {/* Property Details Grid */}
        <div className="grid grid-cols-3 gap-3 py-3 border-y border-border">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground">{bedrooms}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground">{bathrooms}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Ruler className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground">{sizeSqFt}</span>
          </div>
        </div>

        {/* Rent and Landlord */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Monthly Rent</p>
            <p className="text-lg font-bold text-primary">
              ${rentAmount.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Image
            unoptimized
              width={32}
              height={32}
              src={landlord.profilePhoto}
              alt={landlord.name}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium text-foreground line-clamp-1">
              {landlord.name}
            </span>
          </div>
        </div>

        {/* View Details Button */}
        <Button
          variant="outline"
          className="w-full group/btn"
          onClick={() => onViewDetails?.(id)}
        >
          View Details
          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
