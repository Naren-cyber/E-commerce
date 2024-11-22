import { PropsWithChildren } from "react";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

export default function Heading({
  children,
  className,
}: PropsWithChildren & {
  className?: string;
}) {
  return (
    children && (
      <div
        className={cn(
          "mb-2 md:mb-5 font-semibold text-lg capitalize",
          className
        )}
      >
        {children}
        <Separator className="mt-2 hidden md:block" />
      </div>
    )
  );
}
