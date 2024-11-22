import { usePathname, useSearchParams } from "next/navigation";

export default function useFullPathname() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return decodeURIComponent(
    searchParams.size ? `${pathname}?${searchParams}` : pathname
  );
}
