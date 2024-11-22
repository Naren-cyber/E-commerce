import productService from "@/lib/server/products";
import Image from "next/image";
import ActiveLink from "./ActiveLink";
import { Accordion } from "./ui/accordion";

export default async function Categories() {
  "use cache";
  const categories = await productService.categories();

  return (
    <div className="border px-3 py-5 rounded-md">
      <div className="mt-2 my-3 font-semibold uppercase">Categories</div>
      <Accordion type="single" collapsible className="space-y-2">
        {categories.map((p) => (
          <ActiveLink
            key={p.label}
            href={p.href!}
            className="flex text-base font-semibold text-primary/60 data-[active=true]:text-green-500 gap-2"
            loaders="filteredProductsLoading"
          >
            <Image src={p.icon} alt={p.label} height={24} width={24} />
            {p.label}
          </ActiveLink>
        ))}
      </Accordion>
    </div>
  );
}
