import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bed,
  Bath,
  Ruler,
  MapPin,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

interface PropertyCardProps {
  id: string;
  image: string;
  title: string;
  category: string;
  location: string;
  rent: number;
  bedrooms: number;
  bathrooms: number;
  size: number;
  available: boolean;
  createdDate: string;
}

export function PropertyCard({
  id,
  image,
  title,
  category,
  location,
  rent,
  bedrooms,
  bathrooms,
  size,
  available,
  createdDate,
}: PropertyCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative h-48 bg-muted overflow-hidden">
        <Image
          unoptimized
          src={image}
          alt={title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="default">{category}</Badge>
        </div>
        <div className="absolute bottom-3 left-3">
          <Badge variant={available ? "secondary" : "destructive"}>
            {available ? "Available" : "Not Available"}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-foreground truncate">{title}</h3>

        <div className="flex items-center gap-1 text-muted-foreground mt-2">
          <MapPin className="w-4 h-4" />
          <p className="text-sm truncate">{location}</p>
        </div>

        <p className="text-2xl font-bold text-primary mt-3">
          ${rent.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground">per month</p>

        {/* Details Grid */}
        <div className="grid grid-cols-3 gap-2 mt-4 py-4 border-y border-border">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Bed className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                {bedrooms}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Beds</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Bath className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                {bathrooms}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Baths</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Ruler className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                {size}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">sq ft</p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          Created {createdDate}
        </p>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <Link
            href={`/dashboard/landlord/properties/${id}/edit`}
            className="flex-1"
          >
            <Button variant="outline" className="w-full" size="sm">
              Edit
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="px-3">
            {available ? (
              <ToggleRight className="w-4 h-4 text-primary" />
            ) : (
              <ToggleLeft className="w-4 h-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
