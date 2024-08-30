"use client";

import Image from "next/image";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/typography";
import { LockIcon } from "lucide-react";
import { ErrorMessage } from "../../../../components/error-message";
import { InputForm } from "@/components/input-form";
import { useRouter } from "next/navigation";
import { authChangePassword } from "@/actions/auth-change-password";

const ChangePasswordFormSchema = z
  .object({
    password: z.string().min(4, "Senha deve conter no mínimo 4 caracteres"),
    newPassword: z
      .string()
      .min(4, "Nova senha deve conter no mínimo 4 caracteres"),
    confirmPassword: z
      .string()
      .min(4, "Confirmação de senha deve conter no mínimo 4 caracteres"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type ChangePasswordFormSchema = z.infer<typeof ChangePasswordFormSchema>;

interface ChangePasswordFormProps {
  userId: string;
}

export function ChangePasswordForm({ userId }: ChangePasswordFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ChangePasswordFormSchema>({
    resolver: zodResolver(ChangePasswordFormSchema),
  });

  const onSubmit: SubmitHandler<ChangePasswordFormSchema> = async (data) => {
    const { password, newPassword, confirmPassword } = data;
    try {
      const response = await authChangePassword(
        userId,
        password,
        newPassword,
        confirmPassword
      );

      if (response) {
        router.refresh();
        router.replace("/login");
      }
    } catch (error) {
      console.error("Erro ao alterar senha:", error);
    }
  };

  return (
    <form
      className="flex justify-center items-center w-full h-full bg-background gap-10 mt-4"
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
        <div className="flex flex-col gap-6 py-3 w-full h-fit">
          <Typography variant="h3" fontWeight={"bold"} className="w-full">
            Altere sua senha
          </Typography>
          <Typography variant="h5" fontWeight={"regular"} className="w-full">
            Digite sua senha atual e a nova senha para alterar sua senha.
          </Typography>
        </div>

        <div className="flex flex-col max-w-[600px] gap-6">
          <div className="flex flex-col gap-6">
            <div>
              <InputForm
                label="Senha atual"
                name="password"
                id="password"
                placeholder="Digite sua senha atual"
                register={register("password")}
                type="password"
                icon={<LockIcon size={24} />}
              />
              {errors.password && (
                <ErrorMessage error={errors.password.message} />
              )}
            </div>

            <div>
              <InputForm
                label="Nova senha"
                id="newPassword"
                name="newPassword"
                placeholder="Digite sua nova senha"
                register={register("newPassword")}
                type="password"
                icon={<LockIcon size={24} />}
              />
              {errors.newPassword && (
                <ErrorMessage error={errors.newPassword.message} />
              )}
            </div>

            <div>
              <InputForm
                label="Confirme sua nova senha"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirme sua nova senha"
                register={register("confirmPassword")}
                type="password"
                icon={<LockIcon size={24} />}
              />
              {errors.confirmPassword && (
                <ErrorMessage error={errors.confirmPassword.message} />
              )}
            </div>
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 bg-purple hover:bg-purple/60"
          >
            <Typography variant={"h5"} fontWeight={"semibold"}>
              {isSubmitting ? "Confirmando..." : "Alterar senha"}
            </Typography>
          </Button>
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
