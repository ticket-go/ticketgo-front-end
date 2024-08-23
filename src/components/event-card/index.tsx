"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Typography } from "../typography";
import { Card, CardContent } from "@/components/ui/card";
import { Event } from "@/types/event";
import { Button } from "../ui/button";

export interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const router = useRouter();

  return (
    <Card
      data-testid="event-card-container"
      className="flex flex-col items-center w-[284px] h-[315px] rounded-sm border-0 border-b-2 border-l-[3px] border-purple p-2.5 gap-2.5 bg-background"
    >
      <Image
        data-testid="event-card-image"
        src={"/assets/images/event-image.svg"}
        alt={`Imagem do evento ${event.name}`}
        width={500}
        height={300}
        priority
        className="rounded-sm object-cover w-full"
      />
      <CardContent className="flex flex-col gap-3 w-[284px]">
        <div className="flex justify-center items-center w-full h-fit gap-2 px-4">
          <EventDate date={event.date} />
          <div className="flex flex-col w-full h-fit">
            <Typography
              data-testid="event-card-title"
              variant="h5"
              fontWeight={"black"}
              className="leading-[21px] truncate"
            >
              {event.name}
            </Typography>
            <Typography
              data-testid="event-card-title"
              variant="h6"
              fontWeight={"medium"}
              className="text-[12px] truncate"
            >
              Mari Fernandez, Nattan e Tarcisio do Acordenon
            </Typography>
            <Typography
              data-testid="event-card-date-hour"
              variant="h6"
              fontWeight={"bold"}
              className="text-[12px]"
            >
              {event.time}
            </Typography>
          </div>
        </div>
        <EventLocation
          image={"/assets/images/second-image.svg"}
          location={event.address.city}
        />

        <Button
          data-testid="event-card-button"
          className="w-full h-12 bg-[#E85AFF] hover:bg-purple/80 rounded-sm"
          onClick={() => router.push(`/event/${event.uuid}`)}
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
      </CardContent>
    </Card>
  );
}

function EventDate({ date }: { date: Date }) {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return <div>Invalid date</div>;
  }

  const day = date.getDate();
  const month = date.toLocaleString("pt-BR", { month: "short" }).toUpperCase();

  return (
    <div className="flex flex-col justify-center items-center w-[45px] min-h-14 h-fit rounded-sm px-3 py-2 bg-[#E85AFF]">
      <Typography
        variant={"h5"}
        fontWeight={"extrabold"}
        color={"white"}
        className="leading-[30px]"
      >
        {day}
      </Typography>
      <Typography
        variant={"h6"}
        fontWeight={"extrabold"}
        color={"white"}
        className="leading-[15px]"
      >
        {month}
      </Typography>
    </div>
  );
}

export function EventLocation({
  image,
  location,
}: {
  image: string;
  location: string;
}) {
  return (
    <div className="flex justify-center items-center w-full h-fit gap-2">
      <Image
        src={image}
        alt="Imagem de localização do evento"
        width={43}
        height={43}
      />
      <div className="flex flex-col w-full h-fit">
        <Typography
          variant={"h6"}
          fontWeight={"semibold"}
          className="leading-[15px]"
        >
          {location}
        </Typography>
      </div>
    </div>
  );
}
