"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import {
  Loader2,
  ArrowLeft,
  DollarSign,
  Calendar,
  MapPin,
  User,
  CreditCard,
  Hash,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { getPayment } from "../../_tenantActions/getPayment";
import { TPaymentItem, TPaymentStatus } from "@/types/payments";

const getPaymentStatusBadge = (status: TPaymentStatus) => {
  switch (status) {
    case "PAID":
      return (
        <Badge
          variant="outline"
          className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1 font-medium"
        >
          <CheckCircle2 className="h-3.5 w-3.5" /> Paid
        </Badge>
      );
    case "PENDING":
      return (
        <Badge
          variant="outline"
          className="bg-amber-50 text-amber-700 border-amber-200 gap-1 font-medium"
        >
          <Clock className="h-3.5 w-3.5" /> Pending
        </Badge>
      );
    case "FAILED":
      return (
        <Badge
          variant="outline"
          className="bg-rose-50 text-rose-700 border-rose-200 gap-1 font-medium"
        >
          <XCircle className="h-3.5 w-3.5" /> Failed
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function PaymentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [payment, setPayment] = useState<TPaymentItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchDetail = async () => {
      try {
        const res = await getPayment(id);
        if (isMounted) {
          if (res.success && res.data) {
            setPayment(res.data);
          } else {
            toast.error(res.message || "Failed to load payment details");
          }
        }
      } catch (error: unknown) {
        if (isMounted) {
          const msg =
            error instanceof Error
              ? error.message
              : "Failed to load payment details";
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

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="space-y-4 text-center py-12">
        <p className="text-muted-foreground">Payment record not found.</p>
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/tenant/payments")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Payment History
        </Button>
      </div>
    );
  }

  const property = payment.property || payment.rentRequest?.property;
  const landlord = property?.landlord;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard/tenant/payments")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Payment History
        </Button>
        <div>{getPaymentStatusBadge(payment.status)}</div>
      </div>

      <div className="border border-border rounded-xl p-6 bg-card space-y-6">
        <div>
          <h2 className="text-xl font-bold">Payment Details</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Transaction Summary and Receipt Information
          </p>
        </div>

        {/* Property Overview */}
        {property && (
          <div className="flex flex-col sm:flex-row gap-4 p-4 border border-border rounded-lg bg-muted/30">
            {property.images && (
              <div className="relative h-28 w-full sm:w-36 rounded-md overflow-hidden border border-border shrink-0">
                <Image
                  src={property.images}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="space-y-1 justify-center flex flex-col">
              <h3 className="font-semibold text-base">{property.title}</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> {property.location}
              </p>
              {payment.rentRequest?.status && (
                <div className="pt-1">
                  <span className="text-xs text-muted-foreground">
                    Rental Request Status:{" "}
                  </span>
                  <Badge
                    variant="secondary"
                    className="text-xs uppercase font-medium"
                  >
                    {payment.rentRequest.status}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Payment Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm border-t border-border pt-4">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <DollarSign className="h-3.5 w-3.5" /> Amount Paid
            </span>
            <p className="font-bold text-lg text-foreground">
              ${payment.amount}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <CreditCard className="h-3.5 w-3.5" /> Payment Provider
            </span>
            <p className="font-semibold uppercase text-foreground">
              {payment.provider || "STRIPE"}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Hash className="h-3.5 w-3.5" /> Transaction ID
            </span>
            <p className="font-mono text-xs text-foreground truncate">
              {payment.transactionId || "N/A"}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> Created Date
            </span>
            <p className="font-medium text-foreground">
              {new Date(payment.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> Paid Date
            </span>
            <p className="font-medium text-foreground">
              {payment.paidAt
                ? new Date(payment.paidAt).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>

        {/* Landlord Contact Info */}
        {landlord && (
          <div className="border-t border-border pt-4 space-y-2">
            <h4 className="text-sm font-semibold flex items-center gap-1.5">
              <User className="h-4 w-4 text-muted-foreground" /> Landlord
              Details
            </h4>
            <div className="text-xs space-y-1 text-muted-foreground pl-5">
              <p>
                <span className="font-medium text-foreground">Name:</span>{" "}
                {landlord.name || "N/A"}
              </p>
              <p>
                <span className="font-medium text-foreground">Email:</span>{" "}
                {landlord.email || "N/A"}
              </p>
              {(landlord.phoneNumber || landlord.phone) && (
                <p>
                  <span className="font-medium text-foreground">Phone:</span>{" "}
                  {landlord.phoneNumber || landlord.phone}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
