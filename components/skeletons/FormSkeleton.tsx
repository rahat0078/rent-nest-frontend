import { Skeleton } from "@/components/ui/skeleton";

interface FormSkeletonProps {
  fields?: number;
}

export const FormSkeleton = ({ fields = 4 }: FormSkeletonProps) => {
  return (
    <div className="w-full p-6 border rounded-xl bg-card space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: fields }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        ))}
      </div>

      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
};

export default FormSkeleton;