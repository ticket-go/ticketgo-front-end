import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Event } from "@/types/event";
import { Typography } from "@/components/typography";
import { Ticket } from "@/types/ticket";

interface ItemCartProps {
  ticket: Ticket;
  onChangeQuantity?: (novaQuantidade: number) => void;
}

export function ItemCart({ ticket, onChangeQuantity }: ItemCartProps) {
  return (
    <Card className="w-full mx-auto">
      <CardContent className="grid grid-flow-col items-center w-full h-full p-4 ">
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
          {ticket.event}
        </Typography>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Minus className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" className="h-8 w-8">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-lg font-semibold">R$ {ticket.half_ticket}</div>
      </CardContent>
    </Card>
  );
}
