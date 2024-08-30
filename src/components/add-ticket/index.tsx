"use client";

import { createPortal } from "react-dom";
import { Typography } from "@/components/typography";
import { InputCodeForm } from "@/components/input-code";
import { GenericButton } from "@/components/generic-button";
import { Event } from "@/types/event";
import { useCartPayment } from "@/hooks/useCartPayment";
import { LoadingSpinner } from "../loading-spinner";

interface TicketProps {
  event: Event;
  type: "Inteira" | "Meia";
  parcels?: string;
}

export function AddTicket({ event, type, parcels }: TicketProps) {
  const { handleAddTicketToCart, isLoading } = useCartPayment();

  return (
    <div className="w-full rounded-md shadow-lg flex flex-col p-6 bg-background gap-4 border-l-4 border-purple">
      <div className="flex flex-col gap-2">
        <Typography fontWeight={"medium"} variant={"h5"}>
          Individual - {type === "Inteira" ? "Inteira" : "Meia"}
        </Typography>

        <Typography fontWeight={"light"} variant={"h5"}>
          {type === "Inteira"
            ? `R$ ${event.ticket_value}`
            : `R$ ${event.half_ticket_value}`}
        </Typography>

        <Typography fontWeight={"light"} variant={"h5"}>
          em até {parcels}x
        </Typography>

        <div className="flex flex-col gap-4">
          <Typography fontWeight={"light"} variant={"h6"}>
            Aplicar código promocional individual
          </Typography>

          <InputCodeForm />
        </div>

        <GenericButton
          title="ADICIONAR AO CARRINHO"
          onClick={() => handleAddTicketToCart(event.uuid?.toString(), false)}
        />

        <div className="flex justify-between">
          <Typography fontWeight={"light"} variant={"h5"}>
            Disponíveis: {event.tickets_available}
          </Typography>

          <Typography fontWeight={"light"} variant={"h5"}>
            Vendidos: {event.tickets_sold}
          </Typography>
        </div>
      </div>

      {isLoading &&
        createPortal(<LoadingSpinner isLoading={isLoading} />, document.body)}
    </div>
  );
}
