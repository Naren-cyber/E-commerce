"use client";
import { SearchIcon } from "lucide-react";
import Form from "next/form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { Suspense } from "react";

const PRODUCTS_PATH = "/products";

export default function Search() {
  return (
    <Suspense fallback={<SearchForm />}>
      <SearchFormWithQuery />
    </Suspense>
  );
}
function SearchFormWithQuery() {
  const query = (useSearchParams().get("q") || "").trim();

  return <SearchForm query={query} />;
}

function SearchForm({ query }: { query?: string }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Form
      action={PRODUCTS_PATH}
      onSubmit={(e) => {
        const q = (e.target as HTMLFormElement).q?.value?.trim();
        if (!q) {
          const url = new URL(location.href);
          url.searchParams.delete("q");
          router.replace(url.href);
          e.preventDefault();
        }
        if (q === query) {
          e.preventDefault();
        }
      }}
      replace={pathname !== PRODUCTS_PATH}
    >
      <search className="group/search relative">
        <Input
          placeholder="Enter your product..."
          className="md:w-[50vw]"
          defaultValue={query}
          name="q"
        />
        <SearchIcon
          size={16}
          className="absolute top-1/2 -translate-y-1/2 right-2"
        />
      </search>
    </Form>
  );
}
