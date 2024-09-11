import { ReactNode } from "react";

interface PartnerContentProps {
  children: ReactNode;
}

export function PartnerContent({ children }: PartnerContentProps) {
  return <div className="flex flex-col items-center">{children}</div>;
}
