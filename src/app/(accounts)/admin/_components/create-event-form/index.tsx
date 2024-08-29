"use client";

import { useCreateEventForm } from "./useCreateEventForm";
import { Typography } from "@/components/typography";
import { UploadImageFile } from "./upload-image";
import { InfoEvent } from "./info-event";
import { SelectInfoEvent } from "./select-info-event";
import { TicketValueEvent } from "./ticket-value-event";
import { HalfTicketValueEvent } from "./half_ticket-value";
import { CreateEventFormActions } from "./actions";
import { Address } from "@/types/address";
import { useAuth } from "@/hooks/useAuth";

interface CreateEventFormProps {
  address: Address[];
}

export function CreateEventForm({ address }: CreateEventFormProps) {
  const { register, handleSubmit, control, errors, onSubmit } =
    useCreateEventForm();

  return (
    <form
      className="flex flex-col justify-center items-start w-full h-fit gap-10 p-2.5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h2" fontWeight="bold" className="leading-[60px]">
        Criar um evento
      </Typography>

      <UploadImageFile register={register} />
      <InfoEvent register={register} errors={errors} />
      <SelectInfoEvent
        register={register}
        errors={errors}
        addresses={address}
      />

      <Typography variant="h2" fontWeight="bold" className="leading-[60px]">
        Ingresso
      </Typography>

      <TicketValueEvent register={register} errors={errors} />

      <HalfTicketValueEvent
        register={register}
        errors={errors}
        control={control}
      />

      <CreateEventFormActions />
    </form>
  );
}
