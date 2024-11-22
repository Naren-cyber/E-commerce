import { PropsWithChildren, Suspense } from "react";

export default function ProductLayout({ children }: PropsWithChildren) {
  return <Suspense>{children}</Suspense>;
}
