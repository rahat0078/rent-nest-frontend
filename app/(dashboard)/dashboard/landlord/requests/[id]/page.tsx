import { LandlordHeader } from "@/components/dashboard/landlord/landlord-header";
import { StatusBadge } from "@/components/dashboard/landlord/status-badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Bed, Bath, Ruler } from "lucide-react";

export default function RequestDetailsPage() {
  return (
    <>
      <LandlordHeader
        title="Rental Request Details"
        description="Review the full request details and tenant information"
      />

      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6 max-w-4xl">
          {/* Back Button */}
          <Link href="/dashboard/landlord/requests">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Requests
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tenant Information */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-lg font-bold text-foreground mb-4">
                  Tenant Information
                </h2>
                <div className="flex gap-4">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                    alt="Tenant"
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground">
                      Sarah Johnson
                    </h3>
                    <div className="space-y-2 mt-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        sarah.johnson@email.com
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        +1 (555) 123-4567
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Information */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-lg font-bold text-foreground mb-4">
                  Property Information
                </h2>
                <div className="space-y-4">
                  <div className="relative h-48 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop"
                      alt="Property"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      Luxury Apartment Downtown
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>Downtown, New York</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 py-3 border-y border-border">
                    <div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
                        <Bed className="w-4 h-4 text-primary" />2 Beds
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Bedrooms
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
                        <Bath className="w-4 h-4 text-primary" />2 Baths
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Bathrooms
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
                        <Ruler className="w-4 h-4 text-primary" />
                        1200 sq ft
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Size</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary">৳3,500</p>
                    <p className="text-xs text-muted-foreground">per month</p>
                  </div>
                </div>
              </div>

              {/* Request Details */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-lg font-bold text-foreground mb-4">
                  Request Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Move-in Date
                    </label>
                    <p className="text-foreground mt-1">January 15, 2025</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Status
                    </label>
                    <div className="mt-1">
                      <StatusBadge status="PENDING" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Tenant Message
                    </label>
                    <p className="text-foreground mt-1 bg-muted p-3 rounded-lg">
                      I m very interested in renting this beautiful apartment in
                      downtown New York. The location is perfect for my work,
                      and I love the modern design of the property. I m ready to
                      move in anytime and can provide all necessary
                      documentation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-xl p-6 sticky top-6">
                <h3 className="font-bold text-foreground mb-4">
                  Request Actions
                </h3>
                <div className="space-y-2">
                  <Button className="w-full" size="lg">
                    Approve Request
                  </Button>
                  <Button variant="destructive" className="w-full" size="lg">
                    Reject Request
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    Contact Tenant
                  </Button>
                </div>

                {/* Request Meta */}
                <div className="mt-6 pt-6 border-t border-border space-y-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase">
                      Request ID
                    </p>
                    <p className="text-sm text-foreground mt-1">
                      #REQ-2025-001
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase">
                      Submitted
                    </p>
                    <p className="text-sm text-foreground mt-1">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
