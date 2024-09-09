import { ReactNode, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconInput } from "./icon-input";
import { cn } from "@/lib/utils";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  type?: string;
  name?: string;
  placeholder?: string;
  register?: UseFormRegister<FieldValues>;
  icon?: ReactNode;
  textColor?: boolean;
  isSmall?: boolean;
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
  isSmall,
  className,
}: InputFormProps) {
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
            isSmall && "w-fit",
            !icon && "pl-4",
            className,
          ])}
          {...register}
        />
        {icon && <IconInput>{icon}</IconInput>}
      </div>
    </div>
  );
}
