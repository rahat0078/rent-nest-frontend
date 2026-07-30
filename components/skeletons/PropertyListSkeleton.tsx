import { PropertyCardSkeleton } from "./PropertyCardSkeleton";

interface PropertyListSkeletonProps {
  count?: number;
}

export const PropertyListSkeleton = ({
  count = 6,
}: PropertyListSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {Array.from({ length: count }).map((_, index) => (
        <PropertyCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default PropertyListSkeleton;
