import { ErrorMessage } from "@/components/error-message";
import { InputForm } from "@/components/input-form";
import { Typography } from "@/components/typography";
import { DollarSign, TicketPlus } from "lucide-react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { CreateEventFormSchema } from "./useCreateEventForm";

interface TicketValueEventProps {
  register: UseFormRegister<CreateEventFormSchema>;
  errors: FieldErrors<CreateEventFormSchema>;
}

export function TicketValueEvent({ register, errors }: TicketValueEventProps) {
  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <Typography variant="h4" fontWeight="bold">
          Inteiro
        </Typography>
        <div className="flex gap-4 w-full">
          <InputForm
            label="Valor do ingresso"
            id="ticket_value"
            name="ticket_value"
            type="text"
            placeholder="R$ 00,00"
            register={register("ticket_value")}
            icon={<DollarSign size={24} />}
          />
          {errors.ticket_value && (
            <ErrorMessage error={errors.ticket_value.message} />
          )}

          <InputForm
            label="Quantidade de ingressos disponíveis"
            id="ticket_quantity"
            name="ticket_quantity"
            type="number"
            placeholder="00"
            register={register("ticket_quantity")}
            icon={<TicketPlus size={24} />}
          />
          {errors.ticket_quantity && (
            <ErrorMessage error={errors.ticket_quantity.message} />
          )}
        </div>
      </div>
    </>
  );
}
