"use client";
import { useSelector } from "@/stores/ReduxProvider";
import { PropsWithChildren } from "react";

function FavouriteBadge({ children }: PropsWithChildren) {
  const total = useSelector((state) => state.favourites.items.length);

  if (!total) return children;

  return (
    <div className="relative">
      {children}
      <div className="absolute -right-2 -top-2 bg-red-500 text-white px-1 text-xs rounded-full">
        {total}
      </div>
    </div>
  );
}
export default FavouriteBadge;
