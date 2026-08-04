"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { RentalStatusBadge } from "./rental-request-badge";
import Link from "next/link";

export interface RentalRequest {
  id: string;
  tenantId: string;
  propertyId: string;
  moveInDate: string;
  message: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "ACTIVE" | "COMPLETED";
  createdAt: string;
  updatedAt: string;
  property: {
    id: string;
    title: string;
    location: string;
    rentAmount: number;
    images: string;
    isAvailable: boolean;
    category: {
      name: string;
    };
    landlord: {
      name: string;
      profilePhoto: string | null;
    };
  };
}

interface RentalRequestTableProps {
  requests: RentalRequest[];
}

export function RentalRequestTable({ requests }: RentalRequestTableProps) {
  const initPhoto =
    "https://i.pinimg.com/236x/15/0f/a8/150fa8800b0a0d5633abc1d1c4db3d87.jpg?nii=t";

  const renderActions = (status: string, id: string) => {
    const baseButton = (
      <Button variant="outline" size="sm" className="rounded-lg">
        <Link href={`/dashboard/tenant/requests/${id}`}>View Details</Link>
      </Button>
    );

    if (status === "PENDING") {
      return (
        <div className="flex gap-2">
          {baseButton}
          <Button size="sm" disabled className="rounded-lg">
            Pay Now
          </Button>
        </div>
      );
    }

    if (status === "APPROVED") {
      return (
        <div className="flex gap-2">
          {baseButton}
          <Button size="sm" className="rounded-lg">
            Pay Now
          </Button>
        </div>
      );
    }

    if (status === "COMPLETED") {
      return (
        <div className="flex gap-2">
          {baseButton}
          <Button size="sm" className="rounded-lg">
            Leave Review
          </Button>
        </div>
      );
    }

    if (status === "REJECTED") {
      return baseButton;
    }

    return baseButton;
  };

  return (
    <div className="border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-4 font-semibold text-foreground">
                Property
              </th>
              <th className="text-left p-4 font-semibold text-foreground">
                Location
              </th>
              <th className="text-left p-4 font-semibold text-foreground">
                Monthly Rent
              </th>
              <th className="text-left p-4 font-semibold text-foreground">
                Landlord
              </th>
              <th className="text-left p-4 font-semibold text-foreground">
                Move-in Date
              </th>
              <th className="text-left p-4 font-semibold text-foreground">
                Status
              </th>
              <th className="text-left p-4 font-semibold text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr
                key={request.id}
                className={`border-b last:border-b-0 ${index % 2 === 0 ? "bg-background" : "bg-muted/30"}`}
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0">
                      <Image
                        unoptimized
                        src={request.property.images}
                        alt={request.property.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">
                        {request.property.title}
                      </p>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {request.property.category.name}
                      </Badge>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1 text-sm text-foreground">
                    <MapPin className="w-4 h-4 shrink-0" />
                    {request.property.location}
                  </div>
                </td>
                <td className="p-4">
                  <p className="font-semibold text-foreground">
                    ${request.property.rentAmount.toLocaleString()}
                  </p>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Image
                      unoptimized
                      src={request.property.landlord.profilePhoto || initPhoto}
                      alt={request.property.landlord.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm text-foreground">
                      {request.property.landlord.name}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <p className="text-sm text-foreground">
                    {new Date(request.moveInDate).toLocaleDateString()}
                  </p>
                </td>
                <td className="p-4">
                  <RentalStatusBadge status={request.status} />
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    {renderActions(request.status, request.id)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
