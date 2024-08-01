import Image from "next/image";
import { Typography } from "../typography";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPinIcon } from "lucide-react";

export interface EventCardProps {
  image: string;
  title: string;
  date: string;
  hour: string;
  location: string;
}

export function EventCard({
  image,
  title,
  date,
  hour,
  location,
}: EventCardProps) {
  return (
    <Card
      data-testid="event-card-container"
      className="w-full max-w-md h-full lg:w-[400px] lg:h-[400px]"
    >
      <Image
        data-testid="event-card-image"
        src={image}
        alt={`Image do evento ${title}`}
        width={500}
        height={300}
        priority
        className="rounded-t-lg object-cover w-full"
      />
      <CardContent className="flex flex-col gap-4 mt-1">
        <div className="lg:flex lg:flex-col lg:gap-2">
          <Typography
            data-testid="event-card-title"
            variant="h4"
            fontWeight={"bold"}
          >
            {title}
          </Typography>

          <Typography
            data-testid="event-card-date-hour"
            variant="h5"
            className="flex items-center gap-2"
          >
            <CalendarIcon />
            {date} - {hour}
          </Typography>

          <Typography
            data-testid="event-card-location"
            variant="h6"
            className="flex items-center gap-2"
          >
            <MapPinIcon />
            {location}
          </Typography>
        </div>

        <Button data-testid="event-card-button" className="w-full">
          Visualizar
        </Button>
      </CardContent>
    </Card>
  );
}
