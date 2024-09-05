import Image from "next/image";
import { Typography } from "../typography";
import { Button } from "@/components/ui/button";
import { AlarmClockIcon, CalendarIcon, MapPinIcon } from "lucide-react";
import { Event } from "@/types/event";

interface FeaturedEventProps {
  event: Event;
}

export function FeaturedEvent({ event }: FeaturedEventProps) {
  return (
    <div className="flex justify-center items-center min-w-full max-h-[490px]">
      <div className="w-full h-full">
        <Image
          data-testid="hero-event-image"
          src={
            !event.image
              ? `${event.image}`
              : "/assets/images/event-destaque.png"
          }
          alt="Event image"
          width={800}
          height={500}
        />
      </div>
      <div className="flex flex-col items-start w-full h-full px-12 gap-4">
        <Typography
          data-testid="hero-event-name"
          variant={"h3"}
          fontWeight={"extrabold"}
        >
          {event.name}
        </Typography>

        <Typography
          data-testid="hero-event-description"
          variant={"h5"}
          fontWeight={"regular"}
          className="leading-[24px]"
        >
          {event.description}
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
              {event.time}
            </Typography>
          </div>
          <div className="flex w-fit h-fit items-center gap-3">
            <CalendarIcon size={28} color={"white"} />
            <Typography
              variant={"h5"}
              fontWeight={"medium"}
              className="leading-[33px]"
            >
              {event.date.toString()}
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
              {`${event.address_data.city}, ${event.address_data.number}, ${event.address_data.city}, ${event.address_data.state}`}
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
