"use client";
import { refreshPath } from "@/lib/server/actions";
import { useRouter } from "next/navigation";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { Suspense, useEffect, useTransition } from "react";
import { useDispatch } from "react-redux";
import Heading from "./Heading";
import Slider from "./slider";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { updateLoading } from "@/stores/globalStore";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

type FilterBlockProps = {
  title: string;
  className?: ClassValue;
  replace?: boolean;
} & (
  | {
      field: "brand" | "for" | "category";
      options: string[];
      multiselect?: boolean;
    }
  | {
      field: "price";
      options: {
        min: number;
        max: number;
      };
      multiselect?: never;
    }
);

function FilterBlockWithQuery({ replace, ...props }: FilterBlockProps) {
  const [query, setQuery] = useQueryState(
    props.field,
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [isLoading, setTransition] = useTransition();
  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    dispatch(
      updateLoading({
        loaders: "filteredProductsLoading",
        isLoading,
      })
    );
  }, [dispatch, isLoading]);

  return (
    <FilterBlockPure
      {...props}
      query={query}
      setQuery={(query) => {
        setTransition(async () => {
          if (replace) {
            router.replace(`${location.pathname}?${props.field}=${query}`);
          } else {
            setQuery(query);
            await refreshPath();
            router.refresh();
          }
        });
      }}
    />
  );
}

function FilterBlockPure({
  title,
  field,
  options,
  query = [],
  setQuery = () => {},
  multiselect,
  className,
}: FilterBlockProps & {
  query?: string[];
  setQuery?: (query: string[]) => void;
}) {
  if (field === "brand" || field === "category") {
    return (
      <div>
        <Heading>{title}</Heading>
        <div className="grid gap-1">
          {options.map((option) => {
            const isSelected = query.includes(option);
            return (
              <label
                key={option}
                className={cn(
                  "text-sm text-primary/70 flex items-center justify-between cursor-pointer hover:text-green-600 font-semibold",
                  className
                )}
                data-active={isSelected}
              >
                {option}
                <Checkbox
                  hidden={!multiselect}
                  onCheckedChange={() => {
                    if (multiselect) {
                      if (isSelected) {
                        setQuery(query.filter((p) => p != option));
                      } else {
                        setQuery([...query, option]);
                      }
                    } else {
                      setQuery([option]);
                    }
                  }}
                  checked={isSelected}
                />
              </label>
            );
          })}
        </div>
      </div>
    );
  }

  if (field === "for") {
    return (
      <div>
        <Heading>{title}</Heading>
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}
        >
          {options.map((opt) => (
            <Button
              key={opt}
              className="uppercase"
              size="sm"
              variant={query.includes(opt) ? "default" : "secondary"}
              onClick={() => {
                setQuery([opt]);
              }}
            >
              {opt}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  if (field === "price") {
    return (
      <div>
        <Heading>{title}</Heading>
        <div className="-mt-3">
          <Slider
            min={+query[0] || options.min}
            max={+query[1] || options.max}
            onChange={(min, max) => {
              const minStr = min.toString();
              const maxStr = max.toString();

              setQuery(min ? [minStr, maxStr] : max ? [maxStr] : []);
            }}
          />
        </div>
      </div>
    );
  }
}

export default function FilterBlock(props: FilterBlockProps) {
  return (
    <Suspense fallback={<FilterBlockPure {...props} />}>
      <FilterBlockWithQuery {...props} />
    </Suspense>
  );
}
