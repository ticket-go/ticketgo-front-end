import Image from "next/image";
import { Typography } from "../typography";
import type { EventCategory as Event } from "@/types/event-category";
import Link from "next/link";

export interface EventCategoryProps {
  event: Event;
  image: string;
}

export function EventCategory({ event, image }: EventCategoryProps) {
  return (
    <Link href={`/events/${event.category}`} passHref>
      <div
        data-testid="event-category-container"
        className="flex flex-col gap-2 items-center justify-center text-center w-fit h-fit"
      >
        <Image
          data-testid="event-category-image"
          src={"/assets/images/event-image.svg"}
          alt="Categoria do evento"
          width={140}
          height={140}
          className="rounded-full w-36 h-36 object-cover"
        />
        <Typography
          data-testid="event-category-name"
          className="text-lg font-semibold tracking-tight"
        >
          {event.category_display}
        </Typography>
      </div>
    </Link>
  );
}
