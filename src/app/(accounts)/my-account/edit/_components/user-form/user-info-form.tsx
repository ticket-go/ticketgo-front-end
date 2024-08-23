"use client";

import { InputForm } from "@/components/input-form";
import { ErrorMessage } from "@/app/(auth)/_components/error-message";
import { MailIcon, UserIcon, PhoneIcon } from "lucide-react";
import { Typography } from "@/components/typography";

interface UserInfoFormProps {
  register: any;
  errors: any;
}

export function UserInfoForm({ register, errors }: UserInfoFormProps) {
  return (
    <div className="flex flex-col justify-center items-start w-full h-fit gap-2">
      <Typography variant="h3" fontWeight="semibold">
        Meus Dados
      </Typography>
      <div className="flex flex-col justify-center items-center w-[350px] gap-6">
        <InputForm
          label="Nome"
          name="first_name"
          id="first_name"
          placeholder="Nome"
          register={register("first_name")}
          icon={<UserIcon size={24} />}
          className="w-full"
        />
        {errors.first_name && (
          <ErrorMessage error={errors.first_name.message} />
        )}

        <InputForm
          label="Sobrenome"
          name="last_name"
          id="last_name"
          placeholder="Sobrenome"
          register={register("last_name")}
          icon={<UserIcon size={24} />}
          className="w-full"
        />
        {errors.last_name && <ErrorMessage error={errors.last_name.message} />}

        <InputForm
          label="Email"
          name="email"
          id="email"
          type="email"
          placeholder="Email"
          register={register("email")}
          icon={<MailIcon size={24} />}
          className="w-full"
        />
        {errors.email && <ErrorMessage error={errors.email.message} />}

        <InputForm
          label="Telefone"
          name="phone"
          id="phone"
          type="phone"
          placeholder="Telefone"
          register={register("phone")}
          icon={<PhoneIcon size={24} />}
          className="w-full"
        />
        {errors.phone && <ErrorMessage error={errors.phone.message} />}
      </div>
    </div>
  );
}
