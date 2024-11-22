import { Product } from "@/lib/types";
import Heading from "./Heading";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Image from "next/image";
import Ratings from "./Ratings";
import { formatPrice } from "@/lib/utils";
import { Button } from "./ui/button";
import AvailabilityViewer from "./AvailabilityViewer";
import Expiry from "./expiry";

export default function DealOfTheDay({
  products,
}: {
  products: (Product & {
    quantity: { sold: number; available: number };
    expiry: Date;
  })[];
}) {
  return null;
  return (
    <div>
      <Heading>Deal Of The Day</Heading>
      <Carousel>
        <CarouselContent>
          {products.map((p) => (
            <CarouselItem key={p.title}>
              <div className="p-2 md:p-5 border rounded-md grid gap-2 md:gap-5 md:grid-cols-2 h-full">
                <Image
                  src={p.image}
                  alt={p.title}
                  height={500}
                  width={500}
                  className="object-contain w-[70vw] md:w-[500px] m-auto"
                />
                <div>
                  <Ratings value={p.ratings} />
                  <div className="font-semibold uppercase mt-5 mb-2">
                    {p.title}
                  </div>
                  <p className="text-primary/60">{p.description}</p>
                  <div className="text-2xl my-2">
                    <span className="text-green-700 font-bold">
                      {formatPrice(p.price)}
                    </span>{" "}
                    <span className="line-through text-primary/60">
                      {formatPrice(p.mrp)}
                    </span>
                  </div>
                  <Button
                    variant="success"
                    // size="lg"
                    className="uppercase font-bold my-2 rounded-md"
                  >
                    Add to Cart
                  </Button>
                  <AvailabilityViewer
                    sold={p.quantity.sold}
                    available={p.quantity.available}
                  />
                  <Expiry expiry={p.expiry} />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
