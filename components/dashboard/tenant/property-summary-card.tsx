"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Home } from "lucide-react";

interface PropertySummaryCardProps {
  monthlyRent: number;
  status: "PENDING" | "APPROVED" | "REJECTED" | "ACTIVE" | "COMPLETED";
  moveInDate: string;
}

export function PropertySummaryCard({
  monthlyRent,
  status,
  moveInDate,
}: PropertySummaryCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "APPROVED":
        return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "ACTIVE":
        return "bg-green-500/10 text-green-700 border-green-200";
      case "COMPLETED":
        return "bg-gray-500/10 text-gray-700 border-gray-200";
      case "REJECTED":
        return "bg-red-500/10 text-red-700 border-red-200";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const getActionButton = () => {
    switch (status) {
      case "APPROVED":
        return (
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Pay Now
          </Button>
        );
      case "ACTIVE":
      case "COMPLETED":
        return (
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Leave Review
          </Button>
        );
      case "PENDING":
        return (
          <Button disabled className="w-full">
            Waiting for Approval
          </Button>
        );
      case "REJECTED":
        return (
          <Button variant="outline" disabled className="w-full">
            Request Rejected
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="sticky top-24 bg-card border border-border rounded-xl p-6 space-y-6">
      {/* Rent */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Monthly Rent</p>
        <p className="text-3xl font-bold text-foreground">
          ${monthlyRent?.toLocaleString()}
        </p>
      </div>

      {/* Status */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Status</p>
        <Badge className={`${getStatusColor()} border`}>{status}</Badge>
      </div>

      {/* Move-in Date */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Move-in Date</p>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          <p className="font-semibold text-foreground">{moveInDate}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Action Button */}
      {getActionButton()}

      {/* View Property Button */}
      <Button variant="outline" className="w-full">
        <Home className="w-4 h-4 mr-2" />
        View Property
      </Button>
    </div>
  );
}
