"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { UseFormRegister } from "react-hook-form";
import { Label } from "@radix-ui/react-dropdown-menu";
import { ErrorMessage } from "@/components/error-message";
import { ModalCreateAddress } from "@/components/modal-address";
import { CreateEventFormSchema } from "./useCreateEventForm";
import { useAuth } from "@/hooks/useAuth";

const EVENT_CATEGORIES = [
  {
    label: "nusic",
    name: "Música",
  },
  {
    label: "sports",
    name: "Esportes",
  },
  {
    label: "entertainment",
    name: "Entretenimento",
  },
  {
    label: "workshop",
    name: "Workshop",
  },
  {
    label: "other",
    name: "Outros",
  },
];

interface SelectInfoEventProps {
  register: UseFormRegister<CreateEventFormSchema>;
  errors: any;
}

export function SelectInfoEvent({ register, errors }: SelectInfoEventProps) {
  const { user } = useAuth();
  const address = [user?.address];
  return (
    <div className="flex flex-col gap-4 w-full h-fit">
      <div className="flex items-center gap-2 w-full h-full">
        <div className="flex flex-col gap-2 w-full">
          <Label className="text-lg font-medium">Selecione uma categoria</Label>
          <Select {...register("category")}>
            <SelectTrigger className="h-14">
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
            <SelectTrigger className="h-14">
              <SelectValue placeholder="Nenhum status selecionado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="scheduled">Agendado</SelectItem>
              <SelectItem value="ongoing">Em andamento</SelectItem>
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
        <div className="flex items-center w-full gap-4">
          <Select {...register("user.address")}>
            <SelectTrigger className="h-14">
              <SelectValue placeholder="Nenhum endereço selecionado" />
            </SelectTrigger>
            <SelectContent>
              {address.map((address) => (
                <SelectItem key={address?.zip_code} value={`${address?.city}`}>
                  {address?.street}, {`${address?.number}`},{" "}
                  {`${address?.city} - ${address?.state}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ModalCreateAddress />
        </div>
      </div>
    </div>
  );
}
