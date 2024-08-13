import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { VariantProps } from "class-variance-authority";
import { typographyVariants } from "./variants";

export interface TypographyGroupProps
  extends VariantProps<typeof typographyVariants> {
  children: ReactNode;
  className?: string;
}

export function Typography({
  children,
  className,
  variant,
  fontWeight,
  color,
  ...props
}: TypographyGroupProps) {
  return (
    <span
      data-testid="typography-text-value"
      className={cn(
        typographyVariants({ variant, fontWeight, color }),
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
