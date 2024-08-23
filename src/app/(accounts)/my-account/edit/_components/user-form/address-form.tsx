"use client";

import { useRouter } from "next/navigation";
import { InputForm } from "@/components/input-form";
import { ErrorMessage } from "@/app/(auth)/_components/error-message";
import { UserIcon } from "lucide-react";
import { Typography } from "@/components/typography";

interface AddressFormProps {
  register: any;
  errors: any;
}

export function AddressForm({ register, errors }: AddressFormProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-start w-full h-fit gap-2">
      <Typography variant="h3" fontWeight="semibold">
        Endereço
      </Typography>
      <div className="flex flex-col justify-between items-center w-[350px] h-full gap-6">
        <div className="flex justify-between items-center w-full gap-2">
          <InputForm
            label="Endereço"
            name="street"
            id="street"
            placeholder="Endereço"
            register={register("street")}
            icon={<UserIcon size={24} />}
            className="w-[250px]"
          />

          <InputForm
            label="Número"
            name="number"
            id="number"
            placeholder="N°"
            register={register("number")}
            className="w-[100px]"
          />
          {errors.street && <ErrorMessage error={errors.street.message} />}
          {errors.number && <ErrorMessage error={errors.number.message} />}
        </div>

        <InputForm
          label="Cidade"
          name="city"
          id="city"
          type="city"
          placeholder="Digite o nome da sua cidade"
          register={register("city")}
          className="w-full"
        />
        {errors.city && <ErrorMessage error={errors.city.message} />}

        <InputForm
          label="Estado"
          name="state"
          id="state"
          type="select"
          placeholder="Informe seu estado"
          register={register("state")}
          className="w-full"
        />
        {errors.state && <ErrorMessage error={errors.state.message} />}

        <InputForm
          label="Estado"
          name="complement"
          id="complement"
          type="select"
          placeholder="Informe seu estado"
          register={register("complement")}
          className="w-full"
        />
        {errors.state && <ErrorMessage error={errors.state.message} />}
      </div>
    </div>
  );
}
