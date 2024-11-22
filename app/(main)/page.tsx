import Categories from "@/components/Categories";
import DealOfTheDay from "@/components/DealOfTheDay";
import Heading from "@/components/Heading";
import Collections from "@/components/HomeCollections";
import ProductColumns from "@/components/ProductColumn";
import ProductGrid from "@/components/ProductGrid";
import Ratings from "@/components/Ratings";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import bannerService from "@/lib/server/banners";
import productService from "@/lib/server/products";
import { formatPrice } from "@/lib/utils";
import {
  PhoneIcon,
  ReplyIcon,
  RocketIcon,
  ShipIcon,
  TicketIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function LandingPage() {
  "use cache";
  const products = await productService.list();
  return (
    <div className="space-y-2 md:space-y-7 px-2 md:px-24 mb-5">
      <HeroBanners />
      <Collections />
      <div className="grid md:grid-cols-[1fr_3fr] gap-5">
        <div className="hidden md:block space-y-5 sticky top-5 h-fit">
          <Categories />
          <BestSellers />
          <ProductColumns
            title="Trending"
            products={products.slice(0, 8).sort(() => Math.random() - 0.5)}
          />
        </div>
        <div className="space-y-5">
          <div className="grid md:grid-cols-3 gap-5">
            <ProductColumns
              title="New Arrivals"
              products={products.slice(0, 8).sort(() => Math.random() - 0.5)}
            />
            <ProductColumns
              title="Trending"
              products={products.slice(0, 8).sort(() => Math.random() - 0.5)}
            />
            <ProductColumns
              title="Top Rated"
              products={products.slice(0, 8).sort(() => Math.random() - 0.5)}
            />
          </div>
          <DealOfTheDay
            products={products.slice(3).map((p) => ({
              ...p,
              quantity: { available: 23, sold: 45 },
              expiry: new Date("08/09/2025"),
            }))}
          />
          <ProductGrid title="New Products" products={products.slice(0, 8)} />
        </div>
      </div>
      <div className="grid md:grid-cols-[1fr_2fr_1fr] gap-5">
        <Testimonial />
        <Banner />
        <Services />
      </div>
    </div>
  );
}

const Banner = () => {
  return (
    <div
      style={{
        background: `url("https://e-commerce-templates.vercel.app/assets/images/cta-banner.jpg")`,
      }}
      className="grid place-items-center"
    >
      <div className="p-7 rounded-md bg-white/50 grid place-items-center gap-2">
        <Button className="font-semibold" size="lg">
          25% Discount
        </Button>
        <div className="text-xl font-semibold">Summer Collection</div>
        <div className="text-lg text-primary/60">Starting @ $10</div>
        <div className="text-lg text-primary/60 font-semibold">Shop Now</div>
      </div>
    </div>
  );
};

const Testimonial = () => {
  return (
    <div>
      <Heading>Testimonial</Heading>
      <div className="rounded-md border p-5 grid gap-2 place-items-center">
        <Avatar className="size-20">
          <AvatarImage src="https://e-commerce-templates.vercel.app/assets/images/testimonial-1.jpg" />
        </Avatar>
        <div className="uppercase font-semibold text-primary/60">
          Narendra kumar
        </div>
        <div>Software Engineer</div>
        <Image
          src="https://e-commerce-templates.vercel.app/assets/images/icons/quotes.svg"
          alt="Narendra kumar"
          height={16}
          width={16}
        />
        <p className="text-sm line-clamp-3 text-center px-14">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi
          voluptatibus necessitatibus minima explicabo odit eaque cumque porro
          nesciunt, veritatis voluptates magni quas ullam perspiciatis ut a
          magnam earum quasi aperiam.
        </p>
      </div>
    </div>
  );
};

const Services = () => {
  const Service = ({
    Icon,
    title,
    description,
  }: {
    Icon: typeof ShipIcon;
    title: string;
    description: string;
  }) => (
    <div className="flex gap-3 items-center">
      <Icon size={32} color="green" />
      <div className="flex flex-col justify-between text-primary/60">
        <div className="font-semibold">{title}</div>
        <p className="text-xs">{description}</p>
      </div>
    </div>
  );

  return (
    <div>
      <Heading>Our Services</Heading>
      <div className="grid gap-5 p-7 rounded-md border">
        <Service
          title="Worldwide Delivery"
          description="For Order Over $100"
          Icon={ShipIcon}
        />
        <Service
          title="Next Day delivery"
          description="UK Orders Only"
          Icon={RocketIcon}
        />
        <Service
          title="Best Online Support"
          description="Hours: 8AM - 11PM"
          Icon={PhoneIcon}
        />
        <Service
          title="Return Policy"
          description="Easy & Free Return"
          Icon={ReplyIcon}
        />
        <Service
          title="30% money back"
          description="For Order Over $100"
          Icon={TicketIcon}
        />
      </div>
    </div>
  );
};

const HeroBanners = async () => {
  "use cache";
  const banners = await bannerService.list();
  const Banner = ({
    image,
    heading,
    title,
    price,
    href,
  }: {
    image: string;
    heading: string;
    title: string;
    price: number;
    href: string;
  }) => {
    return (
      <div
        style={{
          background: `url("${image}")`,
          backgroundPosition: "right",
          backgroundSize: "cover",
        }}
        className="aspect-[3]"
      >
        <div className="hidden place-items-center h-full w-72 ml-24 md:grid">
          <div className="space-y-2 capitalize">
            <div className="text-green-700 text-3xl font-semibold tracking-wide">
              {heading}
            </div>
            <div className="text-4xl uppercase font-extrabold">{title}</div>
            <div className="text-primary/60 text-xl">
              starting at {formatPrice(price)}
            </div>
            <Link href={href}>
              <Button
                variant="success"
                className="uppercase font-semibold"
                size="lg"
              >
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Carousel autoPlayDelay={2000}>
      <CarouselContent>
        {banners.map((banner, index: number) => (
          <CarouselItem key={index}>
            <Banner {...banner} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

const BestSellers = async () => {
  const bestSellers = await productService.list(5);
  const BestSeller = ({ item }: { item: (typeof bestSellers)[0] }) => {
    return (
      <div className="flex gap-2">
        <Image
          src={item.image}
          alt={item.title}
          height={75}
          width={75}
          className="object-fit"
        />
        <div className="flex flex-col gap-1 capitalize">
          <div className="text-sm line-clamp-1">{item.title}</div>
          <Ratings value={item.ratings} />
          <div>
            <span className="line-through text-primary/60">
              {formatPrice(item.mrp)}
            </span>{" "}
            <span className="font-semibold">{formatPrice(item.price)}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Heading>Best Sellers</Heading>
      <div className="grid gap-2">
        {bestSellers.map((p) => (
          <BestSeller key={p.title} item={p} />
        ))}
      </div>
    </div>
  );
};
