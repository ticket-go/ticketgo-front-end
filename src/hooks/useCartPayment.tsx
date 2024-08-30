"use client";

import { useContext, createContext, useState, useMemo, ReactNode } from "react";
import { createEventTicket } from "@/actions/create-event-ticket";
import { createNewPayment } from "@/actions/new-payment";
import { useRouter } from "next/navigation";
import { Event } from "@/types/event";
import { Ticket } from "@/types/ticket";
import { paymentGenerateInvoice } from "@/actions/payments-generate-invoice";
import { ShoppingCartComponent } from "@/components/shopping-cart";
import { Payment } from "@/types/payment";

interface CartPaymentContextType {
  tickets: Ticket[];
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  handleAddTicketToCart: (
    eventId: Event["uuid"],
    isHalfTicket: boolean
  ) => Promise<Ticket | void>;
  handlePaymentGenerateInvoice: (cartPayment: Payment["uuid"]) => void;
  handleRemoveTicketFromCart: (itemId: Ticket) => void;
  handleClearCart: () => void;
  cartTotalAmount: number;
}

const CartPaymentContext = createContext<CartPaymentContextType | undefined>(
  undefined
);

export const CartPaymentProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  async function handleAddTicketToCart(
    eventId: Event["uuid"],
    isHalfTicket: boolean
  ) {
    setIsLoading(true);
    try {
      const paymentResponse = await createNewPayment();

      if (paymentResponse) {
        const ticketResponse = await createEventTicket(eventId, {
          half_ticket: isHalfTicket,
          cart_payment: paymentResponse.toString(),
        });

        if (ticketResponse) {
          setTickets((prevTickets) => [...prevTickets, ticketResponse]);

          setIsVisible(true);
          setTimeout(() => setIsVisible(false), 3000);

          handlePaymentGenerateInvoice(paymentResponse);
        } else {
          console.error("Falha ao criar o ingresso.");
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Erro ao processar a compra:", error);
    }
  }

  async function handlePaymentGenerateInvoice(cartPaymentId: string) {
    setIsLoading(true);
    try {
      const invoiceData = await paymentGenerateInvoice(cartPaymentId);
      if (invoiceData) {
        router.push(`/payment/${cartPaymentId}`);
      }
    } catch (error) {
      console.error("Erro ao gerar fatura:", error);
    }
  }

  function handleRemoveFromCart(itemId: Ticket) {
    setTickets(tickets.filter((item) => item.uuid !== itemId.uuid));
  }

  function handleClearCart() {
    setTickets([]);
  }

  const cartTotalAmount = useMemo(() => {
    return tickets.length;
  }, [tickets]);

  return (
    <CartPaymentContext.Provider
      value={{
        tickets,
        isLoading,
        setIsLoading,
        handleAddTicketToCart,
        handlePaymentGenerateInvoice,
        handleRemoveTicketFromCart: handleRemoveFromCart,
        handleClearCart,
        cartTotalAmount,
      }}
    >
      {children}
      <ShoppingCartComponent />
    </CartPaymentContext.Provider>
  );
};

export const useCartPayment = () => {
  const context = useContext(CartPaymentContext);
  if (context === undefined) {
    throw new Error("useCartPayment must be used within a CartPaymentProvider");
  }

  return context;
};
