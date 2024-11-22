"use client";

import ProductCard from "@/components/ProductCard";
import { useSelector } from "@/stores/ReduxProvider";

export default function FavouritesPage() {
  const items = useSelector((state) => state.favourites.items);

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 md:gap-5 border md:border-none max-w-[calc(100vw-16px)] p-2 md:px-24">
      {items.map((p) => (
        <ProductCard product={p} key={p.id} />
      ))}
    </div>
  );
}
