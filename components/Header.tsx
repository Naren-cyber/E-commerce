import { getBuildTime } from "@/lib/server-utils";
import { cn } from "@/lib/utils";
import {
  FacebookIcon,
  HeartIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  User2Icon,
} from "lucide-react";
import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";
import BuildTimeLog from "./BuildTime";
import Cart from "./CartSidebar";
import FavouriteBadge from "./FavouriteBadge";
import Search from "./Search";
import ActiveLink from "./ActiveLink";

const config = {
  social: {
    facebook: "#",
    x: "#",
    instagram: "#",
    linkedin: "https://linkedin.com/in/tusharjain3105",
  },
  logo: "#",
  promo: {
    title: "Free Shipping This Week Order Over - $55",
    href: "#",
  },
};

export default function Header() {
  const PromoHeader = async () => {
    return (
      <div className="py-3 px-2 md:px-24 dark:border-b shadow flex items-center justify-between">
        <div className="hidden md:block">
          <SocialIcons />
        </div>
        <h3 className="uppercase text-xs text-primary/60 font-semibold text-center flex-grow">
          {config.promo.title}
        </h3>
        <BuildTimeLog date={await getBuildTime()} />
      </div>
    );
  };

  const MainHeader = () => {
    const Actions = () => {
      return (
        <div className="flex items-center gap-3">
          <Link href="/user">
            <User2Icon />
          </Link>
          <Link href="/favourites">
            <FavouriteBadge>
              <HeartIcon />
            </FavouriteBadge>
          </Link>
          <Cart />
        </div>
      );
    };

    return (
      <div className="py-5 px-2 md:px-24 dark:border-b shadow flex items-center justify-between">
        <Link href="/">
          <Image
            src={config.logo}
            alt="Logo"
            height={70}
            width={120}
            className="object-contain"
          />
        </Link>
        <div className="hidden md:block">
          <Search />
        </div>
        <Actions />
      </div>
    );
  };

  const Navbar = () => {
    const NavLink = (props: PropsWithChildren & LinkProps) => (
      <ActiveLink
        {...props}
        loaders="filteredProductsLoading"
        className={cn("group/link relative py-2  hover:text-green-700")}
      >
        {props.children}
        <span className="absolute w-0 group-hover/link:w-full transition-all h-[2px] bg-green-700 bottom-0 left-0"></span>
      </ActiveLink>
    );

    return (
      <nav className="flex items-center md:justify-center gap-5 font-semibold uppercase p-3 text-sm text-primary/80 overflow-auto *:flex-shrink-0">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Explore</NavLink>
        <NavLink href="/products?gender=men">Men&apos;s</NavLink>
        <NavLink href="/products?gender=women">Women&apos;s</NavLink>
        <NavLink href="/products?category=Personal%20Care">
          Personal Care
        </NavLink>
        <NavLink href="/products?category=Jewelry">Jewelry</NavLink>
      </nav>
    );
  };

  return (
    <header>
      <PromoHeader />
      <MainHeader />
      <div className="md:hidden px-2">
        <Search />
      </div>
      <Navbar />
    </header>
  );
}

const SocialIcons = () => (
  <div className="social-icons flex items-center gap-2">
    <a
      href={config.social.facebook}
      target="_blank"
      referrerPolicy="no-referrer"
      rel="noopener noreferrer"
    >
      <FacebookIcon
        size={24}
        className="bg-secondary p-1 rounded-md hover:bg-green-600 hover:text-green-50"
      />
    </a>
    <a
      href={config.social.x}
      target="_blank"
      referrerPolicy="no-referrer"
      rel="noopener noreferrer"
    >
      <TwitterIcon
        size={24}
        className="bg-secondary p-1 rounded-md hover:bg-green-600 hover:text-green-50"
      />
    </a>
    <a
      href={config.social.instagram}
      target="_blank"
      referrerPolicy="no-referrer"
      rel="noopener noreferrer"
    >
      <InstagramIcon
        size={24}
        className="bg-secondary p-1 rounded-md hover:bg-green-600 hover:text-green-50"
      />
    </a>
    <a
      href={config.social.linkedin}
      target="_blank"
      referrerPolicy="no-referrer"
      rel="noopener noreferrer"
    >
      <LinkedinIcon
        size={24}
        className="bg-secondary p-1 rounded-md hover:bg-green-600 hover:text-green-50"
      />
    </a>
  </div>
);
