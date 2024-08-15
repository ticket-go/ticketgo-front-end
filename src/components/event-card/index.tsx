import Image from "next/image";
import { Typography } from "../typography";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "../ui/button";

export interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card
      data-testid="event-card-container"
      className="flex flex-col items-center w-[284px] h-[315px] rounded-sm border-0 border-b-2 border-l-[3px] border-purple p-2.5 gap-2.5 bg-background"
    >
      <Image
        data-testid="event-card-image"
        src={"/assets/images/event-image.svg"}
        alt={`Image do evento`}
        width={500}
        height={300}
        priority
        className="rounded-sm object-cover w-full"
      />
      <CardContent className="flex flex-col gap-3 w-[284px]">
        <div className="flex justify-center items-center w-full h-fit gap-2 px-4">
          <EventDate day={""} month="SET" />
          <div className="flex flex-col w-full h-fit">
            <Typography
              data-testid="event-card-title"
              variant="h5"
              fontWeight={"black"}
              className="leading-[21px]"
            >
              {/* {title} */}
              FINECAP 2024
            </Typography>
            <Typography
              data-testid="event-card-title"
              variant="h6"
              fontWeight={"medium"}
              className="text-[12px] truncate"
            >
              Mari Fernandez, Nattan e Tarcisio do Acordenon
            </Typography>
            <Typography
              data-testid="event-card-date-hour"
              variant="h6"
              fontWeight={"bold"}
              className="text-[12px]"
            >
              23:00 hrs
            </Typography>
          </div>
        </div>
        <EventLocation
          image={"/assets/images/second-image.svg"}
          location="Rua do Chafariz, 28, SP"
        />

        <Button
          data-testid="event-card-button"
          className="w-full h-12 bg-[#E85AFF] hover:bg-purple/80 rounded-sm"
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
      </CardContent>
    </Card>
  );
}

function EventDate({ day, month }: { day: string; month: string }) {
  return (
    <div className="flex flex-col justify-center items-center w-[45px] min-h-14 h-fit rounded-sm px-3 py-2 bg-[#E85AFF]">
      <Typography
        variant={"h5"}
        fontWeight={"extrabold"}
        color={"white"}
        className="leading-[30px]"
      >
        {/* {day} */} 01
      </Typography>
      <Typography
        variant={"h6"}
        fontWeight={"extrabold"}
        color={"white"}
        className="leading-[15px]"
      >
        {month}
      </Typography>
    </div>
  );
}

export function EventLocation({
  image,
  location,
}: {
  image: string;
  location: string;
}) {
  return (
    <div className="flex justify-center items-center w-full h-fit gap-2">
      <Image
        src={image}
        alt="Imagem de localização do evento"
        width={43}
        height={43}
      />
      <div className="flex flex-col w-full h-fit">
        <Typography
          variant={"h6"}
          fontWeight={"semibold"}
          className="leading-[15px]"
        >
          {location}
        </Typography>
      </div>
    </div>
  );
}
