import { Skeleton } from "@/components/ui/skeleton";

export const ProfileSkeleton = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 border rounded-xl bg-card space-y-8">
      {/* Header Profile Info */}
      <div className="flex items-center gap-6 pb-6 border-b">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </div>

      {/* Profile Form Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>

      {/* Button Placeholder */}
      <div className="flex justify-end pt-4">
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
