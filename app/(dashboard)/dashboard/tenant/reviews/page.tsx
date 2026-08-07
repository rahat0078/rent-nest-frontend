"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Loader2, MapPin, Home, User, CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { TRentalRequestResponse } from "@/types/rentals";
import { getAllRentalRequest } from "../_tenantActions/getAllRentals";
import { ReviewModal } from "@/components/dashboard/tenant/ReviewModal";

export default function TenantReviewsPage() {
  const [rentals, setRentals] = useState<TRentalRequestResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchCompletedRentals = async () => {
      try {
        const res = await getAllRentalRequest();
        if (isMounted) {
          if (res.success && Array.isArray(res.data)) {
            // Business Rule: Simply filter status === "COMPLETED"
            const completedList = res.data.filter(
              (rental) => rental.status === "COMPLETED",
            );
            setRentals(completedList);
          } else {
            toast.error(res.message || "Failed to load rental requests.");
          }
        }
      } catch (error: unknown) {
        if (isMounted) {
          const msg =
            error instanceof Error
              ? error.message
              : "An unexpected error occurred.";
          toast.error(msg);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCompletedRentals();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Property Reviews</h2>
        <p className="text-sm text-muted-foreground">
          Leave feedback for your completed stay properties.
        </p>
      </div>

      {rentals.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed rounded-xl bg-card">
          <p className="text-muted-foreground font-medium">
            No completed rentals available for review.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {rentals.map((rental) => {
            const property = rental.property;

            return (
              <div
                key={rental.id}
                className="border border-border rounded-xl p-5 bg-card flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
              >
                <div className="flex items-start md:items-center gap-4">
                  {property?.images ? (
                    <div className="relative h-20 w-20 rounded-lg overflow-hidden border border-border shrink-0">
                      <Image
                        unoptimized
                        src={property.images}
                        alt={property.title || "Property Image"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-20 w-20 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Home className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-base">
                        {property?.title || "Property"}
                      </h3>
                      {property?.category?.name && (
                        <Badge variant="secondary" className="text-[10px]">
                          {property.category.name}
                        </Badge>
                      )}
                    </div>

                    {property?.location && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> {property.location}
                      </p>
                    )}

                    <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground">
                      {property?.rentAmount && (
                        <span className="font-medium text-foreground">
                          ৳{property.rentAmount.toLocaleString()}/month
                        </span>
                      )}

                      {property?.landlord?.name && (
                        <span className="flex items-center gap-1">
                          <User className="h-3.5 w-3.5" /> Landlord:{" "}
                          {property.landlord.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-border">
                  <Badge
                    variant="outline"
                    className="bg-slate-50 text-slate-700 border-slate-200 font-medium flex items-center gap-1"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-slate-500" />{" "}
                    Completed
                  </Badge>

                  {property?.id && (
                    <ReviewModal
                      propertyId={property.id}
                      propertyTitle={property.title || "Property"}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
