import { InputForm } from "@/components/input-form";
import { User } from "lucide-react";

interface InfoEventProps {
  register: any;
}

export function InfoEvent({ register }: InfoEventProps) {
  return (
    <div className="flex justify-center items-center w-full h-fit">
      <InputForm
        label="Digite o nome do evento"
        id="event-name"
        name="event_name"
        type="text"
        placeholder="Digite um nome para seu evento"
        register={register("event_name")}
        icon={<User size={24} />}
      />
    </div>
  );
}
