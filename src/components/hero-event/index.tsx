"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Typography } from "../typography";
import { Button } from "@/components/ui/button";
import { AlarmClockIcon, CalendarIcon, MapPinIcon } from "lucide-react";
import { Event } from "@/types/event";

export interface HeroEventProps {
  event: Event;
  isEventDetail?: boolean;
}

export function HeroEvent({ event, isEventDetail = false }: HeroEventProps) {
  const router = useRouter();
  return (
    <div className="relative flex justify-start items-center w-full max-h-[614px] px-20 py-10 gap-4">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/carousel.svg"
          alt="Background"
          className="h-full w-full object-cover object-center"
          width={1920}
          height={1080}
          style={{ aspectRatio: "1920/1080", objectFit: "cover" }}
        />
        <GradientHeroSection />
      </div>

      <div
        data-testid="hero-event-container"
        className="relative flex w-full h-full items-center justify-start gap-10 py-10 z-10 tab-port:gap-8"
      >
        {!isEventDetail ? (
          <div data-testid="hero-event-image">
            <Image
              src={"/assets/images/banner-vertical.svg"}
              alt={`Image of ${event.name}`}
              width={334}
              height={334}
              className="rounded-lg h-fit mobile:hidden"
            />
          </div>
        ) : null}
        <div className="flex flex-col items-start w-fit h-full gap-4 tab-port:gap-2">
          <Typography
            data-testid="hero-event-name"
            variant={"h3"}
            fontWeight={"extrabold"}
            className="tab-port:text-[20px]"
          >
            {event.name}
          </Typography>

          <Typography
            data-testid="hero-event-description"
            variant={"h5"}
            fontWeight={"regular"}
            className="leading-[24px] text-white tab-port:line-clamp-4 mobile:line-clamp-2"
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
                className="leading-[33px] tab-port:leading-[20px] text-white"
              >
                {event.time}
              </Typography>
            </div>
            <div className="flex w-fit h-fit items-center gap-3">
              <CalendarIcon size={28} color={"white"} />
              <Typography
                variant={"h5"}
                fontWeight={"medium"}
                className="leading-[33px] tab-port:leading-[20px] text-white"
              >
                {event.date.toLocaleString("pt-BR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </Typography>
            </div>
            <div className="flex w-fit h-fit items-center gap-3">
              <MapPinIcon size={28} color={"white"} />
              <Typography
                data-testid="hero-event-address"
                variant={"h5"}
                fontWeight={"medium"}
                className="leading-[33px] tab-port:leading-[20px] text-white"
              >
                {event.address_data.street}, {event.address_data.district},{" "}
                {event.address_data.city}, {event.address_data.state}
              </Typography>
            </div>
          </div>

          {!isEventDetail && (
            <Button
              data-testid="hero-event-buy-button"
              className="min-w-[300px] h-16 bg-[#E85AFF] hover:bg-purple/80 rounded-sm tab-port:h-12"
              onClick={() => router.push(`/event/${event.uuid}`)}
            >
              <Typography
                variant="h6"
                fontWeight={"semibold"}
                color={"white"}
                className="leading-3"
              >
                COMPRAR INGRESSO
              </Typography>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function GradientHeroSection() {
  return (
    <div className="absolute inset-0 bg-gradient-to-t from-black to-black/80" />
  );
}
