import Image from "next/image";
import { Typography } from "@/components/typography";
import { Suspense } from "react";
import { Event } from "@/types/event";

interface UserAdmProps {
  event: Event;
}

export default async function UserAdm({ event }: UserAdmProps) {
  return (
    <div className="w-full rounded-md shadow-lg flex flex-col p-6 bg-backgroundCard gap-4">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex items-center gap-6">
          <Image
            src={"/assets/images/icons/pin.webp"}
            alt={`Imagem do usuário`}
            width={100}
            height={100}
            className="rounded-full"
          />
          <div className="flex flex-col gap-2">
            <Typography fontWeight={"medium"} variant={"h4"}>
              {event.address_data.city}
            </Typography>
            <Typography fontWeight={"light"} variant={"h5"}>
              {event.address_data.city}, {event.address_data.number},{" "}
              {event.address_data.district}, {event.address_data.city},{" "}
              {event.address_data.state}, {event.address_data.zip_code}
            </Typography>

            <Typography fontWeight={"light"} variant={"h6"}>
              A melhor casa de show do Rio Grande do Norte, cerveja quente e
              cara, chão sujo e torto, sem segurança nenhuma e com inúmeras
              moitas para os casais curtirem. Venham agora mesmo para o
              MuroSujoCasaShow e tenha uma noite inesquecível, aproveite ela
              como se fosse sua última noite, pois com nossa segurança e
              higienização, pode acabar sendo.
            </Typography>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
