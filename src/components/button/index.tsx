import { Typography } from "../typography";
import { cn } from "@/lib/utils";

interface ButtonProps {
  text: string;
  className?: string;
  textColor?: string;
  fontWeight?: string;
  onClick?: () => void; 
}

export function Button({ text, className, textColor, fontWeight, onClick }: ButtonProps) {
  return (
    <button
      data-testid="event-card-button"
      className={cn("w-full h-12 bg-[#E85AFF] hover:bg-purple/80 rounded-sm", className)}
      onClick={onClick} 
    >
      <Typography
        fontWeight="medium"
        variant="h6"
        className={cn(textColor, fontWeight ? `font-${fontWeight}` : "")}
      >
        {text}
      </Typography>
    </button>
  );
}
