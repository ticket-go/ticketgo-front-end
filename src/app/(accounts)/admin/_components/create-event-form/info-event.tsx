import { InputForm } from "@/components/input-form";
import { Calendar, Clock, User } from "lucide-react";
import { UseFormRegister } from "react-hook-form";
import { CreateEventFormSchema } from "./useCreateEventForm";
import { ErrorMessage } from "@/app/(auth)/_components/error-message";

interface InfoEventProps {
  register: UseFormRegister<CreateEventFormSchema>;
  errors: any;
}

export function InfoEvent({ register, errors }: InfoEventProps) {
  return (
    <div className="flex flex-col gap-4 w-full h-fit">
      <InputForm
        label="Evento"
        id="name"
        name="name"
        type="text"
        placeholder="Digite o nome do evento"
        register={register("name")}
        icon={<User size={24} />}
      />
      {errors.name && <ErrorMessage error={errors.name.message} />}
      <div className="flex gap-4 w-full">
        <InputForm
          label="Data"
          id="date"
          name="date"
          type="date"
          register={register("date")}
          icon={<Calendar size={24} />}
        />
        {errors.date && <ErrorMessage error={errors.date.message} />}

        <InputForm
          label="Horário"
          id="time"
          name="time"
          type="time"
          register={register("time")}
          icon={<Clock size={24} />}
        />
        {errors.time && <ErrorMessage error={errors.time.message} />}
      </div>

      <InputForm
        label="Descrição"
        id="description"
        name="description"
        type="text"
        placeholder="Descreva o evento para seu público"
        register={register("description")}
        className="h-40"
      />
      {errors.description && (
        <ErrorMessage error={errors.description.message} />
      )}
    </div>
  );
}
