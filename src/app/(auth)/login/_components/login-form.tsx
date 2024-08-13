"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GoogleButton } from "./google-button";
import { Typography } from "@/components/typography";
import { authLogin } from "@/actions/auth-login";
import { useAuth } from "@/hooks/useAuth";

interface LoginFormSchema {
  username: string;
  password: string;
}

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isLoading },
  } = useForm<LoginFormSchema>();

  const { setUser, setIsAuthenticated } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormSchema> = async (data) => {
    const session = await authLogin(data.username, data.password);

    if (session && session.errors) {
      console.error(session.errors);
      setError(session.errors[0].detail);
      return;
    }

    if (session) {
      setUser(session.user);
      setIsAuthenticated(true);
      router.replace("/");
    }
  };

  return (
    <form
      className="flex justify-center items-center w-full h-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center gap-4">
        <Typography variant="h1" fontWeight={"bold"} className="w-full">
          Entre na sua conta
        </Typography>

        <div className="flex flex-col w-[400px] gap-5">
          <div className="flex flex-col gap-2 w-[400px]">
            <Label htmlFor="username" className="text-lg">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Digite seu username"
              className="h-14"
              {...register("username", { required: true })}
            />
          </div>

          <div className="flex flex-col gap-2 w-[400px]">
            <Label htmlFor="password" className="text-lg">
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              className="h-14"
              {...register("password", { required: true })}
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 w-full">
            <Button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full h-14"
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
            <Separator />
            <GoogleButton />
          </div>
        </div>
      </div>
    </form>
  );
}

function Separator() {
  return (
    <div className="flex items-center w-fit gap-2">
      <hr className="border-t border-gray-400 w-32" />
      <span className="text-gray-300">ou</span>
      <hr className="border-t border-gray-400 w-32" />
    </div>
  );
}
