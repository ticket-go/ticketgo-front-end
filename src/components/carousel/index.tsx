"use client";

import { useState, useEffect } from "react";

import {
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselApi,
  Carousel as CarouselWrapper,
} from "@/components/ui/carousel";
import { Event } from "../event";

export function Carousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  return (
    <CarouselWrapper setApi={setApi} autoPlay={4000}>
      <CarouselContent className="mb-10">
        <CarouselItem>
          <Event />
        </CarouselItem>
        <CarouselItem>
          <Event />
        </CarouselItem>
        <CarouselItem>
          <Event />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />

      <CarouselNavigator />
    </CarouselWrapper>
  );
}

function CarouselNavigator() {
  return (
    <div className="absolute bottom-0.5 mt-10 left-1/2 -translate-x-2/4 flex gap-3">
      <div className="h-4 w-4 rounded-full bg-purple" />
      <div className="h-4 w-4 rounded-full bg-primary/50" />
      <div className="h-4 w-4 rounded-full bg-primary/50" />
    </div>
  );
}
