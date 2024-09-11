"use client";

import Link from "next/link";
import { GenericButton } from "@/components/generic-button";
import { Typography } from "@/components/typography";
import { ItemCart } from "./item-cart";
import { useCartPayment } from "@/hooks/useCartPayment";
import { ShoppingCartIcon } from "lucide-react";
import { ResumeCart } from "./resume-cart";
import { useEffect, useState } from "react";
import { Payment } from "@/types/payment";
import { fetchPaymentsDetail } from "@/actions/fetch-payments-user";

export function Cart() {
  const {
    payment,
    cartTotalItems,
    tickets,
    generateInvoice,
    removeTicketFromCart,
    isSubmitting,
  } = useCartPayment();
  const [paymentDetails, setPaymentDetails] = useState<Payment>();

  useEffect(() => {
    if (payment) {
      fetchPaymentsDetail(payment.uuid)
        .then((details) => {
          setPaymentDetails(details as Payment);
        })
        .catch((error) => {
          console.error("Erro ao buscar detalhes do pagamento", error);
        });
    }
  }, [payment]);

  const handlePurchase = async () => {
    if (payment) {
      await generateInvoice(payment.uuid, (invoiceUrl) => {
        window.location.href = invoiceUrl;
      });
    }
  };
  if (!payment) {
    return (
      <main className="flex justify-center items-center w-full min-h-screen bg-background">
        <div className="flex flex-col justify-center items-center w-fit h-fit gap-4">
          <ShoppingCartIcon size={80} />

          <Typography variant={"h4"} fontWeight={"medium"}>
            Você não possui nenhum item em seu carrinho de compras.
          </Typography>

          <Link href="/">
            <GenericButton title="Ver eventos" className="w-[200px] mt-4" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="flex justify-between items-center w-full h-[300px] gap-4 tab-port:flex-col tab-port:items-start">
      <div className="flex flex-col w-3/4 h-full bg-background border-[2px] border-gray-200 rounded-md p-4 tab-port:w-full tab-port:p-0  litemobile:w-full">
        <div className="flex flex-col gap-4 w-full overflow-y-auto tab-port:px-4 tab-port:py-4">
          {tickets.map((ticket) => (
            <ItemCart
              key={ticket.uuid}
              ticket={ticket}
              removeTicket={() =>
                removeTicketFromCart(ticket.event, ticket.uuid)
              }
            />
          ))}
        </div>
      </div>
      <ResumeCart
        payment={paymentDetails}
        totalItems={cartTotalItems}
        isSubmitting={isSubmitting}
        onClick={handlePurchase}
      />
    </div>
  );
}
