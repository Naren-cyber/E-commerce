"use client";
import Link from "next/link";

import { SearchParams } from "@/lib/types";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { ComponentProps, useEffect, useTransition } from "react";
import { useDispatch } from "react-redux";
import { LoaderName, updateLoading } from "@/stores/globalStore";

const ActiveLink: React.FC<
  Partial<ComponentProps<typeof Link>> & {
    search?: SearchParams;
    loaders?: LoaderName | LoaderName[];
  }
> = ({ href = "#", children, search = {}, loaders, ...props }) => {
  const url = new URL(
    typeof href === "string" ? href : href.href!,
    "https://www.example.com"
  );
  const search2 = Object.fromEntries(url.searchParams.entries());
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const isActive =
    pathname === url.pathname &&
    compareSearchParams({ ...search, ...search2 }, searchParams);

  const [isLoading, setTransition] = useTransition();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loaders) {
      dispatch(
        updateLoading({
          loaders,
          isLoading,
        })
      );
    }
  }, [isLoading, loaders, dispatch]);

  return (
    <Link
      href={href}
      data-active={isActive}
      {...props}
      onClick={(e) => {
        if (loaders?.length) {
          e.preventDefault();
          const href = (e.target as HTMLAnchorElement).href;
          setTransition(() => {
            if (props.replace) {
              router.replace(href);
            } else {
              router.push(href);
            }
          });
        }
        props.onClick?.(e);
      }}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;

const compareSearchParams = (
  searchParams: SearchParams,
  parentSearchParams: ReadonlyURLSearchParams
) => {
  for (const param in searchParams) {
    if (searchParams[param] !== parentSearchParams.get(param)) return false;
  }

  return true;
};
