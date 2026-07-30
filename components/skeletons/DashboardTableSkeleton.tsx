import { Skeleton } from "@/components/ui/skeleton";

interface DashboardTableSkeletonProps {
  rows?: number;
  columns?: number;
}

export const DashboardTableSkeleton = ({
  rows = 5,
  columns = 4,
}: DashboardTableSkeletonProps) => {
  return (
    <div className="w-full border rounded-xl overflow-hidden bg-card">
      {/* Table Header */}
      <div className="flex items-center justify-between border-b bg-muted/40 px-6 py-3">
        {Array.from({ length: columns }).map((_, idx) => (
          <Skeleton key={idx} className="h-4 w-24" />
        ))}
      </div>

      {/* Table Rows */}
      <div className="divide-y">
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <div
            key={rowIdx}
            className="flex items-center justify-between px-6 py-4"
          >
            {Array.from({ length: columns }).map((_, colIdx) => (
              <Skeleton
                key={colIdx}
                className={`h-4 ${
                  colIdx === 0 ? "w-32" : colIdx === columns - 1 ? "w-16" : "w-20"
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardTableSkeleton;