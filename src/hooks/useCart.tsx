"use client";

import { createContext, useState, useContext, ReactNode, useMemo } from "react";
import { createEventTicket } from "@/actions/create-event-ticket";
import { deleteEventTicket } from "@/actions/delete-event-ticket";
import { Ticket } from "@/types/ticket";
import { Event } from "@/types/event";
import { usePayment } from "./usePayment";
import { ShoppingCartComponent } from "@/components/shopping-cart";
import { useAuth } from "./useAuth";
import { useRouter } from "next/navigation";

interface CartContextType {
  tickets: Ticket[];
  isLoading: boolean;
  addTicketToCart: (
    eventId: Event["uuid"],
    isHalfTicket: boolean
  ) => Promise<void>;
  removeTicketFromCart: (
    eventId: Event["uuid"],
    ticketId: Ticket["uuid"]
  ) => void;
  clearCart: () => void;
  cartTotalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentPaymentId, createPayment } = usePayment();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  async function addTicketToCart(
    eventId: Event["uuid"],
    isHalfTicket: boolean
  ) {
    if (!isAuthenticated) {
      router.replace("/login");
    }

    if (isAuthenticated) {
      if (!currentPaymentId) {
        await createPayment();
      }
      if (currentPaymentId) {
        setIsLoading(true);
        try {
          const ticketResponse = await createEventTicket(eventId, {
            half_ticket: isHalfTicket,
            cart_payment: currentPaymentId,
          });
          if (ticketResponse) {
            setTickets((prevTickets) => [...prevTickets, ticketResponse]);
          }
        } catch (error) {
          console.error("Erro ao adicionar ingresso ao carrinho:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
  }

  async function removeTicketFromCart(
    eventId: Event["uuid"],
    ticketId: Ticket["uuid"]
  ) {
    setIsLoading(true);
    try {
      await deleteEventTicket(eventId, ticketId);
      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket.uuid !== ticketId)
      );
    } catch (error) {
      console.error("Erro ao remover ingresso do carrinho:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function clearCart() {
    setTickets([]);
  }

  const cartTotalAmount = useMemo(() => tickets.length, [tickets]);

  return (
    <CartContext.Provider
      value={{
        tickets,
        isLoading,
        addTicketToCart,
        removeTicketFromCart,
        clearCart,
        cartTotalAmount,
      }}
    >
      {children}
      <ShoppingCartComponent />
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
