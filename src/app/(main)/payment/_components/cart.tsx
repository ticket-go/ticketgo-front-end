"use client";

import { GenericButton } from "@/components/generic-button";
import { Typography } from "@/components/typography";
import { useCart } from "@/hooks/useCart";
import { Ticket } from "@/types/ticket";
import { usePayment } from "@/hooks/usePayment";
import { Payment } from "@/types/payment";
import { ItemCart } from "./item-cart";

interface CartProps {
  payment: Payment;
}

export function Cart({ payment }: CartProps) {
  const { cartTotalAmount, tickets } = useCart();
  const { currentPaymentId, generateInvoice, isSubmitting } = usePayment();

  const handlePurchase = async () => {
    if (currentPaymentId) {
      await generateInvoice(`${currentPaymentId}`, (invoiceUrl) => {
        window.location.href = invoiceUrl;
      });
    }
  };

  return (
    <div className="flex justify-between items-center w-full h-[250px] gap-4">
      <div className="flex flex-col w-3/4 h-full bg-background border-[2px] border-gray-200 rounded-md p-4">
        {tickets.map((ticket) => (
          <ItemCart key={ticket.uuid} ticket={ticket} />
        ))}
      </div>

      <div className="flex flex-col justify-between w-1/4 h-full bg-background border-[2px] border-purple rounded-lg p-4 gap-2">
        <Typography variant={"h4"} fontWeight={"bold"}>
          Resumo do pedido
          <Separator />
        </Typography>
        <div className="flex justify-between items-center px-2">
          <Typography variant={"h6"} fontWeight={"medium"}>
            Total do pedido
          </Typography>
          <Typography variant={"h6"} fontWeight={"medium"}>
            R$ {cartTotalAmount}
          </Typography>
        </div>
        <GenericButton
          title={isSubmitting ? "Finalizando..." : "Finalizar compra"}
          onClick={handlePurchase}
        />
      </div>
    </div>
  );
}
//
// function CartItem({ ticket }: { ticket: Ticket["uuid"] }) {
//   return (
//     <div className="flex items-center justify-around w-full h-fit">
//       <Typography variant={"h6"} fontWeight={"medium"}>
//         {ticket}
//       </Typography>
//     </div>
//   );
// }

function Separator() {
  return <div className="w-full h-[1px] bg-gray-200 mt-2" />;
}
