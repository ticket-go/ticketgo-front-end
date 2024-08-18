import Image from "next/image";
import { Typography } from "../typography";
import { Button } from "@/components/ui/button";
import { AlarmClockIcon, CalendarIcon, MapPinIcon } from "lucide-react";
import type { Event } from "@/types/event";

export function Event() {
  return (
    <div className="flex justify-center items-center min-w-full max-h-[490px]">
      <Image
        data-testid="hero-event-image"
        src="/assets/images/event-destaque.png"
        alt="Event image"
        width={800}
        height={500}
      />
      <div className="flex flex-col items-start w-full h-full py-10 px-10 gap-4">
        <Typography
          data-testid="hero-event-name"
          variant={"h3"}
          fontWeight={"extrabold"}
          className=""
        >
          {/* {event.name} */}
          Baile da Penha na Gaiola
        </Typography>

        <Typography
          data-testid="hero-event-description"
          variant={"h5"}
          fontWeight={"regular"}
          className="leading-[24px]"
        >
          {/* {event.description} */}
          Prefeitura de Pau dos Ferros, através da Secretaria de Cultura e
          Turismo (SECULT), anunciou na noite deste domingo (26) as programações
          completas do São João da Princesinha e da FINECAP, que acontecem nos
          meses de junho e setembro de 2024, respectivamente.
        </Typography>

        <div className="flex flex-col gap-1">
          <div className="flex w-fit h-fit items-center gap-3">
            <AlarmClockIcon size={28} color={"white"} />
            <Typography
              data-testid="hero-event-time"
              variant={"h5"}
              fontWeight={"medium"}
              className="leading-[33px]"
            >
              {/* {event.time} */}
              23:00 PM
            </Typography>
          </div>
          <div className="flex w-fit h-fit items-center gap-3">
            <CalendarIcon size={28} color={"white"} />
            <Typography
              variant={"h5"}
              fontWeight={"medium"}
              className="leading-[33px]"
            >
              {/* {event.date} */}
              01/09 - 05/09/2024
            </Typography>
          </div>
          <div className="flex w-fit h-fit items-center gap-3">
            <MapPinIcon size={28} color={"white"} />
            <Typography
              data-testid="hero-event-address"
              variant={"h5"}
              fontWeight={"medium"}
              className="leading-[33px]"
            >
              {/* {event.address.street}, {event.address.number},{" "}
                {event.address.city}, {event.address.state} */}
              Rua do Chafariz, 28, Pau dos Ferros, Rio Grande do Norte
            </Typography>
          </div>
        </div>

        <Button
          data-testid="hero-event-buy-button"
          className="min-w-[300px] h-16 bg-[#E85AFF] hover:bg-purple/80 rounded-sm"
        >
          <Typography
            variant="h6"
            fontWeight={"semibold"}
            color={"white"}
            className="text-[10px] leading-3"
          >
            COMPRAR INGRESSO
          </Typography>
        </Button>
      </div>
    </div>
  );
}
