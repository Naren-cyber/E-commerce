import ActiveLink from "@/components/ActiveLink";
import FilterBlock from "@/components/FilterBlock";
import LoaderBoundary from "@/components/LoaderBoundary";
import ProductGrid, { ProductGridSkeleton } from "@/components/ProductGrid";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import config from "@/lib/config";
import productService from "@/lib/server/products";
import { MaybePromise, SearchParams } from "@/lib/types";
import { ListFilterIcon } from "lucide-react";

export default async function Products({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const searchParams = await searchParamsPromise;
  if (searchParams.for) {
    searchParams.gender = searchParams.for;
    delete searchParams.for;
  }
  const products = await productService.list(12, searchParams);

  return (
    <div className="md:px-24 px-2 pb-5 grid gap-5 md:grid-cols-[1fr_3fr]">
      <div className="hidden md:block">
        <Filters searchParams={searchParams} />
      </div>
      <LoaderBoundary
        loaderName="filteredProductsLoading"
        loader={<ProductGridSkeleton />}
      >
        <ProductGrid
          products={products}
          actions={<FilterButton searchParams={searchParams} />}
          title="Search Results"
        />
      </LoaderBoundary>
    </div>
  );
}

const Filters = async ({
  searchParams,
}: {
  searchParams: MaybePromise<SearchParams>;
}) => {
  searchParams = await searchParams;
  const products = await productService.list(Infinity, {
    category: searchParams.category,
  });
  const getOptions = (field: keyof (typeof products)[0]) => [
    ...new Set(products.map((p) => p[field].toString())),
  ];

  return (
    <div className="space-y-2 md:space-y-5 sticky top-5 h-fit">
      <SortButton searchParams={searchParams} />
      <FilterBlock
        title="Categories"
        field="category"
        options={(await productService.categories()).map((p) => p.label)}
        className="data-[active=true]:text-green-600"
        replace
      />
      <FilterBlock
        title="Brands"
        field="brand"
        options={getOptions("brand")}
        multiselect
      />
      <FilterBlock title="For" field="for" options={getOptions("gender")} />
      <FilterBlock
        title="Prices"
        field="price"
        options={{ min: 1000, max: 100000 }}
      />
    </div>
  );
};

const FilterButton = ({
  searchParams,
}: {
  searchParams: MaybePromise<SearchParams>;
}) => {
  return (
    <div className="md:hidden">
      <Drawer>
        <DrawerTrigger>
          <ListFilterIcon />
        </DrawerTrigger>
        <DrawerContent>
          <div className="hidden">
            <DrawerTitle>Sort & Filters</DrawerTitle>
          </div>
          <div className="p-2">
            <Filters searchParams={searchParams} />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

const SortButton = async ({
  searchParams,
}: {
  searchParams: MaybePromise<SearchParams>;
}) => {
  const { sort } = await searchParams;

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="sort">
        <Button variant="secondary" asChild className="hover:no-underline">
          <AccordionTrigger>
            <div className="w-full flex justify-between text-sm">
              Sort By{" "}
              <span className="font-semibold">
                {config.sortOptions.find((p) => p.value === sort)?.label ||
                  "Relevance"}
              </span>
            </div>
          </AccordionTrigger>
        </Button>
        <AccordionContent className="w-full">
          <div className="grid py-1 gap-1">
            {config.sortOptions.map((p) => (
              <ActiveLink
                href={`/products?${new URLSearchParams(
                  JSON.parse(JSON.stringify({ ...searchParams, sort: p.value }))
                )}`}
                key={p.label}
                className="data-[active=true]:text-green-600 block"
                data-active={p.value === sort}
              >
                {p.label}
              </ActiveLink>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
