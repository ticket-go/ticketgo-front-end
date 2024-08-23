"use client";

import { createPortal } from "react-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DollarSign, TicketPlus } from "lucide-react";
import { useCreateEventForm } from "./useCreateEventForm";
import { ErrorMessage } from "@/app/(auth)/_components/error-message";
import { Typography } from "@/components/typography";
import { InputForm } from "@/components/input-form";
import { UploadImageFile } from "./upload-image";
import { InfoEvent } from "./info-event";
import { SelectInfoEvent } from "./select-info-event";
import { ModalCreateAddress } from "@/components/modal-address";
import { useModalAddress } from "@/components/modal-address/useModalAddress";

export function CreateEventForm() {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isLoading,
    onSubmit,
    isHeroEvent,
    isTopEvent,
    handleHeroEventChange,
    handleTopEventChange,
  } = useCreateEventForm();

  const { isModalAddressOpen } = useModalAddress();

  return (
    <>
      <form
        className="flex flex-col justify-center items-start w-full h-fit gap-10 p-2.5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h2" fontWeight="bold" className="leading-[60px]">
          Criar um evento
        </Typography>

        <UploadImageFile register={register} />
        <InfoEvent register={register} errors={errors} />
        <SelectInfoEvent register={register} errors={errors} />

        <Typography variant="h2" fontWeight="bold" className="leading-[60px]">
          Ingresso
        </Typography>

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

        <Button
          type="submit"
          disabled={!isSubmitting || isLoading}
          className="w-full h-14 bg-purple hover:bg-purple/60"
        >
          <Typography variant="h5" fontWeight="semibold">
            {isSubmitting ? "Criando..." : "Criar evento"}
          </Typography>
        </Button>
      </form>

      {isModalAddressOpen &&
        createPortal(<ModalCreateAddress />, document.body)}
    </>
  );
}
