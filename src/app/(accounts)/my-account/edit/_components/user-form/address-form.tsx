"use client";

import { useRouter } from "next/navigation";
import { InputForm } from "@/components/input-form";
import { ErrorMessage } from "@/components/error-message";
import { UserIcon } from "lucide-react";
import { Typography } from "@/components/typography";
import { UseFormRegister } from "react-hook-form";
import { EditProfileFormValues } from ".";

interface AddressFormProps {
  register: UseFormRegister<EditProfileFormValues>;
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
            register={register("address.street")}
            icon={<UserIcon size={24} />}
            className="w-[250px]"
          />

          <InputForm
            label="Número"
            name="number"
            id="number"
            placeholder="N°"
            register={register("address.number")}
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
          register={register("address.city")}
          className="w-full"
        />
        {errors.city && <ErrorMessage error={errors.city.message} />}

        <InputForm
          label="Bairoo"
          name="district"
          id="district"
          type="text"
          placeholder="Bairro"
          register={register("address.district")}
          className="w-full"
        />
        {errors.district && <ErrorMessage error={errors.district.message} />}

        <InputForm
          label="CEP"
          name="zip_code"
          id="zip_code"
          type="text"
          placeholder="CEP"
          register={register("address.zip_code")}
          className="w-full"
        />
        {errors.zip_code && <ErrorMessage error={errors.zip_code.message} />}

        <InputForm
          label="Estado"
          name="state"
          id="state"
          type="select"
          placeholder="Informe seu estado"
          register={register("address.state")}
          className="w-full"
        />
        {errors.state && <ErrorMessage error={errors.state.message} />}

        <InputForm
          label="Complemento"
          name="complement"
          id="complement"
          type="text"
          placeholder="Complemento"
          register={register("address.complement")}
          className="w-full"
        />
        {errors.complement && (
          <ErrorMessage error={errors.complement.message} />
        )}
      </div>
    </div>
  );
}
