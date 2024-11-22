import { ProductGridSkeleton } from "@/components/ProductGrid";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <div className="md:px-24 px-2 pb-5 grid gap-5 md:grid-cols-[1fr_3fr]">
      <div className="hidden md:block">
        <FilterSkeleton />
      </div>
      <ProductGridSkeleton />
    </div>
  );
}

const FilterSkeleton = () => (
  <div className="space-y-2">
    <Skeleton className="h-24" />
    <Skeleton className="h-24" />
    <Skeleton className="h-24" />
  </div>
);
