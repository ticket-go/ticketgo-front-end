"use client";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
  useEffect,
} from "react";
import { createEventTicket } from "@/actions/create-event-ticket";
import { createNewPayment } from "@/actions/new-payment";
import { paymentGenerateInvoice } from "@/actions/payments-generate-invoice";
import { fetchPaymentsUser } from "@/actions/fetch-payments-user"; // Importe a função de fetch
import { useRouter } from "next/navigation";
import { Ticket } from "@/types/ticket";
import { Payment } from "@/types/payment";
import { ShoppingCartComponent } from "@/components/shopping-cart";
import { useAuth } from "./useAuth";
import { deleteEventTicket } from "@/actions/delele-event-ticket";

interface CartPaymentContextType {
  payment: Payment | null;
  tickets: Ticket[];
  payments: Payment[];
  cartCountItems: number;
  cartTotalItems: number;
  isLoading: boolean;
  isSubmitting: boolean;
  addTicketToCart: (eventId: string, halfTicket: boolean) => Promise<void>;
  removeTicketFromCart: (eventId: string, ticketId: string) => void;
  generateInvoice: (
    cartPaymentId: string,
    callback: (invoice: Payment["invoiceUrl"]) => void
  ) => Promise<void>;
  fetchUserPayments: (userId: string) => Promise<void>;
}

const CartPaymentContext = createContext<CartPaymentContextType | undefined>(
  undefined
);

export const CartPaymentProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { user } = useAuth();

  const [payment, setPayment] = useState<Payment | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [cartTotalItems, setCartTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ensurePaymentExists = async () => {
    if (!payment) {
      setIsLoading(true);
      try {
        const newPayment = await createNewPayment(0);
        setPayment(newPayment);
        setIsLoading(false);
        return newPayment;
      } catch (error) {
        console.error("Erro ao criar pagamento", error);
        setIsLoading(false);
        throw error;
      }
    }
    return payment;
  };

  const addTicketToCart = async (eventId: string, halfTicket: boolean) => {
    if (!user) {
      router.push("/login");
      return;
    }
    setIsLoading(true);
    try {
      const currentPayment = await ensurePaymentExists();
      const newTicket = await createEventTicket(eventId, {
        half_ticket: halfTicket,
        cart_payment: currentPayment.uuid,
      });
      if (newTicket) {
        setTickets((prevTickets) => [...prevTickets, newTicket]);
        setCartTotalItems((prevTotal) => prevTotal + 1);
      }
    } catch (error) {
      console.error("Erro ao adicionar ingresso ao carrinho", error);
    }
    setIsLoading(false);
  };

  const removeTicketFromCart = async (eventId: string, ticketId: string) => {
    if (tickets) {
      const deleteTicket = await deleteEventTicket(eventId, ticketId);
      if (deleteTicket) {
        setTickets((prevTickets) =>
          prevTickets.filter((ticket) => ticket.uuid !== ticketId)
        );
        setCartTotalItems((prevTotal) => prevTotal - 1);
      }
    }
  };

  const generateInvoice = async (
    cartPaymentId: Payment["uuid"],
    callback: (invoice: Payment["invoiceUrl"]) => void
  ) => {
    try {
      setIsSubmitting(true);
      const invoiceResponse = await paymentGenerateInvoice(cartPaymentId);
      if (invoiceResponse) {
        callback(invoiceResponse.invoiceUrl);
        router.push(`/payment/${cartPaymentId}`);
      }
    } catch (error) {
      console.error("Erro ao gerar fatura:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cartCountItems = useMemo(() => tickets.length, [tickets]);

  const fetchUserPayments = async (userId: string) => {
    setIsLoading(true);
    try {
      const userPayments = await fetchPaymentsUser(user?.user_id as string);
      if (userPayments) {
        setPayments(userPayments);
      }
    } catch (error) {
      console.error("Erro ao buscar pagamentos do usuário", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.user_id) {
      fetchUserPayments(user.user_id);
    }
  }, [user]);

  return (
    <CartPaymentContext.Provider
      value={{
        payment,
        tickets,
        payments,
        isLoading,
        isSubmitting,
        addTicketToCart,
        removeTicketFromCart,
        generateInvoice,
        cartCountItems,
        cartTotalItems,
        fetchUserPayments,
      }}
    >
      {children}
      <ShoppingCartComponent />
    </CartPaymentContext.Provider>
  );
};

export const useCartPayment = () => {
  const context = useContext(CartPaymentContext);
  if (!context) {
    throw new Error("useCartPayment must be used within a CartPaymentProvider");
  }
  return context;
};
