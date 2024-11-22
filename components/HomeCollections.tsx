"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import _ from "lodash";
import Image from "next/image";
import Link from "next/link";

import { useIsMobile } from "@/hooks/use-mobile";

const collections = [
  {
    label: "Dress & Frock",
    href: "#",
    quantity: 53,
    image:
      "https://e-commerce-templates.vercel.app/assets/images/icons/dress.svg",
  },
  {
    label: "Winter Wear",
    href: "#",
    quantity: 58,
    image:
      "https://e-commerce-templates.vercel.app/assets/images/icons/coat.svg",
  },
  {
    label: "Glasses & Lens",
    href: "#",
    quantity: 68,
    image:
      "https://e-commerce-templates.vercel.app/assets/images/icons/glasses.svg",
  },
  {
    label: "Shorts & Jeans",
    href: "#",
    quantity: 84,
    image:
      "https://e-commerce-templates.vercel.app/assets/images/icons/shorts.svg",
  },
  {
    label: "T-Shirts",
    href: "#",
    quantity: 35,
    image:
      "https://e-commerce-templates.vercel.app/assets/images/icons/tee.svg",
  },
  {
    label: "Jacket",
    href: "#",
    quantity: 16,
    image:
      "https://e-commerce-templates.vercel.app/assets/images/icons/jacket.svg",
  },
  {
    label: "Watch",
    href: "#",
    quantity: 27,
    image:
      "https://e-commerce-templates.vercel.app/assets/images/icons/watch.svg",
  },
  {
    label: "Hat & Caps",
    href: "#",
    quantity: 39,
    image:
      "https://e-commerce-templates.vercel.app/assets/images/icons/hat.svg",
  },
];
const Collections = () => {
  const isMobile = useIsMobile();
  const chunks = _.chunk(collections, isMobile ? 2 : 4);

  return (
    <Carousel>
      <CarouselContent>
        {chunks.map((chunk) => (
          <CarouselItem key={chunk.map((p) => p.label).join(",")}>
            <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
              {chunk.map((collection) => (
                <div
                  key={collection.label}
                  className="p-2 flex items-center gap-2 border rounded-md"
                >
                  <Image
                    src={collection.image}
                    alt={collection.label}
                    height={50}
                    width={50}
                    className="object-fit bg-secondary p-2 rounded-md border"
                  />
                  <div className="flex flex-col justify-between text-sm h-full w-full">
                    <div>
                      <strong className="font-semibold uppercase">
                        {collection.label}
                      </strong>
                      <span className="float-right">
                        ({collection.quantity})
                      </span>
                    </div>
                    <div>
                      <Link
                        className="text-green-700 uppercase font-semibold"
                        href={collection.href}
                      >
                        Show All
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Collections;
