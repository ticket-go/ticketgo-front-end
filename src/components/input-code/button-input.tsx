import React from "react";

interface ButtonInputProps {
  text: string;
}

export function ButtonInput({ text }: ButtonInputProps) {
  return (
    <button
      type="button"
      className={`border border-purple text-purple p-2 rounded-full w-[200px]`}
    >
      {text}
    </button>
  );
}
