"use client";
import { RootState, useSelector } from "@/stores/ReduxProvider";
import { PropsWithChildren, ReactNode } from "react";

export default function LoaderBoundary({
  children,
  loader,
  loaderName,
}: PropsWithChildren<{
  loader: ReactNode;
  loaderName: keyof RootState["global"]["loading"];
}>) {
  const isLoading = useSelector((p) => p.global.loading[loaderName]);

  if (isLoading) {
    return loader;
  }

  return children;
}
