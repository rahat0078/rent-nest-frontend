"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2, Eye, Calendar, DollarSign, Home, User } from "lucide-react";
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
import { IRentalRequest, TRentalStatus } from "@/types/rentalRequest";
import { getRentalRequests } from "../_landlordActions.ts/getRentalRequests";
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

export default function RentalRequestsPage() {
  const [requests, setRequests] = useState<IRentalRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRequests() {
      try {
        setLoading(true);
        const res = await getRentalRequests();
        if (res.success) {
          setRequests(res.data || []);
        } else {
          toast.error(res.message || "Failed to fetch rental requests");
        }
      } catch (error: unknown) {
        const msg =
          error instanceof Error
            ? error.message
            : "Failed to fetch rental requests";
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <LandlordHeader
        title={"Rental Requests"}
        description={"Manage incoming rental applications for your properties."}
      />

      {requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed rounded-xl bg-card">
          <p className="text-muted-foreground font-medium">
            No rental requests found.
          </p>
        </div>
      ) : (
        <div className="px-4 md:px-6 lg:px-8">
          <div className="border border-border rounded-xl overflow-hidden bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Rent</TableHead>
                  <TableHead>Move-In Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => {
                  const categoryName =
                    typeof request.property?.category === "object"
                      ? request.property?.category?.name
                      : request.property?.category || "N/A";

                  const rent =
                    request.property?.rentAmount ?? request.property?.rent ?? 0;

                  return (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{request.tenant?.name || "N/A"}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Home className="h-4 w-4 text-muted-foreground" />
                          <span className="truncate max-w-45">
                            {request.property?.title || "N/A"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{categoryName}</TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{rent}/mo</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>
                            {new Date(request.moveInDate).toLocaleDateString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link
                          href={`/dashboard/landlord/requests/${request.id}`}
                        >
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
        </div>
      )}
    </div>
  );
}
