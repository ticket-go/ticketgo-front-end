import { InputForm } from "@/components/input-form";
import { Calendar, Clock, User } from "lucide-react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { CreateEventFormSchema } from "./useCreateEventForm";
import { ErrorMessage } from "@/components/error-message";

interface InfoEventProps {
  register: UseFormRegister<CreateEventFormSchema>;
  errors: FieldErrors<CreateEventFormSchema>;
}

export function InfoEvent({ register, errors }: InfoEventProps) {
  return (
    <div className="flex flex-col gap-4 w-full h-fit">
      
      <div className="w-full">
        <InputForm
          label="Evento"
          id="name"
          name="name"
          type="text"
          placeholder="Digite o nome do evento"
          register={register("name")}
          icon={<User size={24} />}
          className="w-full"
        />
        {errors.name && <ErrorMessage error={errors.name.message} />}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <div className="w-full">
          <InputForm
            label="Data"
            id="date"
            name="date"
            type="date"
            register={register("date")}
            icon={<Calendar size={24} />}
            className="w-full"
          />
          {errors.date && <ErrorMessage error={errors.date.message} />}
        </div>

        <div className="w-full">
          <InputForm
            label="Hora"
            id="time"
            name="time"
            type="time"
            register={register("time")}
            icon={<Clock size={24} />}
            className="w-full"
          />
          {errors.time && <ErrorMessage error={errors.time.message} />}
        </div>
      </div>

 
      <div className="w-full">
        <InputForm
          label="Descrição"
          id="description"
          name="description"
          type="text"
          register={register("description")}
          className="w-full h-24"
        />
        {errors.description && (
          <ErrorMessage error={errors.description.message} />
        )}
      </div>
    </div>
  );
}
