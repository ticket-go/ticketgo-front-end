import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User2, Ticket, ExternalLink, CheckCircle2 } from "lucide-react";
import { Payment } from "@/types/payment";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/typography";

interface TicketPaymentProps {
  payment: Payment;
}

export function TicketPayment({ payment }: TicketPaymentProps) {
  const isReceived = payment.status === "RECEIVED";

  return (
    <Card
      className={cn([
        "w-full h-[200px] transition-all duration-200 ease-in-out",
        isReceived
          ? "shadow-md shadow-green-200"
          : "shadow-md shadow-yellow-50",
      ])}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <Typography variant={"h6"} fontWeight={"semibold"}>
            ID: {payment.uuid}
          </Typography>
          <Badge
            className={cn([
              "flex items-center gap-1",
              isReceived
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800",
            ])}
            variant={"default"}
          >
            {isReceived ? <CheckCircle2 size={20} /> : <Ticket size={20} />}
            {isReceived ? "Confirmado" : "Pendente"}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <User2 className="h-5 w-5 text-muted-foreground" />
          <Typography variant={"h6"} fontWeight={"semibold"}>
            {payment.user_data.first_name} {payment.user_data.last_name}
          </Typography>
        </div>

        <div className="flex items-center gap-2">
          <Typography variant={"h6"} className="font-medium">
            R$ {payment.value}
          </Typography>
          <Typography variant={"h6"} className="text-sm text-muted-foreground">
            ({payment.payment_type})
          </Typography>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="link" asChild className="border">
          <Link
            href={`${payment.link_payment}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
            <ExternalLink size={16} className="ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
