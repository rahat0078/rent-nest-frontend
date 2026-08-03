"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { MapPin, Calendar } from "lucide-react";
import { RentalStatusBadge } from "./rental-requst-badge";

interface RentalRequestCardProps {
  id: string;
  propertyImage: string;
  propertyTitle: string;
  category: string;
  location: string;
  rentAmount: number;
  landlordName: string;
  landlordPhoto: string;
  moveInDate: string;
  requestDate: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "ACTIVE" | "COMPLETED";
}

export function RentalRequestCard({
  id,
  propertyImage,
  propertyTitle,
  category,
  location,
  rentAmount,
  landlordName,
  landlordPhoto,
  moveInDate,
  requestDate,
  status,
}: RentalRequestCardProps) {
  const renderActions = () => {
    const baseButtons = (
      <Button variant="outline" size="sm" className="flex-1 rounded-lg">
        View Details
      </Button>
    );

    if (status === "PENDING") {
      return (
        <div className="flex gap-2">
          {baseButtons}
          <Button size="sm" disabled className="flex-1 rounded-lg">
            Pay Now
          </Button>
        </div>
      );
    }

    if (status === "APPROVED") {
      return (
        <div className="flex gap-2">
          {baseButtons}
          <Button size="sm" className="flex-1 rounded-lg">
            Pay Now
          </Button>
        </div>
      );
    }

    if (status === "ACTIVE" || status === "COMPLETED") {
      return (
        <div className="flex gap-2">
          {baseButtons}
          <Button size="sm" className="flex-1 rounded-lg">
            Leave Review
          </Button>
        </div>
      );
    }

    if (status === "REJECTED") {
      return baseButtons;
    }

    return baseButtons;
  };

  return (
    <div className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Property Image */}
      <div className="relative h-40 w-full">
        <Image
          unoptimized
          src={propertyImage}
          alt={propertyTitle}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge
            variant="secondary"
            className="bg-background/90 backdrop-blur-sm"
          >
            {category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title and Status */}
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground line-clamp-2">
              {propertyTitle}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="w-4 h-4" />
              {location}
            </div>
          </div>
          <RentalStatusBadge status={status} />
        </div>

        {/* Rent and Dates */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground">Monthly Rent</p>
            <p className="font-semibold text-foreground">
              ${rentAmount.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Move-in Date</p>
            <div className="flex items-center gap-1 font-semibold text-foreground">
              <Calendar className="w-4 h-4" />
              {new Date(moveInDate).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Landlord Info */}
        <div className="flex items-center gap-2 pt-2 border-t">
          <Image
            unoptimized
            src={landlordPhoto}
            alt={landlordName}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1 text-sm">
            <p className="text-muted-foreground">Landlord</p>
            <p className="font-medium text-foreground">{landlordName}</p>
          </div>
          <span className="text-xs text-muted-foreground">
            {new Date(requestDate).toLocaleDateString()}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">{renderActions()}</div>
      </div>
    </div>
  );
}
