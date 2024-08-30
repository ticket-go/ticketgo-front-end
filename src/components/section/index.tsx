import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export function Section({ children, className }: SectionProps) {
  return (
    <section
      className={cn([
        "flex flex-col w-full h-full py-8 px-20 gap-4",
        className,
      ])}
    >
      {children}
    </section>
  );
}
