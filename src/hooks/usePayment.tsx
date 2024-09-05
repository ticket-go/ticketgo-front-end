"use client";

import { createContext, useState, useContext, ReactNode } from "react";
import { createNewPayment } from "@/actions/new-payment";
import { paymentGenerateInvoice } from "@/actions/payments-generate-invoice";
import { Payment } from "@/types/payment";

interface PaymentContextType {
  currentPaymentId: Payment["uuid"] | null;
  isSubmitting: boolean;
  createPayment: () => Promise<void>;
  generateInvoice: (
    cartPaymentId: Payment["uuid"],
    callback: (invoice: Payment["link_payment"]) => void
  ) => Promise<void>;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [currentPaymentId, setCurrentPaymentId] = useState<
    Payment["uuid"] | null
  >(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function createPayment() {
    try {
      const paymentResponse = await createNewPayment();
      if (paymentResponse) {
        setCurrentPaymentId(paymentResponse.toString());
      }
    } catch (error) {
      console.error("Erro ao criar pagamento:", error);
    }
  }

  async function generateInvoice(
    cartPaymentId: Payment["uuid"],
    callback: (invoice: Payment["invoiceUrl"]) => void
  ) {
    try {
      setIsSubmitting(true);
      const invoiceResponse = await paymentGenerateInvoice(cartPaymentId);
      if (invoiceResponse) {
        callback(invoiceResponse.invoiceUrl);
      }
      setIsSubmitting(false);
    } catch (error) {
      console.error("Erro ao gerar fatura:", error);
    }
  }

  return (
    <PaymentContext.Provider
      value={{
        currentPaymentId,
        isSubmitting,
        setIsSubmitting,
        createPayment,
        generateInvoice,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
};
