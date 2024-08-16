"use client";

import Image from "next/image";
import {
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  Carousel as CarouselWrapper,
} from "@/components/ui/carousel";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export function Carousel() {
  return (
    <div className="w-full h-full">
      <CarouselWrapper className="h-[600px] w-full">
        <CarouselContent>
          <CarouselItem>
            <Image
              src="/assets/images/carousel.svg"
              alt="Banner"
              fill
              objectFit="cover"
              className="h-[600px] w-full object-cover"
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src="/assets/images/carousel.svg"
              alt="Banner"
              width={1920}
              height={600}
              className="h-[600px] w-full object-cover"
            />
          </CarouselItem>
        </CarouselContent>

        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-2/2 rounded-full bg-white/50 p-2 hover:bg-white/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
          <ChevronLeftIcon className="h-6 w-6 text-primary" />
          <span className="sr-only">Previous</span>
        </CarouselPrevious>

        <CarouselNext className="absolute right-4 top-1/2 -translate-y-2/2 rounded-full bg-white/50 p-2 hover:bg-white/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
          <ChevronRightIcon className="h-6 w-6 text-primary" />
          <span className="sr-only">Next</span>
        </CarouselNext>
      </CarouselWrapper>
    </div>
  );
}
