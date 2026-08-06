"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit2, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  getMyProperties,
  TPropertyResponseLandlordOwn,
} from "../_landlordActions.ts/getMyProperties";
import { updateProperty } from "../_landlordActions.ts/updateProperty";
import { LandlordHeader } from "@/components/dashboard/landlord/landlord-header";

export default function PropertiesPage() {
  const [properties, setProperties] = useState<TPropertyResponseLandlordOwn[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  // 1. Declare fetchProperties BEFORE useEffect to fix variable access order
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getMyProperties();
        if (res?.data) {
          setProperties(res.data);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error.message || "Could not load properties");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleToggleAvailability = async (
    id: string,
    currentStatus: boolean,
  ) => {
    const nextStatus = !currentStatus;

    // Optimistic UI Update
    setProperties((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isAvailable: nextStatus } : item,
      ),
    );
    setTogglingId(id);

    try {
      await updateProperty(id, { isAvailable: nextStatus });
      toast.success(
        `Property marked as ${nextStatus ? "Available" : "Unavailable"}`,
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Revert Optimistic Update on failure
      setProperties((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isAvailable: currentStatus } : item,
        ),
      );
      toast.error(error.message || "Failed to update availability");
    } finally {
      setTogglingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <LandlordHeader
          title="Dashboard"
          description="Welcome back! Here's an overview of your rental business."
        />
      </div>

      <div className="flex items-center justify-between px-4 md:px-6 lg:px-10">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Properties</h2>
          <p className="text-sm text-muted-foreground">
            Manage your listed properties and availability.
          </p>
        </div>
        <Button>
          <Link href="/dashboard/landlord/properties/new" className="flex justify-center items-center gap-2">
            <Plus className="h-4 w-4" /> Add Property
          </Link>                                                                                             
        </Button>
      </div>

      <div className="px-4 md:px-6 lg:px-10">
        {properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border p-12 text-center">
            <p className="text-lg font-medium">No properties found</p>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              You have not listed any properties yet.
            </p>
            <Button className="flex justify-center items-center gap-2">
              <Link href="/dashboard/landlord/properties/new">
                <Plus className="mr-2 h-4 w-4" /> Add Property
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative h-48 w-full bg-muted">
                  <Image
                    unoptimized
                    src={property.images}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge
                      variant={property.isAvailable ? "default" : "secondary"}
                      className={
                        property.isAvailable
                          ? "bg-emerald-500/90 hover:bg-emerald-500 text-white"
                          : "bg-muted-foreground/80 text-white"
                      }
                    >
                      {property.isAvailable ? "Available" : "Occupied / Off"}
                    </Badge>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-lg line-clamp-1 text-foreground">
                      {property.title}
                    </h3>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {property.location}
                  </p>

                  <div className="flex items-baseline justify-between pt-2 border-t border-border">
                    <div>
                      <span className="text-xl font-bold text-foreground">
                        ${property.rentAmount}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {" "}
                        / month
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          Available
                        </span>
                        <Switch
                          checked={property.isAvailable}
                          disabled={togglingId === property.id}
                          onCheckedChange={() =>
                            handleToggleAvailability(
                              property.id,
                              property.isAvailable,
                            )
                          }
                        />
                      </div>

                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Link
                          href={`/dashboard/landlord/properties/${property.id}/edit`}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
