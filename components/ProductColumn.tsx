"use client";
import Heading from "@/components/Heading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import _ from "lodash";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "./LikeButton";

export default function ProductColumns({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  const isMobile = useIsMobile();
  const chunks = _.chunk(products, isMobile ? 2 : 4);

  return (
    <div>
      <Heading>{title}</Heading>
      <Carousel>
        <CarouselContent className="max-w-[100vw]">
          {chunks.map((chunk) => (
            <CarouselItem key={chunk.map((p) => p.title).join(",")}>
              <div className="grid gap-2 md:gap-3">
                {chunk.map((p) => (
                  <Link
                    href={`/products/${p.id}`}
                    key={p.title}
                    className="p-2 border rounded-md gap-2 flex items-center"
                  >
                    <Image
                      src={p.image}
                      alt={p.title}
                      height={75}
                      width={75}
                      className="object-fit"
                    />
                    <div className="flex flex-col gap-1 flex-grow">
                      <div className="font-semibold line-clamp-1 text-sm">
                        {p.title}
                      </div>
                      <div className="capitalize text-sm">{p.category}</div>
                      <div className="flex items-center">
                        <span className="text-green-700 font-semibold">
                          {formatPrice(p.price)}
                        </span>{" "}
                        <span className="line-through text-sm text-primary/60">
                          {formatPrice(p.mrp)}
                        </span>
                        <LikeButton product={p} className="ml-auto" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
