"use client";

import { ErrorMessage } from "@/components/error-message";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { EditProfileFormValues } from ".";
import { Input } from "@/components/ui/input";
import { User } from "@/types/user";

interface AddressFormProps {
  user: User | null;
  register: UseFormRegister<EditProfileFormValues>;
  errors: FieldErrors<EditProfileFormValues>;
}

export function UserAddressForm({ user, register, errors }: AddressFormProps) {
  return (
    <div className="grid grid-cols-2 w-full h-fit gap-2 tab-port:grid-cols-1">
      <Input
        id="street"
        placeholder="Endereço"
        value={user?.address?.street}
        {...register("address.street")}
        className="w-full h-14"
      />

      <Input
        id="number"
        placeholder="N°"
        value={user?.address?.number}
        {...register("address.number")}
        className="w-full h-14"
      />

      {errors.address?.street && (
        <ErrorMessage error={errors.address.street.message} />
      )}

      <Input
        id="city"
        placeholder="Digite o nome da sua cidade"
        value={user?.address?.city}
        {...register("address.city")}
        className="w-full h-14"
      />

      {errors.address?.city && (
        <ErrorMessage error={errors.address.city.message} />
      )}

      <Input
        id="district"
        placeholder="Bairro"
        value={user?.address?.district}
        {...register("address.district")}
        className="w-full h-14"
      />

      {errors.address?.district && (
        <ErrorMessage error={errors.address.district.message} />
      )}

      <Input
        id="state"
        placeholder="Informe seu estado"
        value={user?.address?.state}
        {...register("address.state")}
        className="w-full h-14"
      />

      {errors.address?.state && (
        <ErrorMessage error={errors.address.state.message} />
      )}

      <Input
        id="zip_code"
        placeholder="CEP"
        value={user?.address?.zip_code}
        {...register("address.zip_code")}
        className="w-full h-14"
      />

      {errors.address?.zip_code && (
        <ErrorMessage error={errors.address.zip_code.message} />
      )}

      <Input
        id="complement"
        type="text"
        placeholder="Complemento"
        value={user?.address?.complement}
        {...register("address.complement")}
        className="w-full h-14"
      />

      {errors.address?.complement && (
        <ErrorMessage error={errors.address.complement.message} />
      )}
    </div>
  );
}
