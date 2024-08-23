"use client";

import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Separator } from "./separator";
import { useRouter } from "next/navigation";

export default function AccountInformation() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <>
      <Typography
        variant="h3"
        fontWeight="semibold"
        className="p-4 mobile:py-0 mobile:text-[20px] font-semibold"
      >
        Informações pessoais
      </Typography>

      <Separator />

      <Typography className="p-4" variant="h4" fontWeight="semibold">
        Meus dados
      </Typography>
      <div className="flex gap-4 p-6 border-foreground tab-port:flex-col tab-port:p-4">
        <div className="flex gap-4 tab-port:flex-col">
          <div className="flex flex-col w-80">
            <Typography variant="h6" fontWeight="medium">
              Nome
            </Typography>
            <Typography variant="h6" fontWeight="regular">
              {user?.username}
            </Typography>
          </div>

          <div className="flex flex-col w-80">
            <Typography variant="h6" fontWeight="medium">
              E-mail
            </Typography>
            <Typography variant="h6" fontWeight="regular">
              {user?.email || "Nenhum e-mail informado."}
            </Typography>
          </div>
        </div>
      </div>
      <div className="flex gap-4 p-6 tab-port:p-4">
        <div className="flex gap-4 tab-port:flex-col">
          <div className="flex flex-col w-80">
            <Typography variant="h6" fontWeight="medium">
              CPF
            </Typography>
            <Typography variant="h6" fontWeight="regular">
              {user?.cpf || "Nenhum CPF informado."}
            </Typography>
          </div>
          <div className="flex flex-col">
            <Typography variant="h6" fontWeight="medium">
              Telefone
            </Typography>
            <Typography variant="h6" fontWeight="regular">
              {user?.phone || "Nenhum telefone informado."}
            </Typography>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-56 h-14 flex gap-4 border-purple bg-transparent text-purple hover:text-purple/80 hover:border-purple/90 hover:bg-transparent"
        onClick={() => router.push(`/my-account/edit/${user?.user_id}`)}
      >
        Alterar dados pessoais
      </Button>
    </>
  );
}
