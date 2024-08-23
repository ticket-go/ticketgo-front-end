"use client";

import { useState } from "react";
import {
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselApi,
  Carousel as CarouselWrapper,
} from "@/components/ui/carousel";
import { FeaturedEvent } from "../event";
import { Event } from "@/types/event";

interface CarouselProps {
  events: Event[];
}

export function Carousel({ events }: CarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  return (
    <CarouselWrapper setApi={setApi} autoPlay={4000}>
      <CarouselContent className="mt-10">
        {events.map((event) => (
          <CarouselItem key={event.uuid} className="w-[650px]">
            <FeaturedEvent event={event} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselNavigator events={events} current={current} />
    </CarouselWrapper>
  );
}

function CarouselNavigator({
  events,
  current,
}: {
  events: Event[];
  current: number;
}) {
  return (
    <div className="absolute bottom-0.5 mt-10 left-1/2 -translate-x-2/4 flex gap-3">
      {events.map((_, index) => (
        <div
          key={index}
          className={`h-4 w-4 rounded-full ${
            index === current ? "bg-purple" : "bg-primary/50"
          }`}
        />
      ))}
    </div>
  );
}
