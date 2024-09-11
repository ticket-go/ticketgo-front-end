import { cn } from "@/lib/utils";
import { Typography } from "../typography";

interface PartnerTextProps {
  text: string;
  className?: string;
}

export function PartnerText({ text, className }: PartnerTextProps) {
  return (
    <Typography variant={"h3"} fontWeight={"bold"} className={cn(className)}>
      {text}
    </Typography>
  );
}
