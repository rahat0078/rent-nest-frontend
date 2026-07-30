import { Skeleton } from "@/components/ui/skeleton";

interface DashboardStatsSkeletonProps {
  count?: number;
}

export const DashboardStatsSkeleton = ({
  count = 4,
}: DashboardStatsSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="p-6 border rounded-xl bg-card space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-3 w-32" />
        </div>
      ))}
    </div>
  );
};

export default DashboardStatsSkeleton;
