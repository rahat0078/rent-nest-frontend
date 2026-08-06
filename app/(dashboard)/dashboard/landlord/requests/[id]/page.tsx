"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import {
  Loader2,
  CheckCircle,
  XCircle,
  Calendar,
  DollarSign,
  MapPin,
  Bed,
  Bath,
  User,
  Mail,
  Phone,
  ArrowLeft,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IRentalRequest, TRentalStatus } from "@/types/rentalRequest";
import { getSingleRentalRequest } from "../../_landlordActions.ts/getSingleRentalRequest";
import { updateRentalRequestStatus } from "../../_landlordActions.ts/updateRentalRequestStatus";
import { LandlordHeader } from "@/components/dashboard/landlord/landlord-header";

const getStatusBadge = (status: TRentalStatus) => {
  switch (status) {
    case "PENDING":
      return (
        <Badge
          variant="outline"
          className="bg-amber-50 text-amber-700 border-amber-200"
        >
          Pending
        </Badge>
      );
    case "APPROVED":
      return (
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-700 border-blue-200"
        >
          Approved
        </Badge>
      );
    case "REJECTED":
      return (
        <Badge
          variant="outline"
          className="bg-rose-50 text-rose-700 border-rose-200"
        >
          Rejected
        </Badge>
      );
    case "ACTIVE":
      return (
        <Badge
          variant="outline"
          className="bg-emerald-50 text-emerald-700 border-emerald-200"
        >
          Active
        </Badge>
      );
    case "COMPLETED":
      return (
        <Badge
          variant="outline"
          className="bg-slate-50 text-slate-700 border-slate-200"
        >
          Completed
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function RentalRequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [request, setRequest] = useState<IRentalRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<
    "APPROVED" | "REJECTED" | null
  >(null);

  useEffect(() => {
    let isMounted = true;

    const fetchDetail = async () => {
      try {
        const res = await getSingleRentalRequest(id);
        if (isMounted) {
          if (res.success && res.data) {
            setRequest(res.data);
          } else {
            toast.error(res.message || "Failed to load request details");
          }
        }
      } catch (error: unknown) {
        if (isMounted) {
          const msg =
            error instanceof Error
              ? error.message
              : "Failed to load request details";
          toast.error(msg);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDetail();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleStatusUpdate = async (status: "APPROVED" | "REJECTED") => {
    try {
      setUpdatingStatus(status);
      const res = await updateRentalRequestStatus(id, status);
      if (res.success) {
        toast.success(
          res.message || `Request ${status.toLowerCase()} successfully!`,
        );

        const updatedRes = await getSingleRentalRequest(id);
        if (updatedRes.success && updatedRes.data) {
          setRequest(updatedRes.data);
        }
        router.refresh();
      } else {
        toast.error(res.message || `Failed to ${status.toLowerCase()} request`);
      }
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : "Failed to update status";
      toast.error(msg);
    } finally {
      setUpdatingStatus(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!request) {
    return (
      <div className="space-y-4 text-center py-12">
        <p className="text-muted-foreground">Rental request not found.</p>
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/landlord/rental-requests")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Requests
        </Button>
      </div>
    );
  }

  const tenant = request.tenant;
  const property = request.property;
  const categoryName =
    typeof property?.category === "object"
      ? property?.category?.name
      : property?.category || "N/A";

  const rentAmount = property?.rentAmount ?? property?.rent ?? 0;

  return (
    <>
      <LandlordHeader title="Rental Details" description="" />
      <div className="max-w-4xl mx-auto space-y-6 mt-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard/landlord/rental-requests")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Requests
          </Button>
          <div>{getStatusBadge(request.status)}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Property Card */}
            <div className="border border-border rounded-xl p-6 bg-card space-y-4">
              <h3 className="text-lg font-semibold">Property Details</h3>
              {property?.images && (
                <div className="relative h-56 w-full overflow-hidden rounded-lg border border-border">
                  <Image
                    unoptimized
                    src={property.images}
                    alt={property.title || "Property"}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h4 className="text-xl font-bold">{property?.title}</h4>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="h-4 w-4" /> {property?.location}
                </p>
              </div>

              <p className="text-sm text-muted-foreground">
                {property?.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-border text-sm">
                <div>
                  <span className="text-muted-foreground block text-xs">
                    Category
                  </span>
                  <span className="font-medium">{categoryName}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs">
                    Rent
                  </span>
                  <span className="font-medium flex items-center">
                    <DollarSign className="h-3.5 w-3.5" /> {rentAmount}/mo
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs">
                    Bedrooms
                  </span>
                  <span className="font-medium flex items-center gap-1">
                    <Bed className="h-3.5 w-3.5" /> {property?.bedrooms}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs">
                    Bathrooms
                  </span>
                  <span className="font-medium flex items-center gap-1">
                    <Bath className="h-3.5 w-3.5" /> {property?.bathrooms}
                  </span>
                </div>
              </div>

              {property?.facilities && property.facilities.length > 0 && (
                <div className="pt-2 border-t border-border">
                  <span className="text-xs text-muted-foreground block mb-2">
                    Facilities
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {property.facilities.map((fac, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {fac}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Application Message */}
            <div className="border border-border rounded-xl p-6 bg-card space-y-3">
              <h3 className="text-lg font-semibold">Application Message</h3>
              <p className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg border border-border">
                {request.message || "No message provided by tenant."}
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> Move-In Date:{" "}
                  {new Date(request.moveInDate).toLocaleDateString()}
                </span>
                <span>
                  Requested on:{" "}
                  {new Date(request.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Sidebar Info & Actions */}
          <div className="space-y-6">
            {/* Tenant Card */}
            <div className="border border-border rounded-xl p-6 bg-card space-y-4">
              <h3 className="text-lg font-semibold">Tenant Information</h3>
              <div className="flex items-center gap-3">
                {tenant?.profilePhoto ? (
                  <div className="relative h-12 w-12 rounded-full overflow-hidden border border-border">
                    <Image
                      unoptimized
                      src={tenant.profilePhoto}
                      alt={tenant.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
                <div>
                  <p className="font-medium">{tenant?.name || "N/A"}</p>
                  <p className="text-xs text-muted-foreground">Applicant</p>
                </div>
              </div>

              <div className="space-y-2 text-sm pt-2 border-t border-border">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="text-foreground text-xs truncate">
                    {tenant?.email || "N/A"}
                  </span>
                </div>
                {(tenant?.phoneNumber || tenant?.phone) && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span className="text-foreground text-xs">
                      {tenant?.phoneNumber || tenant?.phone}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions Block */}
            <div className="border border-border rounded-xl p-6 bg-card space-y-4">
              <h3 className="text-lg font-semibold">Actions</h3>
              {request.status === "PENDING" ? (
                <div className="space-y-3">
                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    disabled={updatingStatus !== null}
                    onClick={() => handleStatusUpdate("APPROVED")}
                  >
                    {updatingStatus === "APPROVED" ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <CheckCircle className="h-4 w-4 mr-2" />
                    )}
                    Approve Request
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full"
                    disabled={updatingStatus !== null}
                    onClick={() => handleStatusUpdate("REJECTED")}
                  >
                    {updatingStatus === "REJECTED" ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <XCircle className="h-4 w-4 mr-2" />
                    )}
                    Reject Request
                  </Button>
                </div>
              ) : (
                <div className="p-3 text-center rounded-lg bg-muted/50 border border-border">
                  <p className="text-xs text-muted-foreground">
                    This request is currently{" "}
                    <span className="font-semibold text-foreground">
                      {request.status}
                    </span>
                    .
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
