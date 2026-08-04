import { RentalRequestCard } from "@/components/dashboard/tenant/rental-request-card";
import { RentalRequestEmptyState } from "@/components/dashboard/tenant/rental-request-empy-state";
import { RentalRequestTable } from "@/components/dashboard/tenant/rental-request-table";
import { getAllRentalRequest } from "../_tenantActions/getAllRentals";

export default async function RentalRequestsPage() {
  const myRentals = await getAllRentalRequest();
  const hasRequests = myRentals.data.length > 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          My Rental Requests
        </h1>
        <p className="text-muted-foreground mt-2">
          Track all your rental requests and their current status.
        </p>
      </div>

     

      {!hasRequests ? (
        <RentalRequestEmptyState />
      ) : (
        <>
          <div className="md:hidden space-y-4">
            {myRentals.data.map((rental) => (
              <RentalRequestCard key={rental.id} data={rental} />
            ))}
          </div>

          <div className="hidden md:block">
            <RentalRequestTable requests={myRentals.data} />
          </div>
        </>
      )}
    </div>
  );
}
