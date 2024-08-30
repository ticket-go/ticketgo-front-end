import { Typography } from "@/components/typography";
import { Suspense } from "react";
import Image from "next/image";
import { Event } from "@/types/event";

interface UserAdmProps {
  event: Event;
}

export default async function UserAdm({event}: UserAdmProps ) {

  return (
    <div className="w-full rounded-md shadow-lg flex flex-col p-6 bg-gradient-block gap-4">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex items-center gap-6">
         
          <Image
            src={"/assets/images/house.webp"} 
            alt={`Imagem do usuário`}
            width={200}
            height={200}
            className="rounded-full"
          />
        <div className="flex flex-col gap-2">
            <Typography fontWeight={"medium"} variant={"h4"}>{event.user.address?.city}</Typography>
            <Typography fontWeight={"light"} variant={"h5"}>
                {event.user.address?.street}, {event.user.address?.number}, {event.user.address?.district || "Não informado"}, {event.user.address?.city}, {event.user.address?.state}, {event.user.address?.zip_code || "Não informado"}
            </Typography>

            <Typography fontWeight={"light"} variant={"h6"}>A melhor casa de show do Rio Grande do Norte, cerveja quente e cara, chão sujo e torto, sem segurança nenhuma e com inúmeras moitas para os casais curtirem. Venham agora mesmo para o MuroSujoCasaShow e tenha uma noite inesquecível, aproveite ela como se fosse sua última noite, pois com nossa segurança e higienização, pode acabar sendo.</Typography>
          </div>
        </div>
      </Suspense>
    </div>
  );
}

