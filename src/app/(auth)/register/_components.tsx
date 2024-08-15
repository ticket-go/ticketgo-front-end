"use client";

import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/typography";
import { User, LockIcon } from "lucide-react";
import { useState } from "react";

const RegisterFormSchema = z.object({
  name: z
    .string({ required_error: "Nome é obrigatório" })
    .trim()
    .min(4, { message: "Nome inválido, deve conter no mini 4 caracteres" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Usuário deve conter apenas letras, números e _",
    }),
  email: z.string({ required_error: "E-mail é obrigatório" }).email().trim(),
  password: z.string({ required_error: "Senha é obrigatória" }).min(4, {
    message: "Senha deve conter no mínimo 4 caracteres",
  }),
  passwordConfirmation: z
    .string({ required_error: "Senha é obrigatória" })
    .min(4, {
      message: "Senha deve conter no mínimo 4 caracteres",
    }),
});

type RegisterFormSchema = z.infer<typeof RegisterFormSchema>;

export function RegisterForm() {
  const {
    register,

    handleSubmit,
    formState: { isSubmitting, isLoading, errors },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterFormSchema> = async (data) => {
    console.log("enviou");
  };

  return (
    <form
      className="flex justify-center items-center w-full h-full bg-background gap-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center justify-center w-fit h-fit p-2.5 tab-port:hidden">
        <Image
          src={"/assets/images/left.svg"}
          width={700}
          height={700}
          alt="Sessão de Register"
          className="max-w-[80%] max-h-[80%] object-contain"
          style={{ aspectRatio: "800/800", objectFit: "cover" }}
        />
      </div>

      <div className="flex flex-col h-fit w-[600px] tab-port:w-full px-20">
        <div className="flex flex-col gap-4 py-4 w-full h-fit">
          <Typography variant="h3" fontWeight={"bold"} className="w-full">
            Crie sua conta
          </Typography>
          <Typography variant="h5" fontWeight={"regular"} className="w-full">
            Vamos preencher os dados para começar.
          </Typography>
        </div>

        <div className="flex flex-col max-w-[600px] gap-4">
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="username" className="text-lg font-medium">
              Nome
            </Label>
            <div className="relative flex items-center">
              <Input
                id="name"
                placeholder="Digite seu usuário"
                className="h-14 pl-12"
                {...register("name")}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                <User size={24} />
              </div>
            </div>
            {errors.name && (
              <p className="text-red-600 font-medium pl-2">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="flex flex-col max-w-[600px] gap-4">
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="email" className="text-lg font-medium">
                E-mail
              </Label>
              <div className="relative flex items-center">
                <Input
                  id="email"
                  placeholder="Digite seu e-mail"
                  className="h-14 pl-12"
                  {...register("email")}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  <User size={24} />
                </div>
              </div>
              {errors.email && (
                <p className="text-red-600 font-medium pl-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col w-full gap-2">
              <Label htmlFor="password" className="text-lg font-medium">
                Senha
              </Label>
              <div className="relative flex items-center">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  className="h-14 pl-12"
                  {...register("password")}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  <LockIcon size={24} />
                </div>
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeClosedIcon className="h-4 w-4" />
                  ) : (
                    <EyeOpenIcon className="h-4 w-4" />
                  )}
                </div>
              </div>
              {errors.password && (
                <p className="text-red-600 font-medium pl-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex flex-col w-full gap-2">
              <Label
                htmlFor="passwordConfirmation"
                className="text-lg font-medium"
              >
                Confirmação de Senha
              </Label>
              <div className="relative flex items-center">
                <Input
                  id="passwordConfirmation"
                  type={showPasswordConfirmation ? "text" : "password"}
                  placeholder="Digite sua senha novamente"
                  className="h-14 pl-12"
                  {...register("passwordConfirmation")}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  <LockIcon size={24} />
                </div>
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() =>
                    setShowPasswordConfirmation(!showPasswordConfirmation)
                  }
                >
                  {showPasswordConfirmation ? (
                    <EyeClosedIcon className="h-4 w-4" />
                  ) : (
                    <EyeOpenIcon className="h-4 w-4" />
                  )}
                </div>
              </div>
              {errors.passwordConfirmation && (
                <p className="text-red-600 font-medium pl-2">
                  {errors.passwordConfirmation.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full h-14 bg-purple hover:bg-purple/60"
            >
              <Typography variant={"h5"} fontWeight={"semibold"}>
                {isSubmitting ? "Entrando..." : "Entrar"}
              </Typography>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

function Span({ children, href }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href}>
      <span className="font-semibold text-[18px] leading-[27px] text-purple underline hover:text-purple/80">
        {children}
      </span>
    </Link>
  );
}
