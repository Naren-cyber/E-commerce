"use client";
import _ from "lodash";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProductGroupProps } from "@/lib/types";
import Heading from "./Heading";
import ProductCard from "./ProductCard";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

function ProductsSlider({ products, title }: ProductGroupProps<"awaited">) {
  const isMobile = useIsMobile();
  const chunks = _.chunk(products, isMobile ? 2 : 5);

  return (
    !!products.length && (
      <Carousel className="md:px-24 py-5 px-2">
        <Heading>{title}</Heading>
        <CarouselContent className="border md:border-none">
          {chunks.map((chunk) => (
            <CarouselItem key={chunk.map((p) => p.title).join(",")}>
              <div className="grid grid-cols-2 md:grid-cols-5 md:gap-5">
                {chunk.map((p) => (
                  <ProductCard key={p.title} product={p} />
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    )
  );
}
export default ProductsSlider;
