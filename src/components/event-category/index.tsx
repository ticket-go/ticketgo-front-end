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
  const iconSrc = categoryIcons[event.category.toLowerCase()] || "/assets/images/icons/event-image.svg";

  return (
    <Link href={`/events/${event.category}`} passHref>
      <div
        data-testid="event-category-container"
        className="flex flex-col gap-1 sm:gap-2 items-center justify-center text-center w-fit h-fit"
      >
        <Image
          data-testid="event-category-image"
          src={iconSrc}
          alt={`Ícone da categoria ${event.category_display}`}
          width={80}  
          height={80}
          className="rounded-full w-20 h-20 sm:w-36 sm:h-36 object-cover"
        />
        <Typography
          data-testid="event-category-name"
          className="text-sm sm:text-lg font-semibold tracking-tight"
        >
          {event.category_display}
        </Typography>
      </div>
    </Link>
  );
}
