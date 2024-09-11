import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PartnerRootProps {
  children: ReactNode;
  className?: string;
}

export function PartnerRoot({ children, className }: PartnerRootProps) {
  return (
    <div
      className={cn([
        "flex items-center justify-center flex-col w-full h-[350px] bg-purple-gradient py-4 gap-4",
        className,
      ])}
    >
      {children}
    </div>
  );
}
