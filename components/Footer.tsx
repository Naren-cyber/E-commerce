import { metadata } from "@/app/layout";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function Footer() {
  const config = {
    contact: {
      address: "jamshedpur,jharkhand, India - 831002",
      phone: "9398692683",
      email: "Narendrak613@gmail.com",
    },
  };

  const Block = ({
    title,
    children,
  }: PropsWithChildren & {
    title: string;
  }) => {
    return (
      <div>
        <h4 className="text-primary-foreground relative font-bold uppercase mb-4">
          {title}
          <div className="absolute top-[107%] bg-green-500 w-16 h-[1px] left-0" />
        </h4>
        <div className="grid space-y-1">{children}</div>
      </div>
    );
  };

  return (
    <footer className="bg-primary/90 text-secondary/60">
      <div className="border-b border-b-secondary/30 grid grid-cols-2 md:grid-cols-5 px-2 md:px-24 py-16 gap-5">
        <Block title="Popular Categories">
          <Link href="#" className="hover:text-green-600">
            Fashion
          </Link>
          <Link href="#" className="hover:text-green-600">
            Electronic
          </Link>
          <Link href="#" className="hover:text-green-600">
            Cosmetic
          </Link>
          <Link href="#" className="hover:text-green-600">
            Health
          </Link>
          <Link href="#" className="hover:text-green-600">
            Watches
          </Link>
        </Block>
        <Block title="Collections">
          <Link href="#" className="hover:text-green-600">
            Prices Drop
          </Link>
          <Link href="#" className="hover:text-green-600">
            New Products
          </Link>
          <Link href="#" className="hover:text-green-600">
            Best Seller
          </Link>
          <Link href="#" className="hover:text-green-600">
            Contact Us
          </Link>
          <Link href="#" className="hover:text-green-600">
            Sitemap
          </Link>
        </Block>
        <Block title="Our Company">
          <Link href="#" className="hover:text-green-600">
            Delivery
          </Link>
          <Link href="#" className="hover:text-green-600">
            Legal Notice
          </Link>
          <Link href="#" className="hover:text-green-600">
            Terms & Conditions
          </Link>
          <Link href="#" className="hover:text-green-600">
            About Us
          </Link>
          <Link href="#" className="hover:text-green-600">
            Secure Payment
          </Link>
        </Block>
        <Block title="Services">
          <Link href="#" className="hover:text-green-600">
            Fashion
          </Link>
          <Link href="#" className="hover:text-green-600">
            Electronic
          </Link>
          <Link href="#" className="hover:text-green-600">
            Cosmetic
          </Link>
          <Link href="#" className="hover:text-green-600">
            Health
          </Link>
          <Link href="#" className="hover:text-green-600">
            Watches
          </Link>
        </Block>
        <Block title="Contact">
          <div className="flex gap-2">
            <MapPinIcon className="flex-shrink-0" size={18} />
            <div>{config.contact.address}</div>
          </div>
          <div className="flex gap-2">
            <PhoneIcon className="flex-shrink-0" size={18} />
            <div>+91 {config.contact.phone}</div>
          </div>
          <div className="flex gap-2">
            <MailIcon className="flex-shrink-0" size={18} />
            <div>{config.contact.email}</div>
          </div>
        </Block>
      </div>
      <div className="p-7 grid place-items-center gap-3">
        <Image
          src="https://e-commerce-templates.vercel.app/assets/images/payment.png"
          alt="Payments"
          height={30}
          width={335}
        />
        <div className="font-semibold capitalize">
          Copyright © {metadata.title?.toString()} all rights reserved.
        </div>
      </div>
    </footer>
  );
}
