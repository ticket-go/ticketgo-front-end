"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartPayment } from "@/hooks/useCartPayment";

export function Invoices() {
  const {
    tickets,
    cartTotalAmount,
    handleRemoveTicketFromCart,
    handleClearCart,
    handlePaymentGenerateInvoice,
  } = useCartPayment();

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Your Order</CardTitle>
        </CardHeader>
        <CardContent>
          {tickets.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="space-y-2">
              {tickets.map((ticket) => (
                <li
                  key={ticket.uuid}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <span>
                    Ticket for Event {ticket.uuid}{" "}
                    {ticket.half_ticket ? " (Half Price)" : ""}
                  </span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveTicketFromCart(ticket)}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            <p>Total Items: {cartTotalAmount}</p>
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              onClick={handleClearCart}
              disabled={tickets.length === 0}
            >
              Clear Cart
            </Button>
            <Button
              onClick={() => {
                if (tickets.length > 0) {
                  handlePaymentGenerateInvoice(tickets[0].cart_payment);
                }
              }}
              disabled={tickets.length === 0}
            >
              Generate Invoice
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
