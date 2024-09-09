"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Label } from "@radix-ui/react-dropdown-menu";
import { ErrorMessage } from "@/components/error-message";
import { ModalCreateAddress } from "@/components/modal-address";
import { CreateEventFormSchema } from "./useCreateEventForm";
import { Address } from "@/types/address";

const EVENT_CATEGORIES = [
  { label: "music", name: "Música" },
  { label: "sports", name: "Esportes" },
  { label: "entertainment", name: "Entretenimento" },
  { label: "workshop", name: "Workshop" },
  { label: "other", name: "Outros" },
];

interface SelectInfoEventProps {
  register: UseFormRegister<CreateEventFormSchema>;
  errors: FieldErrors<CreateEventFormSchema>;
  addresses: Address[];
}

export function SelectInfoEvent({
  register,
  errors,
  addresses,
}: SelectInfoEventProps) {
  return (
    <div className="flex flex-col gap-4 w-full h-fit">
      <div className="flex flex-col mobile:flex-col tab-port:flex-row gap-4 w-full">
        <div className="flex flex-col gap-2 w-full">
          <Label className="text-lg font-medium">Selecione uma categoria</Label>
          <Select {...register("category")}>
            <SelectTrigger className="h-14 w-full"> 
              <SelectValue placeholder="Nenhuma categoria selecionada" />
            </SelectTrigger>
            <SelectContent>
              {EVENT_CATEGORIES.map((category) => (
                <SelectItem value={category.label} key={category.label}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && <ErrorMessage error={errors.category.message} />}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label className="text-lg font-medium">
            Selecione o status do evento
          </Label>
          <Select {...register("status")}>
            <SelectTrigger className="h-14 w-full"> 
              <SelectValue placeholder="Nenhum status selecionado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="scheduled">Agendado</SelectItem>
              <SelectItem value="completed">Concluído</SelectItem>
            </SelectContent>
          </Select>
          {errors.status && <ErrorMessage error={errors.status.message} />}
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full h-fit">
        <Label className="text-lg font-medium">
          Qual o endereço do seu evento?
        </Label>
        <div className="flex flex-col mobile:flex-col tab-port:flex-row items-center w-full gap-4">
          <Select {...register("address")}>
            <SelectTrigger className="h-14 w-full"> 
              <SelectValue placeholder="Nenhum endereço selecionado" />
            </SelectTrigger>
            <SelectContent>
              {addresses.length > 0 ? (
                addresses.map((addr) => (
                  <SelectItem
                    value={addr.uuid || ""}
                    key={addr.uuid || Math.random()}
                  >
                    {addr.street}, {addr.number} - {addr.city} ({addr.state})
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="none">Nenhum endereço disponível</SelectItem>
              )}
            </SelectContent>
          </Select>
          <ModalCreateAddress />
        </div>
      </div>
    </div>
  );
}
