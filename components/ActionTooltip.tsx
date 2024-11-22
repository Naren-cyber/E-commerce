"use client";
import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

function ActionTooltip({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  const isMobile = useIsMobile();
  return isMobile ? (
    children
  ) : (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild role="button">
          {children}
        </TooltipTrigger>
        <TooltipContent>{title}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
export default ActionTooltip;
