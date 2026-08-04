import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./status-badge";

interface RentalRequestCardProps {
  id: string;
  tenantImage: string;
  tenantName: string;
  propertyTitle: string;
  moveInDate: string;
  message: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "ACTIVE" | "COMPLETED";
}

export function RentalRequestCard({
  id,
  tenantImage,
  tenantName,
  propertyTitle,
  moveInDate,
  message,
  status,
}: RentalRequestCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {/* Tenant Avatar */}
        <Image
          unoptimized
          src={tenantImage}
          alt={tenantName}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover"
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground">{tenantName}</h3>
              <p className="text-sm text-muted-foreground truncate">
                {propertyTitle}
              </p>
            </div>
            <StatusBadge status={status} />
          </div>

          <p className="text-xs text-muted-foreground mt-2">
            Move-in: {moveInDate}
          </p>
          <p className="text-sm text-foreground mt-2 line-clamp-2">{message}</p>

          {/* Actions */}
          <div className="flex gap-2 mt-3">
            <Link
              href={`/dashboard/landlord/requests/${id}`}
              className="flex-1"
            >
              <Button variant="outline" size="sm" className="w-full">
                View Details
              </Button>
            </Link>
            {status === "PENDING" && (
              <>
                <Button variant="default" size="sm" className="flex-1">
                  Approve
                </Button>
                <Button variant="destructive" size="sm" className="flex-1">
                  Reject
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
