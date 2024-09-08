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
    <div className="flex w-full h-[490px]">
 
      <div className="w-1/2 h-full">
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
          className="object-cover w-full h-full rounded-tl-lg rounded-bl-lg" 
        />
      </div>
      <div className="w-1/2 h-full flex flex-col justify-center bg-white p-6 text-black rounded-tr-lg rounded-br-lg shadow-lg">
        <Typography
          data-testid="hero-event-name"
          variant={"h3"}
          fontWeight={"extrabold"}
          className="text-black"
        >
          {event.name}
        </Typography>

        <Typography
          data-testid="hero-event-description"
          variant={"h5"}
          fontWeight={"regular"}
          className="leading-[24px] text-black"
        >
          {event.description}
        </Typography>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <AlarmClockIcon size={28} color={"black"} />
            <Typography
              data-testid="hero-event-time"
              variant={"h5"}
              fontWeight={"medium"}
              className="leading-[33px] text-black"
            >
              {event.time}
            </Typography>
          </div>
          <div className="flex items-center gap-3">
            <CalendarIcon size={28} color={"black"} />
            <Typography
              variant={"h5"}
              fontWeight={"medium"}
              className="leading-[33px] text-black"
            >
              {event.date.toString()}
            </Typography>
          </div>
          <div className="flex items-center gap-3">
            <MapPinIcon size={28} color={"black"} />
            <Typography
              data-testid="hero-event-address"
              variant={"h5"}
              fontWeight={"medium"}
              className="leading-[33px] text-black"
            >
              {`${event.address_data.city}, ${event.address_data.number}, ${event.address_data.city}, ${event.address_data.state}`}
            </Typography>
          </div>
        </div>

        <Button
          data-testid="hero-event-buy-button"
          className="w-[70%] h-16 bg-[#E85AFF] hover:bg-purple/80 rounded-sm"
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
