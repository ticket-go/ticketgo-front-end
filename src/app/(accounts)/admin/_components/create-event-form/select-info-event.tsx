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
import { ErrorMessage } from "@/app/(auth)/_components/error-message";
import { ModalCreateAddress } from "@/components/modal-address";
import { CreateEventFormSchema } from "./useCreateEventForm";
import { useAuth } from "@/hooks/useAuth";

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
              <SelectItem value="music" key="music">
                Música
              </SelectItem>
              <SelectItem value="sports" key="sports">
                Esportes
              </SelectItem>
              <SelectItem value="entertainment" key="entertainment">
                Entretenimento
              </SelectItem>
              <SelectItem value="workshop" key="workshop">
                Workshop
              </SelectItem>
              <SelectItem value="other" key="other">
                Outros
              </SelectItem>
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
          <Select {...register("address")}>
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
