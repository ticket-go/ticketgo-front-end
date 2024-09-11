"use client";

import Image from "next/image";
import type { User as UserType } from "@/types/user";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/typography";
import { User, Calendar, Mail, LockIcon, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { createUser } from "@/actions/create-user";
import { ErrorMessage } from "../../../../components/error-message";
import { InputForm } from "@/components/input-form";
import { GenericButton } from "@/components/generic-button";

const RegisterFormSchema = z.object({
  username: z
    .string({ required_error: "Nome de usuário é obrigatório" })
    .trim()
    .min(4, { message: "Nome inválido, deve conter no min 4 caracteres" })
    .max(20, { message: "Nome inválido, deve conter no máx 20 caracteres" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Usuário deve conter apenas letras, números e _",
    }),
  first_name: z
    .string({ required_error: "Nome é obrigatório" })
    .trim()
    .min(4, { message: "Nome inválido, deve conter no mini 4 caracteres" })
    .regex(/^[a-zA-Z]+$/, {
      message: "Usuário deve conter apenas letras",
    }),
  last_name: z
    .string({ required_error: "Nome é obrigatório" })
    .trim()
    .min(4, { message: "Nome inválido, deve conter no mini 4 caracteres" })
    .regex(/^[a-zA-Z]+$/, {
      message: "Usuário deve conter apenas letras",
    }),
  cpf: z.string({ required_error: "CPF é obrigatório" }),
  birth_date: z.string({ required_error: "Data Inválida" }).date(),
  email: z.string({ required_error: "E-mail é obrigatório" }).email().trim(),
  password: z.string({ required_error: "Senha é obrigatória" }).min(4, {
    message: "Senha deve conter no mínimo 4 caracteres",
  }),
});

type RegisterFormSchema = z.infer<typeof RegisterFormSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [isFirstForm, setIsFirstForm] = useState(true);

  const handleForm = () => {
    setIsFirstForm((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, isLoading, errors },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      username: "",
      first_name: "",
      last_name: "",
      birth_date: "",
      cpf: "",
      email: "",
      password: "",
    },
  });

  const firstName = watch("first_name");
  const lastName = watch("last_name");
  const birthDate = watch("birth_date");
  const cpf = watch("cpf");

  const allFieldsFilled = firstName && lastName && birthDate && cpf;

  const onSubmit: SubmitHandler<RegisterFormSchema> = async (data) => {
    const userData: UserType = {
      user_id: "",
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
      birth_date: new Date(data.birth_date),
      cpf: data.cpf,
      email: data.email,
      privileged: false,
      password: data.password,
    };
    const response = await createUser(userData);

    if (response) {
      router.replace("/login");
    }
  };

  return (
    <form
      className="flex justify-center items-center w-full h-full bg-background gap-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center justify-center w-fit h-fit p-2.5 tab-land:hidden">
        <Image
          src={"/assets/images/register.svg"}
          width={750}
          height={700}
          alt="Sessão de Register"
          className="max-w-[80%] max-h-[80%] object-contain"
          style={{ aspectRatio: "800/800", objectFit: "cover" }}
        />
      </div>

      <div className="flex flex-col items-start h-fit w-[600px] tab-port:w-full px-20 gap-2">
        {!isFirstForm && (
          <Button
            type="button"
            variant={"outline"}
            className="w-fit bg-transparent"
            onClick={() => handleForm()}
          >
            <ArrowLeft size={24} />
            <Typography variant="h5" fontWeight={"regular"}>
              Voltar
            </Typography>
          </Button>
        )}
        <div className="flex flex-col gap-4 py-4 w-full h-fit">
          <Typography variant="h3" fontWeight={"bold"} className="w-full">
            Crie sua conta
          </Typography>
          <Typography variant="h5" fontWeight={"regular"} className="w-full">
            Preencha os dados inicias para continuar.
          </Typography>
        </div>

        {isFirstForm ? (
          <div className="flex flex-col w-full gap-6">
            <div className="flex flex-col gap-2">
              <div>
                <InputForm
                  label="Nome"
                  name="first_name"
                  id="first_name"
                  placeholder="Digite seu nome"
                  register={register("first_name")}
                  icon={<User size={24} />}
                />
                {errors.first_name && (
                  <ErrorMessage error={errors.first_name.message} />
                )}
              </div>

              <div>
                <InputForm
                  label="Sobrenome"
                  name="last_name"
                  id="last_name"
                  placeholder="Digite seu sobrenome"
                  register={register("last_name")}
                  icon={<User size={24} />}
                />
                {errors.last_name && (
                  <ErrorMessage error={errors.last_name.message} />
                )}
              </div>

              <div>
                <InputForm
                  label="Data de nascimento"
                  name="birth_date"
                  id="birth_name"
                  type="date"
                  placeholder="Digite sua data de nascimento"
                  register={register("birth_date")}
                  icon={<Calendar size={24} />}
                />
                {errors.birth_date && (
                  <ErrorMessage error={errors.birth_date.message} />
                )}
              </div>

              <div>
                <InputForm
                  label="CPF"
                  name="cpf"
                  id="cpf"
                  placeholder="Digite seu CPF"
                  register={register("cpf")}
                  icon={<User size={24} />}
                />
                {errors.cpf && <ErrorMessage error={errors.cpf.message} />}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  className="w-full h-14 border-[1px] border-purple bg-transparent hover:bg-purple/10"
                  onClick={() => router.back()}
                >
                  <Typography variant={"h5"} fontWeight={"semibold"}>
                    Cancelar
                  </Typography>
                </Button>
                <Button
                  type="button"
                  disabled={!allFieldsFilled}
                  className="w-full h-14 bg-purple hover:bg-purple/60"
                  onClick={() => handleForm()}
                >
                  <Typography variant={"h5"} fontWeight={"semibold"}>
                    Continuar
                  </Typography>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full gap-6">
            <div className="flex flex-col gap-2 ">
              <div>
                <InputForm
                  label="Usuário"
                  name="username"
                  id="username"
                  placeholder="Digite seu usuário"
                  register={register("username")}
                  icon={<User size={24} />}
                />
                {errors.username && (
                  <ErrorMessage error={errors.username.message} />
                )}
              </div>

              <div>
                <InputForm
                  label="E-mail"
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Digite seu Email"
                  register={register("email")}
                  icon={<Mail size={24} />}
                />
                {errors.email && <ErrorMessage error={errors.email.message} />}
              </div>
              <div className="relative flex items-center">
                <InputForm
                  label="Senha"
                  name="password"
                  id="password"
                  type={"password"}
                  placeholder="Digite sua senha"
                  register={register("password")}
                  icon={<LockIcon size={24} />}
                />
                {errors.email && <ErrorMessage error={errors.email.message} />}
              </div>
              <Button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full h-14 bg-purple hover:bg-purple/60"
                onClick={handleSubmit(onSubmit)}
              >
                <Typography variant={"h5"} fontWeight={"semibold"}>
                  {isSubmitting ? "Criando..." : "Criar"}
                </Typography>
              </Button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
