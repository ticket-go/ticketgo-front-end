"use client";

import { cn } from "@/lib/utils";
import { Typography } from "../typography";
import { Button } from "../ui/button";
import { ComponentProps } from "react";

interface GenericButtonProps extends ComponentProps<"button"> {
  title: string;
  className?: string;
  onClick?: () => void;
}

export function GenericButton({
  title,
  className,
  onClick,
}: GenericButtonProps) {
  return (
    <Button
      data-testid="event-card-button"
      className={cn([
        "w-full h-12 bg-[#E85AFF] hover:bg-purple/20 rounded-sm",
        className,
      ])}
      onClick={onClick}
    >
      <Typography fontWeight="medium" variant="h6">
        {title}
      </Typography>
    </Button>
  );
}
