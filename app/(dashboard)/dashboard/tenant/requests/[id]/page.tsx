import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Ruler, ArrowLeft } from "lucide-react";
import { LandlordCard } from "@/components/dashboard/tenant/landlord-card";
import { Amenities } from "@/components/dashboard/tenant/amenities";
import { RequestTimeline } from "@/components/dashboard/tenant/request-timeline";
import { PropertySummaryCard } from "@/components/dashboard/tenant/property-summary-card";
import { getSingleRentalRequest } from "../../_tenantActions/getSingleRental";

export interface TSingleRentalRequestResponse {
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
    description: string;
    location: string;
    rentAmount: number;
    bedrooms: number;
    bathrooms: number;
    sizeSqFt: number;
    facilities: string[];
    images: string;
    isAvailable: boolean;
    createdAt: string;

    category: {
      id: string;
      name: string;
      description: string;
    };

    landlord: {
      id: string;
      name: string;
      email: string;
      profilePhoto: string | null;
    };
  };
}

const getStatusStep = (
  status: string,
): "submitted" | "approved" | "payment" | "active" | "completed" => {
  switch (status) {
    case "PENDING":
      return "submitted";
    case "APPROVED":
      return "approved";
    case "ACTIVE":
      return "active";
    case "COMPLETED":
      return "completed";
    default:
      return "submitted";
  }
};



export default async function RentalRequestDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const {id} = await params;
  const request = await getSingleRentalRequest(id);

  if (!request.data) {
    return <div>Rental request not found.</div>;
  }

  const { property } = request.data;
  console.log(request)

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" className="mb-4 gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Requests
          </Button>
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              {property.title}
            </h1>
            <p className="text-muted-foreground flex items-center gap-2 text-sm sm:text-base">
              <MapPin className="w-4 h-4 shrink-0" />
              {property.location}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content (70%) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Image */}
            <div className="relative w-full h-64 sm:h-96 rounded-xl overflow-hidden shadow-lg">
              <Image
                unoptimized
                src={property.images || "/placeholder.jpg"}
                alt={property.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <Badge>
                  {property.category.name}
                </Badge>
                <Badge
                  className={
                    property.isAvailable
                      ? "bg-green-500/10 text-green-700 border-green-200"
                      : "bg-red-500/10 text-red-700 border-red-200"
                  }
                >
                  {property.isAvailable ? "Available" : "Unavailable"}
                </Badge>
              </div>
            </div>

            {/* Property Details Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-card border border-border rounded-lg p-3 sm:p-4 text-center">
                <div className="flex justify-center mb-2">
                  <Bed className="w-5 h-5 text-primary" />
                </div>
                <p className="text-xl sm:text-2xl font-bold text-foreground">
                  {property.bedrooms}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Bedrooms
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-3 sm:p-4 text-center">
                <div className="flex justify-center mb-2">
                  <Bath className="w-5 h-5 text-primary" />
                </div>
                <p className="text-xl sm:text-2xl font-bold text-foreground">
                  {property.bathrooms}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Bathrooms
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-3 sm:p-4 text-center">
                <div className="flex justify-center mb-2">
                  <Ruler className="w-5 h-5 text-primary" />
                </div>
                <p className="text-xl sm:text-2xl font-bold text-foreground">
                  {property.sizeSqFt}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  sq ft
                </p>
              </div>
            </div>

            {/* Request Details Card */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                Request Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Request Status
                  </p>
                  <Badge className="mt-2 bg-blue-500/10 text-blue-700 border-blue-200">
                    {request.data.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Move-in Date</p>
                  <p className="mt-2 font-semibold text-foreground">
                    {new Date(request.data.moveInDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Request Submitted
                  </p>
                  <p className="mt-2 font-semibold text-foreground">
                    {new Date(request.data.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Your Message
                </p>
                <p className="text-foreground bg-muted/50 rounded-lg p-3 text-sm sm:text-base">
                  {request.message || "No message provided."}
                </p>
              </div>
            </div>

            {/* Landlord Card */}
            <LandlordCard
              name={property.landlord.name}
              email={property.landlord.email}
              avatar={property.landlord.profilePhoto}
            />

            {/* Description */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                Property Description
              </h2>
              <p className="text-foreground leading-relaxed text-sm sm:text-base">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <Amenities amenities={property.facilities} />

            {/* Timeline */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Rental Process Timeline
              </h2>
              <RequestTimeline currentStep={getStatusStep(request.data.status)} />
            </div>
          </div>

          {/* Right Sidebar (30%) - Sticky Summary Card */}
          <div className="lg:col-span-1">
            <PropertySummaryCard
              monthlyRent={property.rentAmount}
              status={request.data.status}
              moveInDate={new Date(request.data.moveInDate).toLocaleDateString()}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
