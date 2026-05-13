import { cn } from "@/shared/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200/60", className)}
      {...props}
    />
  );
}

export function ProductSkeleton() {
  return (
    <div className="card-premium p-8 h-full flex flex-col">
      <Skeleton className="aspect-[4/3] w-full rounded-[2rem] mb-8" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-24 rounded-full" />
        <Skeleton className="h-8 w-full rounded-xl" />
        <div className="flex justify-between items-end pt-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-32 rounded-lg" />
            <Skeleton className="h-3 w-16 rounded-full" />
          </div>
          <Skeleton className="h-10 w-24 rounded-xl" />
        </div>
        <Skeleton className="h-14 w-full rounded-2xl mt-4" />
      </div>
    </div>
  );
}
