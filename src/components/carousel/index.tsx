"use client";

import { useCarousel } from "./useCarousel";
import {
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  Carousel as CarouselWrapper,
} from "@/components/ui/carousel";
import { FeaturedEvent } from "../event";
import { Event } from "@/types/event";
import { cn } from "@/lib/utils";

interface CarouselProps {
  events: Event[];
  loop?: boolean;
  pagination?: boolean;
}

export function Carousel({
  events,
  loop = true,
  pagination = true,
}: CarouselProps) {
  const {
    setCarouselApi,
    current,
    count,
    carouselApi,
    nextPage,
    previousPage,
    goToPage,
  } = useCarousel({
    totalItems: events.length,
    itemsPerPage: 1,
    loop,
  });

  return (
    <div className="relative">
      <CarouselWrapper
        setApi={setCarouselApi}
        opts={{
          loop,
          slidesToScroll: 1,
        }}
        className="relative select-none"
      >
        <CarouselContent className="relative">
          {events.map((event) => (
            <CarouselItem key={event.uuid} className="w-[650px] relative z-10">
              <FeaturedEvent event={event} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          className="absolute left-2 z-20 top-1/2 -translate-y-1/2"
          onClick={previousPage}
        />
        <CarouselNext
          className="absolute right-2 z-20 top-1/2 -translate-y-1/2"
          onClick={nextPage}
        />
      </CarouselWrapper>

      {pagination && (
        <CarouselPagination
          current={current}
          length={count}
          goToPage={goToPage}
        />
      )}
    </div>
  );
}

function CarouselPagination({
  current,
  length,
  goToPage,
}: {
  current: number;
  length: number;
  goToPage: (page: number) => void;
}) {
  return (
    <div className="w-full pt-32 gap-4 flex justify-center absolute bottom-0">
      {Array.from({ length }).map((_, index) => (
        <div
          key={index}
          className={cn([
            "w-4 h-4 bg-white opacity-70 rounded-full transition-all duration-300 cursor-pointer",
            current === index && "w-4 bg-purple opacity-100",
          ])}
          onClick={() => goToPage(index)}
        />
      ))}
    </div>
  );
}
