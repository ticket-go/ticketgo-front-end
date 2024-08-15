import { ReactNode } from "react";

interface ErrorMessageProps {
  error: ReactNode;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <>
      <p className="text-red-600 font-medium pl-2">{error}</p>
    </>
  );
}
