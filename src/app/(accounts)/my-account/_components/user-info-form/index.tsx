"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputForm } from "@/components/input-form";
import { ErrorMessage } from "@/app/(auth)/_components/error-message";
import { UserFormSchema } from "@/const/user-form";
import { User } from "@/types/user";
import { putUser } from "@/actions/put-user";
import { useAuth } from "@/hooks/useAuth";
import { UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/typography";

type UserInfoFormSchema = z.infer<typeof UserFormSchema>;

export function UserInfoForm() {
  const router = useRouter();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<UserInfoFormSchema>({
    resolver: zodResolver(UserFormSchema),
  });

  const activeUserId = useMemo(() => {
    return user?.user_id as string;
  }, [user]);

  const onSubmit: SubmitHandler<UserInfoFormSchema> = async (data) => {
    const userData: User = {
      username: user?.username as string,
      first_name: data.first_name,
      last_name: data.last_name,
    };
    const response = await putUser(activeUserId, userData);

    if (response) {
      router.replace("/my-account");
    }
  };

  return (
    <form
      className="flex flex-col justify-center items-center w-[1000px] h-fit"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="flex items-center justify-between w-full gap-4">
          <InputForm
            label="Nome"
            name="first_name"
            id="first_name"
            placeholder="Digite seu nome"
            register={register("first_name")}
            icon={<UserIcon size={24} />}
          />
          {errors.first_name && (
            <ErrorMessage error={errors.first_name.message} />
          )}

          <InputForm
            label="Sobrenome"
            name="last_name"
            id="last_name"
            placeholder="Digite seu sobrenome"
            register={register("last_name")}
            icon={<UserIcon size={24} />}
          />
          {errors.last_name && (
            <ErrorMessage error={errors.last_name.message} />
          )}
        </div>

        <div className="flex items-center justify-between w-full gap-4">
          <InputForm
            label="Email"
            name="email"
            id="email"
            type="email"
            placeholder="Digite sua data de nascimento"
            register={register("email")}
          />
          {errors.email && <ErrorMessage error={errors.email.message} />}
        </div>

        <InputForm
          label="Telefone"
          name="phone"
          id="phone"
          type="phone"
          placeholder="Altere seu telefone"
          register={register("phone")}
        />
        {errors.email && <ErrorMessage error={errors.email.message} />}

        <Button>
          <Typography>Salvar alterações</Typography>
        </Button>
      </div>
    </form>
  );
}
