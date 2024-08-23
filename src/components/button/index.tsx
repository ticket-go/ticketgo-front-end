import { Typography } from "../typography";


interface ButtonProps {
  text: string
}

export function Button({ text } : ButtonProps) {
  return (
    <button
    data-testid="event-card-button"
    className="w-full h-12 bg-[#E85AFF] hover:bg-purple/80 rounded-sm">
      <Typography fontWeight='medium' variant="h6" >{text}</Typography></button>
     
  );
}
