"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Typography } from "../typography";
import { Card, CardContent } from "@/components/ui/card";
import { Event } from "@/types/event";
import { Button } from "../ui/button";
import { useMemo } from "react";

export interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const router = useRouter();

  return (
    <Card
      data-testid="event-card-container"
      className="flex flex-col items-center w-full max-w-[500px] rounded-sm border-0 border-l-4 border-purple bg-white transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
    >
      <div className="p-4 w-full">
        <Image
          data-testid="event-card-image"
          src={"/assets/images/event-destaque.png"}
          alt={`Imagem do evento ${event.name}`}
          width={500}
          height={300}
          priority
          className="rounded-sm object-cover w-full"
        />
      </div>
      <CardContent className="flex flex-col gap-3 w-full p-4">
        <div className="flex justify-center items-start w-full h-fit gap-2 overflow-hidden">
          <EventDate date={event.date.toString()} />
          <div className="flex flex-col w-full h-fit overflow-hidden">
            <Typography
              data-testid="event-card-title"
              variant="h5"
              fontWeight={"black"}
              className="leading-[21px] truncate text-black text-lg mobile:text-sm tab-port:text-base"
            >
              {event.name}
            </Typography>
            <Typography
              data-testid="event-card-title"
              variant="h6"
              fontWeight={"medium"}
              className="text-[12px] truncate text-black text-sm mobile:text-xs tab-port:text-sm"
            >
              Mari Fernandez, Rai Saia Rodada, DJ Guuga
            </Typography>
            <Typography
              data-testid="event-card-date-hour"
              variant="h6"
              fontWeight={"bold"}
              className="text-[12px] text-black text-sm mobile:text-xs tab-port:text-sm"
            >
              {event.time.slice(0, 5)}
            </Typography>
          </div>
        </div>
        <EventLocation event={event} />

        <Button
          data-testid="event-card-button"
          className="w-full h-12 bg-[#E85AFF] hover:bg-purple/80 rounded-sm"
          onClick={() => router.push(`/event/${event.uuid}`)}
        >
          <Typography
            variant="h6"
            fontWeight={"semibold"}
            color={"white"}
            className="text-[10px] leading-3 text-sm mobile:text-xs tab-port:text-sm text-center truncate"
          >
            VER DETALHES DO EVENTO
          </Typography>
        </Button>
      </CardContent>
    </Card>
  );
}

function EventDate({ date }: { date: Date | string }) {
  const day = useMemo(() => {
    const dateObj = new Date(date);
    return dateObj.getDate();
  }, [date]);

  const month = useMemo(() => {
    const dateObj = new Date(date);
    return dateObj.toLocaleString("pt-br", { month: "short" });
  }, [date]);

  return (
    <div className="flex flex-col justify-center items-center w-[45px] min-h-14 h-fit rounded-sm px-3 py-2 bg-[#E85AFF]">
      <Typography
        variant={"h5"}
        fontWeight={"extrabold"}
        color={"white"}
        className="leading-[30px] text-lg mobile:text-sm tab-port:text-base"
      >
        {day}
      </Typography>
      <Typography
        variant={"h6"}
        fontWeight={"extrabold"}
        color={"white"}
        className="leading-[15px] text-sm mobile:text-xs tab-port:text-sm"
      >
        {month}
      </Typography>
    </div>
  );
}

interface EventLocationProps {
  event: Event;
}

export function EventLocation({ event }: EventLocationProps) {
  return (
    <div className="flex justify-center items-center w-full h-fit gap-2">
      <Image
        src={"/assets/images/icons/pin.webp"}
        alt="Imagem de localização do evento"
        width={43}
        height={43}
      />
      <div className="flex flex-col w-full h-fit">
        <Typography
          variant={"h6"}
          fontWeight={"semibold"}
          className="leading-[15px] text-black text-sm mobile:text-xs tab-port:text-sm"
        >
          {event.address_data.city}
        </Typography>
      </div>
    </div>
  );
}
