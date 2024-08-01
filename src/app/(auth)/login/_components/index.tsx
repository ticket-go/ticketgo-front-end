"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createAuth } from "@/actions/create-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginFormSchema {
  username: string;
  password: string;
}

function LoginFormComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "";
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isLoading },
  } = useForm<LoginFormSchema>();

  const onSubmit: SubmitHandler<LoginFormSchema> = async (data) => {
    const session = await createAuth(data.username, data.password);

    if (session && session.errors) {
      console.error(session.errors);
      setError(session.errors[0].detail);
      return;
    }
  };

  return (
    <form
      className="flex flex-col gap-3 w-full max-w-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Label htmlFor="username">Usuário</Label>
        <Input id="username" {...register("username")} />
      </div>

      <div>
        <Label htmlFor="password">Senha</Label>
        <Input type="password" id="password" {...register("password")} />
      </div>

      <Button type="submit" disabled={isSubmitting || isLoading}>
        {isSubmitting ? "Carregando..." : "Entrar"}
      </Button>
    </form>
  );
}

export function LoginForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginFormComponent />
    </Suspense>
  );
}
