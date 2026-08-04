import { notFound } from "next/navigation";
import { PropertyAmenities } from "@/components/property/propertyAmenities";
import { PropertyGallery } from "@/components/property/propertyGallery";
import { PropertyLandlordCard } from "@/components/property/propertyLandlordCard";
import { PropertySummaryCard } from "@/components/property/propertySummaryCard";
import { ReviewCard } from "@/components/property/reviewCard";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";
import { getSingleProperty } from "../../_propertyActions/getSingleProperty";
import { getAllProperty } from "../../_propertyActions/getAllProperty";
import { IReview } from "@/types/review";
import { RelatedProperties } from "@/components/property/relatedProperties";
import { toast } from "sonner";

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const propertyResponse = await getSingleProperty(id);
  const property = propertyResponse?.data;

  if (!property) {
    notFound();
  }

  const relatedPropertiesResponse = await getAllProperty({
    category: property.categoryId,
  });
  if (relatedPropertiesResponse.data === null) {
    toast.error("not found")
  }

  const relatedData = relatedPropertiesResponse.data.data
    .filter((p) => p.id !== property.id)
    .slice(0, 3)
    .map((p) => ({
      ...p,
    }));

  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4 pb-16">
        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <PropertyGallery
              images={[property.images]}
              title={property.title}
            />

            {/* Property Header */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-primary text-primary-foreground">
                  {property.category.name}
                </Badge>
                <Badge
                  variant={property.isAvailable ? "default" : "destructive"}
                >
                  {property.isAvailable ? "Available" : "Rented"}
                </Badge>
              </div>

              <h1 className="text-4xl font-bold text-foreground">
                {property.title}
              </h1>

              <div className="flex items-center gap-6 flex-wrap text-lg">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  {property.location}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-5 h-5 text-primary" />
                  Posted on {new Date(property.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Property Details Grid */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-card rounded-lg border border-border">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Bedrooms</p>
                <p className="text-2xl font-bold text-primary">
                  {property.bedrooms}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Bathrooms</p>
                <p className="text-2xl font-bold text-primary">
                  {property.bathrooms}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Size</p>
                <p className="text-2xl font-bold text-primary">
                  {property.sizeSqFt} sq ft
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                Description
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <PropertyAmenities facilities={property.facilities} />

            {/* Landlord Card */}
            <PropertyLandlordCard
              name={property.landlord.name}
              profilePhoto={
                property.landlord.profilePhoto ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(property.landlord.name)}`
              }
              email={property.landlord.email}
              phone={"N/A"} // Phone is missing from User Prisma schema, providing default
              isVerified={true} // Add boolean to schema if you want real verification check
            />

            {/* Reviews */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">
                Reviews ({property.reviewCount || 0})
              </h2>
              {property.review && property.review.length > 0 ? (
                <div className="grid gap-4">
                  {property.review.map((reviewItem: IReview) => (
                    <ReviewCard
                      key={reviewItem.id}
                      avatar={
                        reviewItem.tenant?.profilePhoto ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(reviewItem.tenant?.name || "User")}`
                      }
                      name={reviewItem.tenant?.name || "Anonymous User"}
                      rating={reviewItem.rating}
                      text={reviewItem.review}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground italic">
                  No reviews yet for this property.
                </p>
              )}
            </div>

            {/* Related Properties */}
            {relatedData.length > 0 && (
              <RelatedProperties properties={relatedData} />
            )}
          </div>

          {/* Right Column - Summary Card */}
          <div className="lg:col-span-1">
            <PropertySummaryCard
              propertyId={property.id}
              rentAmount={property.rentAmount}
              isAvailable={property.isAvailable}
              category={property.category.name}
              sizeSqFt={property.sizeSqFt}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
