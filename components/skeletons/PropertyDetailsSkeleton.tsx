import { Skeleton } from "@/components/ui/skeleton";

export const PropertyDetailsSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-7xl">
      {/* Title & Header info */}
      <div className="space-y-3">
        <Skeleton className="h-8 w-3/4 max-w-xl" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      {/* Image Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[350px] md:h-[450px]">
        <Skeleton className="md:col-span-2 h-full w-full rounded-xl" />
        <div className="hidden md:grid grid-rows-2 gap-4 h-full">
          <Skeleton className="h-full w-full rounded-xl" />
          <Skeleton className="h-full w-full rounded-xl" />
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section - Description & Features */}
        <div className="lg:col-span-2 space-y-6">
          {/* Host Info */}
          <div className="flex items-center gap-4 pb-6 border-b">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 py-4 border-b">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>

          {/* Description Paragraphs */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>

        {/* Right Section - Sidebar Booking Card */}
        <div className="border rounded-xl p-6 space-y-6 h-fit shadow-sm">
          <div className="flex justify-between items-center">
            <Skeleton className="h-7 w-28" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-11 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsSkeleton;
