import { ErrorMessage } from "@/components/error-message";
import { InputForm } from "@/components/input-form";
import { Typography } from "@/components/typography";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DollarSign, TicketPlus } from "lucide-react";
import { UseFormRegister } from "react-hook-form";
import {
  CreateEventFormSchema,
  useCreateEventForm,
} from "./useCreateEventForm";

interface HalfTicketValueEventProps {
  register: UseFormRegister<CreateEventFormSchema>;
  errors: any;
}

export function HalfTicketValueEvent({
  register,
  errors,
}: HalfTicketValueEventProps) {
  const {
    isHeroEvent,
    isTopEvent,
    handleHeroEventChange,
    handleTopEventChange,
  } = useCreateEventForm();
  return (
    <div className="flex flex-col gap-2 w-full">
      <Typography variant="h4" fontWeight="bold">
        Meia Entrada
      </Typography>
      <div className="flex gap-4 w-full">
        <InputForm
          label="Valor do ingresso de meia entrada"
          id="half_ticket_value"
          name="half_ticket_value"
          type="text"
          placeholder="R$ 00,00"
          register={register("half_ticket_value")}
          icon={<DollarSign size={24} />}
        />
        {errors.half_ticket_value && (
          <ErrorMessage error={errors.half_ticket_value.message} />
        )}

        <InputForm
          label="Quantidade de ingressos meia entrada disponíveis"
          id="half_ticket_quantity"
          name="half_ticket_quantity"
          type="number"
          placeholder="00"
          register={register("half_ticket_quantity")}
          icon={<TicketPlus size={24} />}
        />
        {errors.half_ticket_quantity && (
          <ErrorMessage error={errors.half_ticket_quantity.message} />
        )}
      </div>
      <div className="flex items-center gap-2 w-full mt-4">
        <Checkbox
          checked={isHeroEvent}
          onCheckedChange={handleHeroEventChange}
          id="is_hero_event"
          {...register("is_hero_event")}
          className="w-5 h-5"
        />
        <Label htmlFor="is_hero_event" className="text-lg font-medium">
          Evento Destaque
        </Label>
      </div>

      <div className="flex items-center gap-2 w-full mt-4">
        <Checkbox
          checked={isTopEvent}
          onCheckedChange={handleTopEventChange}
          id="is_top_event"
          {...register("is_top_event")}
          className="w-5 h-5"
        />
        <Label htmlFor="is_top_event" className="text-lg font-medium">
          Evento Principal
        </Label>
      </div>
    </div>
  );
}
