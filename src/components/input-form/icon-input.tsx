import { ReactNode } from "react";

export function IconInput({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
      {children}
    </div>
  );
}
