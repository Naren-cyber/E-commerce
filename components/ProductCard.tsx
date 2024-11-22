import { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import Ratings from "./Ratings";
import { formatPrice } from "@/lib/utils";
import LikeButton from "./LikeButton";

function ProductCard({ product }: { product: Product & { id: string } }) {
  return (
    <Link
      href={`/products/${product.id}`}
      key={product.title}
      className="border md:rounded-md"
    >
      <div className="relative aspect-square">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-2"
        />
      </div>
      <div className="px-3 py-2 space-y-2">
        <div className="text-green-600 font-semibold text-xs">
          {product.brand}
        </div>
        <div className="line-clamp-2 text-sm">{product.title}</div>
        <Ratings value={product.ratings} />
        <div>
          <span className="font-semibold">{formatPrice(product.price)}</span>{" "}
          <span className="line-through text-primary/60 text-sm">
            {formatPrice(product.mrp)}
          </span>
          <LikeButton product={product} className="inline float-right" />
        </div>
      </div>
    </Link>
  );
}
export default ProductCard;
