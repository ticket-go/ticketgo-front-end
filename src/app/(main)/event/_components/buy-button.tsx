"use client";

import { GenericButton } from "@/components/generic-button";
import { useCartPayment } from "@/hooks/useCartPayment";

interface BuyButtonTicketProps {
  ticketId: string;
}

export function BuyButtonTicket({ ticketId }: BuyButtonTicketProps) {
  const { handlePaymentGenerateInvoice } = useCartPayment();
  return (
    <>
      <GenericButton
        title="COMPRAR INGRESSO"
        onClick={() => handlePaymentGenerateInvoice(ticketId)}
      />
    </>
  );
}
