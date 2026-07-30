import { Skeleton } from "@/components/ui/skeleton";

export const PropertyCardSkeleton = () => {
  return (
    <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
      {/* Property Image Placeholder */}
      <Skeleton className="h-48 w-full rounded-b-none" />

      <div className="p-4 flex flex-col gap-3">
        {/* Title and Badge */}
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-5 w-3/5" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>

        {/* Location */}
        <Skeleton className="h-4 w-2/5" />

        {/* Property Features (Beds, Baths, Sqft) */}
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
        </div>

        {/* Divider */}
        <div className="border-t my-1" />

        {/* Price & Action */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default PropertyCardSkeleton;
