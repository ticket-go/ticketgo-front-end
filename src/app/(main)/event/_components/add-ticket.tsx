import { Typography } from "@/components/typography";
import { InputCodeForm } from "@/components/input-code";
import { Button } from "@/components/button";

interface TicketProps {
  type: string;
  price: string;
  parcels: string;
  available: number;
  sold: number;
  
}

export function AddTicket({ type, price, parcels, available, sold }: TicketProps) {
  return (
    <div className="w-full rounded-md shadow-lg flex flex-col p-6 bg-gradient-block gap-4 border-l-4 border-purple">
      <div className="flex flex-col gap-2">
        <Typography fontWeight={"medium"} variant={"h5"}>
          Individual - {type}
        </Typography>

        <Typography fontWeight={"light"} variant={"h5"}>
          R$ {price}
        </Typography>

        <Typography fontWeight={"light"} variant={"h5"}>
          em até {parcels}x
        </Typography>

        <div className="flex flex-col gap-4">
          <Typography fontWeight={"light"} variant={"h6"}>
            Aplicar código promocional individual
          </Typography>

          <InputCodeForm/>
        </div>

        <Button text="ADICIONAR AO CARRINHO" />

        <div className="flex justify-between">
          <Typography fontWeight={"light"} variant={"h5"}>
            Disponíveis: {available}
          </Typography>

          <Typography fontWeight={"light"} variant={"h5"}>
            Vendidos: {sold}
          </Typography>
        </div>
      </div>
    </div>
  );
}
