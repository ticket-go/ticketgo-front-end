import { Typography } from "../typography";
import { cn } from "@/lib/utils"; 

interface ButtonProps {
  text: string;
  className?: string; 
}

export function Button({ text, className }: ButtonProps) {
  return (
    <button
      data-testid="event-card-button"
      className={cn("w-full h-12 bg-[#E85AFF] hover:bg-purple/80 rounded-sm", className)} 
    >
      <Typography fontWeight="medium" variant="h6">
        {text}
      </Typography>
    </button>
  );
}
