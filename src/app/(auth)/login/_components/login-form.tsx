"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { GoogleButton } from "./google-button";
import { Typography } from "@/components/typography";
import { authLogin } from "@/actions/auth-login";
import { useAuth } from "@/hooks/useAuth";
import { User, LockIcon } from "lucide-react";
import { ErrorMessage } from "../../_components/error-message";
import { InputForm } from "@/components/input-form";

const loginFormSchema = z.object({
  username: z
    .string({ required_error: "Usuário é obrigatório" })
    .trim()
    .min(4, { message: "Usuário inválido, deve conter no mini 4 caracteres" })
    .max(20, { message: "Usuário deve ter no máximo 20 caracteres" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Usuário deve conter apenas letras, números e _",
    }),
  password: z.string({ required_error: "Senha é obrigatória" }).min(4, {
    message: "Senha deve conter no mínimo 4 caracteres",
  }),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const {
    register,

    handleSubmit,
    formState: { isSubmitting, isLoading, errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const { setUser, setIsAuthenticated } = useAuth();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormSchema> = async (data) => {
    const session = await authLogin(data.username, data.password);

    if (session) {
      setUser(session.user);
      setIsAuthenticated(true);
      router.replace("/");
    }
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
          alt="Sessão de login"
          className="max-w-[80%] max-h-[80%] object-contain"
          style={{ aspectRatio: "800/800", objectFit: "cover" }}
        />
      </div>

      <div className="flex flex-col h-fit w-[600px] tab-port:w-full px-20 gap-2">
        <div className="flex flex-col gap-6 py-4 w-full h-fit">
          <Typography variant="h3" fontWeight={"bold"} className="w-full">
            Entrar
          </Typography>
          <Typography variant="h5" fontWeight={"regular"} className="w-full">
            Vamos entrar na sua conta e começar.
          </Typography>
        </div>

        <div className="flex flex-col max-w-[600px] gap-6">
          <div className="flex flex-col gap-6">
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
                label="Senha"
                id="password"
                name="password"
                placeholder="Digite sua senha"
                register={register("password")}
                type="password"
                icon={<LockIcon size={24} />}
              />
              {errors.password && (
                <ErrorMessage error={errors.password.message} />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full h-14 bg-purple hover:bg-purple/60"
          >
            <Typography variant={"h5"} fontWeight={"semibold"}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Typography>
          </Button>
          <div className="flex flex-col justify-center items-center gap-2 w-full h-[124px] py-8">
            <Typography variant={"h5"}>
              Não tem uma conta? <Span href={"/register"}>Inscrever-se</Span>
            </Typography>

            <Typography variant={"h5"} className="mb-4">
              <Span href="/">Esqueceu sua senha?</Span>
            </Typography>
            <GoogleButton />
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
