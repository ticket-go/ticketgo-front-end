"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "@/components/error-message";
import { EditProfileFormValues } from ".";
import { User } from "@/types/user";

interface UserInfoFormProps {
  user: User | null;
  register: UseFormRegister<EditProfileFormValues>;
  errors: FieldErrors<EditProfileFormValues>;
}

export function UserInfoForm({ user, register, errors }: UserInfoFormProps) {
  return (
    <div className="grid grid-cols-2 w-full gap-4 tab-port:grid-cols-1">
      <Input
        id="first_name"
        placeholder="Nome"
        value={user?.first_name}
        {...register("first_name")}
        className="w-full h-14"
      />
      {errors.first_name && <ErrorMessage error={errors.first_name.message} />}

      <Input
        id="last_name"
        placeholder="Sobrenome"
        value={user?.last_name}
        {...register("last_name")}
        className="w-full h-14"
      />
      {errors.last_name && <ErrorMessage error={errors.last_name.message} />}

      <Input
        id="email"
        type="email"
        placeholder="Email"
        value={user?.email}
        {...register("email")}
        className="w-full h-14"
      />
      {errors.email && <ErrorMessage error={errors.email.message} />}

      <Input
        id="phone"
        type="phone"
        placeholder="Telefone"
        value={user?.phone}
        {...register("phone")}
        className="w-full h-14"
      />
      {errors.phone && <ErrorMessage error={errors.phone.message} />}
    </div>
  );
}
