"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Typography } from "../typography";
import { Button } from "@/components/ui/button";
import { AlarmClockIcon, CalendarIcon, MapPinIcon } from "lucide-react";
import type { HeroEvent as Event } from "@/types/event-hero";

export interface HeroEventProps {
  event: Event;
}

export function HeroEvent({ event }: HeroEventProps) {
  const router = useRouter();
  return (
    <div className="relative flex justify-start items-center w-full max-h-[614px] px-20 py-10 gap-4">
      {/* Image Hero */}
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

      {/* info */}
      <div
        data-testid="hero-event-container"
        className="relative flex w-full h-full items-start gap-10 py-10 z-10"
      >
        <div data-testid="hero-event-image">
          <Image
            src={event.image}
            alt={`Image of ${event.name}`}
            width={334}
            height={400}
            className="rounded-lg h-fit"
          />
        </div>
        <div className="flex flex-col items-start w-fit h-full gap-4">
          <Typography
            data-testid="hero-event-name"
            variant={"h3"}
            fontWeight={"extrabold"}
            className="text-white"
          >
            {event.name}
          </Typography>

          <Typography
            data-testid="hero-event-description"
            variant={"h5"}
            fontWeight={"regular"}
            className="leading-[24px] text-white"
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
                className="leading-[33px] text-white"
              >
                {event.time}
              </Typography>
            </div>
            <div className="flex w-fit h-fit items-center gap-3">
              <CalendarIcon size={28} color={"white"} />
              <Typography
                variant={"h5"}
                fontWeight={"medium"}
                className="leading-[33px] text-white"
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
                className="leading-[33px] text-white"
              >
                {event.address.street}, {event.address.number},{" "}
                {event.address.city}, {event.address.state}
              </Typography>
            </div>
          </div>

          <Button
            data-testid="hero-event-buy-button"
            className="min-w-[300px] h-16 bg-[#E85AFF] hover:bg-purple/80 rounded-sm"
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
