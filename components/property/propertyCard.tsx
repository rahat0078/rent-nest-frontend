"use client";

import { Heart, MapPin, Bed, Bath, Ruler, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IProperty } from "@/types/property";
import Link from "next/link";

interface PropertyCardProps {
  property: IProperty;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <Image
          unoptimized
          src={property.images}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute top-3 left-3 right-3 flex gap-2">
          <Badge className="bg-primary text-primary-foreground">
            {property.category.name}
          </Badge>

          <Badge
            variant={property.isAvailable ? "default" : "destructive"}
            className="ml-auto"
          >
            {property.isAvailable ? "Available" : "Rented"}
          </Badge>
        </div>

        <button className="absolute bottom-3 right-3 bg-white rounded-full p-2 shadow-md">
          <Heart className="w-5 h-5 text-destructive" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3">
        <div>
          <h3 className="font-semibold line-clamp-2">{property.title}</h3>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />

            {property.location}
          </div>
        </div>

        {/* Details */}

        <div className="grid grid-cols-3 gap-3 py-3 border-y">
          <div className="flex gap-1 items-center">
            <Bed className="w-4 h-4 text-primary" />
            {property.bedrooms}
          </div>

          <div className="flex gap-1 items-center">
            <Bath className="w-4 h-4 text-primary" />
            {property.bathrooms}
          </div>

          <div className="flex gap-1 items-center">
            <Ruler className="w-4 h-4 text-primary" />
            {property.sizeSqFt}
          </div>
        </div>

        {/* Rent + Landlord */}

        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Monthly Rent</p>

            <p className="text-lg font-bold text-primary">
              ৳{property.rentAmount.toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {property.landlord.profilePhoto ? (
              <Image
                unoptimized
                src={property.landlord.profilePhoto}
                width={32}
                height={32}
                alt={property.landlord.name}
                className="rounded-full"
              />
            ) : (
              <Image
                unoptimized
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                width={32}
                height={32}
                alt={property.landlord.name}
                className="rounded-full"
              />
            )}

            <span className="text-sm">{property.landlord.name}</span>
          </div>
        </div>

        <Link href={`properties/${property.id}`}>
          <Button
            variant="outline"
            className="w-full"
          >
            View Details
            <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
