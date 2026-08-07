"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import {
  Loader2,
  Calendar,
  MapPin,
  Home,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { TRentalRequestResponse } from "@/types/rentals";
import { getAllRentalRequest } from "../_tenantActions/getAllRentals";
import { ProceedToPaymentButton } from "@/components/dashboard/tenant/ProceedToPaymentButton";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "APPROVED":
      return (
        <Badge
          variant="outline"
          className="bg-emerald-50 text-emerald-700 border-emerald-200 font-medium flex items-center gap-1"
        >
          <CheckCircle2 className="h-3.5 w-3.5" /> Approved
        </Badge>
      );
    case "PENDING":
      return (
        <Badge
          variant="outline"
          className="bg-amber-50 text-amber-700 border-amber-200 font-medium flex items-center gap-1"
        >
          <Clock className="h-3.5 w-3.5" /> Pending
        </Badge>
      );
    case "REJECTED":
      return (
        <Badge
          variant="outline"
          className="bg-rose-50 text-rose-700 border-rose-200 font-medium flex items-center gap-1"
        >
          <XCircle className="h-3.5 w-3.5" /> Rejected
        </Badge>
      );
    case "ACTIVE":
      return (
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-700 border-blue-200 font-medium flex items-center gap-1"
        >
          Active
        </Badge>
      );
    case "COMPLETED":
      return (
        <Badge
          variant="outline"
          className="bg-slate-50 text-slate-700 border-slate-200 font-medium flex items-center gap-1"
        >
          Completed
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function TenantRequestsPage() {
  const [requests, setRequests] = useState<TRentalRequestResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchRequests = async () => {
      try {
        const res = await getAllRentalRequest();
        if (isMounted) {
          if (res.success && Array.isArray(res.data)) {
            setRequests(res.data);
          } else {
            toast.error(res.message || "Failed to load rental requests");
          }
        }
      } catch (error: unknown) {
        if (isMounted) {
          const msg =
            error instanceof Error
              ? error.message
              : "Failed to load rental requests";
          toast.error(msg);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRequests();

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
        <h2 className="text-2xl font-bold tracking-tight">Rental Requests</h2>
        <p className="text-sm text-muted-foreground">
          Track your rental applications and proceed to payment once approved.
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed rounded-xl bg-card">
          <p className="text-muted-foreground font-medium">
            No rental requests found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {requests.map((request) => {
            const property = request.property;

            return (
              <div
                key={request.id}
                className="border border-border rounded-xl p-5 bg-card flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
              >
                <div className="flex items-start md:items-center gap-4">
                  {property?.images ? (
                    <div className="relative h-20 w-20 rounded-lg overflow-hidden border border-border shrink-0">
                      <Image
                        unoptimized
                        src={property.images}
                        alt={property.title || "Property"}
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
                    <h3 className="font-semibold text-base">
                      {property?.title || "Rental Property Request"}
                    </h3>
                    {property?.location && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> {property.location}
                      </p>
                    )}
                    <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground">
                      {request.moveInDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" /> Move-in:{" "}
                          {new Date(request.moveInDate).toLocaleDateString()}
                        </span>
                      )}
                      <span>
                        Submitted:{" "}
                        {new Date(request.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-border">
                  {getStatusBadge(request.status)}

                  {/* Strictly displays Proceed To Payment when status === "APPROVED" */}
                  <ProceedToPaymentButton
                    rentRequestId={request.id}
                    status={request.status}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
