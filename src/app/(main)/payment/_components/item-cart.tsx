import Image from "next/image";
import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Typography } from "@/components/typography";
import { Ticket } from "@/types/ticket";

interface ItemCartProps {
  ticket: Ticket;
  removeTicket: () => void;
}

export function ItemCart({ ticket, removeTicket }: ItemCartProps) {
  return (
    <Card className="w-full bg-backgroundCard">
      <CardContent className="grid grid-flow-col items-center w-full h-full p-4 tab-port:gap-4 mobile:p-0">
        <div className="flex-shrink-0">
          <Image
            src={"/assets/images/banner-vertical.svg"}
            alt="Ingresso do evento"
            width={120}
            height={120}
            className="rounded-md object-cover"
          />
        </div>

        <Typography
          variant={"h4"}
          fontWeight={"medium"}
          className="text-lg font-semibold"
        >
          {ticket.event_data.name}
        </Typography>

        <Typography
          variant={"h4"}
          fontWeight={"medium"}
          className="text-lg font-semibold"
        >
          {ticket.event_data.address_data.city},{" "}
          {ticket.event_data.address_data.state}
        </Typography>

        <Typography
          variant={"h4"}
          fontWeight={"medium"}
          className="text-lg font-semibold"
        >
          {ticket.event_data.status_display}
        </Typography>

        <Typography
          variant={"h4"}
          fontWeight={"medium"}
          className="text-lg font-semibold"
        >
          R$ {ticket.event_data.ticket_value}
        </Typography>

        <Button
          variant="destructive"
          size="icon"
          className="h-8 w-8"
          onClick={() => removeTicket()}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
