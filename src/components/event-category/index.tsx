import Image from "next/image";
import { Typography } from "../typography";
import type { EventCategory as Event } from "@/types/event-category";
import Link from "next/link";

export interface EventCategoryProps {
  event: Event;
}

const categoryIcons: { [key: string]: string } = {
  music: "/assets/images/icons/musica.png",
  sports: "/assets/images/icons/esportes.png",
  entertainment: "/assets/images/icons/entretenimento.png",
  conference: "/assets/images/icons/conference.png",
  workshop: "/assets/images/icons/workshops.png",
  other: "/assets/images/icons/others.png",
};

export function EventCategory({ event }: EventCategoryProps) {
  const iconSrc =
    categoryIcons[event.category.toLowerCase()] ||
    "/assets/images/icons/event-image.svg";

  return (
    <Link href={`/events/${event.category}`} passHref>
      <div
        data-testid="event-category-container"
        className="flex flex-col gap-1 sm:gap-2 items-center justify-center text-center w-fit h-fit transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:opacity-90"
      >
        <Image
          data-testid="event-category-image"
          src={iconSrc}
          alt={`Ícone da categoria ${event.category_display}`}
          width={150}
          height={150}
          className="rounded-full object-cover transition-transform duration-300 ease-in-out tab-port:w-20 tab-port:h-20 mobile:w-12 mobile:h-12"
        />
        <Typography
          data-testid="event-category-name"
          className="text-sm sm:text-lg font-semibold tracking-tight transition-transform duration-300 ease-in-out"
        >
          {event.category_display}
        </Typography>
      </div>
    </Link>
  );
}
