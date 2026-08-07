"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Loader2, Eye, DollarSign, Calendar, Home } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getPayments } from "../_tenantActions/getPayments";
import { TPaymentItem, TPaymentStatus } from "@/types/payments";

const getPaymentStatusBadge = (status: TPaymentStatus) => {
  switch (status) {
    case "PAID":
      return (
        <Badge
          variant="outline"
          className="bg-emerald-50 text-emerald-700 border-emerald-200 font-medium"
        >
          Paid
        </Badge>
      );
    case "PENDING":
      return (
        <Badge
          variant="outline"
          className="bg-amber-50 text-amber-700 border-amber-200 font-medium"
        >
          Pending
        </Badge>
      );
    case "FAILED":
      return (
        <Badge
          variant="outline"
          className="bg-rose-50 text-rose-700 border-rose-200 font-medium"
        >
          Failed
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState<TPaymentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchPaymentHistory = async () => {
      try {
        const res = await getPayments();
        if (isMounted) {
          if (res.success) {
            setPayments(res.data || []);
          } else {
            toast.error(res.message || "Failed to load payment history");
          }
        }
      } catch (error: unknown) {
        if (isMounted) {
          const msg =
            error instanceof Error
              ? error.message
              : "Failed to load payment history";
          toast.error(msg);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPaymentHistory();

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
        <h2 className="text-2xl font-bold tracking-tight">Payment History</h2>
        <p className="text-sm text-muted-foreground">
          View all your previous rental payment transactions.
        </p>
      </div>

      {payments.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed rounded-xl bg-card">
          <p className="text-muted-foreground font-medium">
            No payment history found.
          </p>
        </div>
      ) : (
        <div className="border border-border rounded-xl overflow-hidden bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Paid Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => {
                const property =
                  payment.property || payment.rentRequest?.property;
                const propertyTitle = property?.title || "N/A";
                const propertyImage = property?.images;

                return (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        {propertyImage ? (
                          <div className="relative h-10 w-10 rounded-md overflow-hidden border border-border shrink-0">
                            <Image
                              src={propertyImage}
                              alt={propertyTitle}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center shrink-0">
                            <Home className="h-5 w-5 text-muted-foreground" />
                          </div>
                        )}
                        <span className="truncate max-w-50 font-medium">
                          {propertyTitle}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center font-semibold text-sm">
                        <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{payment.amount}</span>
                      </div>
                    </TableCell>
                    <TableCell className="uppercase text-xs font-semibold text-muted-foreground">
                      {payment.provider || "STRIPE"}
                    </TableCell>
                    <TableCell>
                      {getPaymentStatusBadge(payment.status)}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {payment.paidAt
                        ? new Date(payment.paidAt).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/dashboard/tenant/payments/${payment.id}`}>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" /> View Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
