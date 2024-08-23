import { ReactNode, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconInput } from "./icon-input";
import { cn } from "@/lib/utils";

interface InputCodeProps {
  label: string;
  id: string;
  type?: string;
  name: string;
  placeholder?: string;
  register: any;
  icon?: ReactNode;
  textColor?: boolean;
  className?: string;
}

export function InputForm({
  label,
  id,
  type,
  name,
  placeholder,
  register,
  icon,
  textColor,
  className,
}: InputCodeProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor={name} className="text-lg font-medium">
        {label}
      </Label>
      <div className={cn(["relative flex items-center"])}>
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          className={cn([
            "h-14 pl-12",
            textColor && "placeholder:text-black",
            className,
          ])}
          {...register}
        />
        <IconInput>{icon}</IconInput>
      </div>
    </div>
  );
}
