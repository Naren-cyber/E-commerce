"use client";

import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { like, dislike } from "@/stores/favouriteReducer";
import { useSelector } from "@/stores/ReduxProvider";
import { ClassValue } from "clsx";
import { Heart } from "lucide-react";
import { useDispatch } from "react-redux";
import ActionTooltip from "./ActionTooltip";

function LikeButton({
  product,
  className = "",
  size = 16,
}: {
  product: Product;
  className?: ClassValue;
  size?: number;
}) {
  const dispatch = useDispatch();
  const isLiked = useSelector(
    (p) => !!p.favourites.items.find((p) => p.id === product.id)
  );
  return (
    <ActionTooltip
      title={isLiked ? "Remove from favourites" : "Add to favourites"}
    >
      <Heart
        role="button"
        onClick={(e) => {
          e.preventDefault();
          dispatch(isLiked ? dislike(product) : like(product));
        }}
        className={cn(className, isLiked && "text-red-500 fill-red-500")}
        size={size}
      />
    </ActionTooltip>
  );
}
export default LikeButton;
