import { ProductGroupProps } from "@/lib/types";
import { Suspense } from "react";
import Heading from "./Heading";
import ProductCard from "./ProductCard";
import { Skeleton } from "./ui/skeleton";

export default function ProductGrid({
  title,
  products,
  actions,
}: ProductGroupProps) {
  const Comp = async () => {
    products = await products;

    return products.map((p) => <ProductCard key={p.id} product={p} />);
  };

  return (
    <div>
      {!!title && (
        <Heading>
          <div className="flex justify-between">
            {title}
            <div>{actions}</div>
          </div>
        </Heading>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 md:gap-5 border md:border-none max-w-[calc(100vw-16px)]">
        <Suspense
          fallback={Array.from({ length: 12 }, (_, idx) => idx).map((key) => (
            <Skeleton key={key} className="aspect-[0.7]" />
          ))}
        >
          <Comp />
        </Suspense>
      </div>
    </div>
  );
}

export const ProductGridSkeleton = () => (
  <div>
    <Skeleton className="w-48 h-10 md:mb-5 mb-2" />
    <div className="grid grid-cols-2 md:grid-cols-4 md:gap-5 border md:border-none max-w-[calc(100vw-16px)]">
      {Array.from({ length: 12 }, (_, idx) => idx).map((key) => (
        <Skeleton key={key} className="aspect-[0.7]" />
      ))}
    </div>
  </div>
);
