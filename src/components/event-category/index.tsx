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
  
  const iconSrc = categoryIcons[event.category.toLowerCase()] || "/assets/images/icons/cinema.png";

  return (
    <Link href={`/events/${event.category}`} passHref>
      <div
        data-testid="event-category-container"
        className="flex flex-col gap-2 items-center justify-center text-center w-fit h-fit"
      >
        <Image
          data-testid="event-category-image"
          src={iconSrc}
          alt={`Ícone da categoria ${event.category_display}`}
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
