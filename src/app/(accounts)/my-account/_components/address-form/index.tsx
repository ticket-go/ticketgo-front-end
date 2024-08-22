"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputForm } from "@/components/input-form";
import { ErrorMessage } from "@/app/(auth)/_components/error-message";
import { useAuth } from "@/hooks/useAuth";
import { UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/typography";

const AddressFormSchema = z.object({
  street: z.string().nonempty("Campo obrigatório"),
  number: z.string().nonempty("Campo obrigatório"),
  city: z.string().nonempty("Campo obrigatório"),
  district: z.string().nonempty("Campo obrigatório"),
  state: z.string().nonempty("Campo obrigatório"),
  zip_code: z.string().nonempty("Campo obrigatório"),
  country: z.string().nonempty("Campo obrigatório"),
  complement: z.string().optional(),
});

type AddressFormSchema = z.infer<typeof AddressFormSchema>;

const onSubmit: SubmitHandler<AddressFormSchema> = async (data) => {
  console.log(data);
};

export function AddressForm() {
  const router = useRouter();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isLoading, errors },
  } = useForm<AddressFormSchema>({
    resolver: zodResolver(AddressFormSchema),
  });

  return (
    <form
      className="flex flex-col justify-center items-center w-[1000px] h-fit"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="flex items-center justify-between w-full gap-4">
          <InputForm
            label="Rua"
            name="street"
            id="street"
            placeholder="Digite o nome da sua rua"
            register={register("street")}
            icon={<UserIcon size={24} />}
          />
          {errors.street && <ErrorMessage error={errors.street.message} />}

          <InputForm
            label="Número"
            name="number"
            id="number"
            placeholder="Informe o número da sua residência"
            register={register("number")}
            icon={<UserIcon size={24} />}
          />
          {errors.number && <ErrorMessage error={errors.number.message} />}
        </div>

        <div className="flex items-center justify-between w-full gap-4">
          <InputForm
            label="Cidade"
            name="city"
            id="city"
            type="city"
            placeholder="Digite o nome da sua cidade"
            register={register("city")}
          />
          {errors.city && <ErrorMessage error={errors.city.message} />}
        </div>

        <InputForm
          label="Telefone"
          name="phone"
          id="phone"
          type="phone"
          placeholder="Altere seu telefone"
          register={register("phone")}
        />
        {errors.state && <ErrorMessage error={errors.state.message} />}

        <Button type="submit">
          <Typography>Salvar alterações</Typography>
        </Button>
      </div>
    </form>
  );
}
