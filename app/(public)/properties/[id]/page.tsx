

import { PropertyAmenities } from "@/components/property/propertyAmenities";
import { PropertyGallery } from "@/components/property/propertyGallery";
import { PropertyLandlordCard } from "@/components/property/propertyLandlordCard";
import { PropertySummaryCard } from "@/components/property/propertySummaryCard";
import { RelatedProperties } from "@/components/property/relatedProperties";
import { ReviewCard } from "@/components/property/reviewCard";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";
// import { useRouter } from "next/navigation";

// Mock property data - replace with API call
const PROPERTY = {
  id: "1",
  title: "Modern Downtown Apartment",
  description:
    "Experience luxury living in this stunning downtown apartment. Located in the heart of the city with easy access to restaurants, shops, and entertainment. The apartment features high-end finishes, modern appliances, and floor-to-ceiling windows with breathtaking city views. Perfect for professionals or small families seeking a premium urban lifestyle.",
  location: "123 Main St, New York, NY",
  rentAmount: 2500,
  bedrooms: 2,
  bathrooms: 1,
  sizeSqFt: 850,
  images: [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1502088113235-c3a393e8353d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
  ],
  isAvailable: true,
  facilities: [
    "WiFi",
    "Lift",
    "Generator",
    "Parking",
    "24/7 Security",
    "CCTV",
    "Reception",
    "Meeting Room",
  ],
  category: "Apartment",
  postedDate: "2024-01-15",
  landlord: {
    name: "John Smith",
    profilePhoto:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    isVerified: true,
  },
  reviews: [
    {
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      name: "Alice Johnson",
      rating: 5,
      text: "Absolutely wonderful place! The apartment is clean, spacious, and well-maintained. The landlord is responsive and professional. Highly recommended!",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      name: "Michael Chen",
      rating: 5,
      text: "Great location with excellent amenities. The security features give me peace of mind. Great value for the price. Already renewed my lease!",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      name: "Sarah Williams",
      rating: 4,
      text: "Very nice apartment in a prime location. Building management is efficient and courteous. Only minor issue with noise on weekends.",
    },
  ],
  relatedProperties: [
    {
      id: "2",
      title: "Cozy Studio in Brooklyn",
      location: "456 Park Ave, Brooklyn, NY",
      rentAmount: 1800,
      bedrooms: 0,
      bathrooms: 1,
      sizeSqFt: 450,
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1502088113235-c3a393e8353d?w=500&h=400&fit=crop",
      ],
      isAvailable: true,
      facilities: ["WiFi", "Air Conditioning"],
      category: "Studio",
      landlord: {
        name: "Sarah Johnson",
        profilePhoto:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      },
    },
    {
      id: "4",
      title: "Family Home in Suburbs",
      location: "321 Elm St, Austin, TX",
      rentAmount: 3200,
      bedrooms: 3,
      bathrooms: 2,
      sizeSqFt: 1500,
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&h=400&fit=crop",
      ],
      isAvailable: true,
      facilities: ["WiFi", "Parking", "Backyard", "Garage"],
      category: "Family House",
      landlord: {
        name: "Emily Davis",
        profilePhoto:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      },
    },
    {
      id: "7",
      title: "Charming Apartment Near Park",
      location: "234 Maple Ave, Boston, MA",
      rentAmount: 2100,
      bedrooms: 1,
      bathrooms: 1,
      sizeSqFt: 650,
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop",
      ],
      isAvailable: true,
      facilities: ["WiFi", "Air Conditioning", "Laundry"],
      category: "Apartment",
      landlord: {
        name: "Robert Taylor",
        profilePhoto:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      },
    },
  ],
};

export default function PropertyDetailsPage() {
  // const router = useRouter();

  // const handleViewDetails = (id: string) => {
  //   router.push(`/properties/${id}`);
  // };

  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4 pb-16">
        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <PropertyGallery images={PROPERTY.images} title={PROPERTY.title} />

            {/* Property Header */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-primary text-primary-foreground">
                  {PROPERTY.category}
                </Badge>
                <Badge
                  variant={PROPERTY.isAvailable ? "default" : "destructive"}
                >
                  {PROPERTY.isAvailable ? "Available" : "Rented"}
                </Badge>
              </div>

              <h1 className="text-4xl font-bold text-foreground">
                {PROPERTY.title}
              </h1>

              <div className="flex items-center gap-6 flex-wrap text-lg">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  {PROPERTY.location}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-5 h-5 text-primary" />
                  Posted on {new Date(PROPERTY.postedDate).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Property Details Grid */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-card rounded-lg border border-border">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Bedrooms</p>
                <p className="text-2xl font-bold text-primary">
                  {PROPERTY.bedrooms}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Bathrooms</p>
                <p className="text-2xl font-bold text-primary">
                  {PROPERTY.bathrooms}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Size</p>
                <p className="text-2xl font-bold text-primary">
                  {PROPERTY.sizeSqFt} sq ft
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                Description
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {PROPERTY.description}
              </p>
            </div>

            {/* Amenities */}
            <PropertyAmenities facilities={PROPERTY.facilities} />

            {/* Landlord Card */}
            <PropertyLandlordCard
              name={PROPERTY.landlord.name}
              profilePhoto={PROPERTY.landlord.profilePhoto}
              email={PROPERTY.landlord.email}
              phone={PROPERTY.landlord.phone}
              isVerified={PROPERTY.landlord.isVerified}
            />

            {/* Reviews */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Reviews</h2>
              <div className="grid gap-4">
                {PROPERTY.reviews.map((review, index) => (
                  <ReviewCard
                    key={index}
                    avatar={review.avatar}
                    name={review.name}
                    rating={review.rating}
                    text={review.text}
                  />
                ))}
              </div>
            </div>

            {/* Related Properties */}
            <RelatedProperties
              properties={PROPERTY.relatedProperties}
              // onViewDetails={handleViewDetails}
            />
          </div>

          {/* Right Column - Summary Card */}
          <div className="lg:col-span-1">
            <PropertySummaryCard
              rentAmount={PROPERTY.rentAmount}
              isAvailable={PROPERTY.isAvailable}
              category={PROPERTY.category}
              sizeSqFt={PROPERTY.sizeSqFt}
              bedrooms={PROPERTY.bedrooms}
              bathrooms={PROPERTY.bathrooms}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
