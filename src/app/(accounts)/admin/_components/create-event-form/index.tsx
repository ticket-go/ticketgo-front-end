"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@/app/(auth)/_components/error-message";
import { Typography } from "@/components/typography";
import { UploadImageFile } from "./upload-image";
import { InputForm } from "@/components/input-form";
import { Calendar, Clock, DollarSign, TicketPlus, User } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { fetchCreateEvent } from "@/actions/fetch-create-event";
import { Event } from "@/types/event";
import { useRouter } from "next/navigation";

const CreateEventFormSchema = z.object({
  name: z
    .string({ required_error: "Nome do evento é obrigatório" })
    .trim()
    .min(6, { message: "Nome inválido, deve conter no min 6 caracteres" })
    .max(255, {
      message: "O nome do evento deve conter no máx 255 caracteres",
    }),
  date: z
    .string({ required_error: "Data do evento é obrigatória" })
    .refine((value) => !isNaN(Date.parse(value)), {
      message: "Data inválida",
    }),
  time: z
    .string({ required_error: "Hora do evento é obrigatória" })
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: "Hora inválida, deve estar no formato HH:mm",
    }),
  address: z.string({ required_error: "Endereço do evento é obrigatório" }),
  description: z
    .string({
      required_error: "Descrição do evento é obrigatória",
    })
    .trim(),
  category: z.string({ required_error: "Categoria do evento é obrigatória" }),
  status: z.string({ required_error: "Status do evento é obrigatório" }),
  image: z.string({ required_error: "Imagem do evento é obrigatória" }),
  ticket_value: z.preprocess(
    (val) => parseFloat(val as string),
    z
      .number({
        required_error: "Valor do ingresso é obrigatório",
      })
      .positive({ message: "O valor do ingresso deve ser positivo" })
  ),
  half_ticket_value: z.preprocess(
    (val) => parseFloat(val as string),
    z
      .number({
        required_error: "Valor do meio ingresso é obrigatório",
      })
      .positive({ message: "O valor do meio ingresso deve ser positivo" })
  ),
  ticket_quantity: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: "Quantidade de ingressos é obrigatória",
      })
      .nonnegative({
        message: "A quantidade de ingressos deve ser não-negativa",
      })
  ),
  half_ticket_quantity: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: "Quantidade de meio ingressos é obrigatória",
      })
      .nonnegative({
        message: "A quantidade de meio ingressos deve ser não-negativa",
      })
  ),
});

type CreateEventFormSchema = z.infer<typeof CreateEventFormSchema>;

export function CreateEventForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isLoading, errors },
  } = useForm<CreateEventFormSchema>({
    resolver: zodResolver(CreateEventFormSchema),
  });

  const onSubmit: SubmitHandler<CreateEventFormSchema> = async (data) => {
    console.log("Form data:", data);
    const eventData: Event = {
      name: data.name,
      date: new Date(data.date),
      time: data.time,
      address: data.address,
      description: data.description,
      category: data.category,
      status: data.status,
      image: data.image,
      ticket_value: data.ticket_value,
      half_ticket_value: data.half_ticket_value,
      ticket_quantity: data.ticket_quantity,
      half_ticket_quantity: data.half_ticket_quantity,
    };
    const response = await fetchCreateEvent(eventData);

    if (response) {
      console.log("Evento criado com sucesso", response);
      router.push("/");
    }
  };

  return (
    <form
      className="flex flex-col justify-center items-start w-full h-fit gap-10 p-2.5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant={"h2"} fontWeight={"bold"} className="leading-[60px]">
        Criar um evento
      </Typography>

      <UploadImageFile />

      <div className="flex justify-center items-center w-full h-fit">
        <InputForm
          label="Digite o nome do evento"
          id="event-name"
          name="event_name"
          type="text"
          placeholder="Digite um nome para seu evento"
          register={register("name")}
          icon={<User size={24} />}
          textColor={false}
        />
        {errors.name && <ErrorMessage error={errors.name.message} />}
      </div>

      <div className="flex  justify-center items-center w-full h-fit gap-4">
        <InputForm
          label="Data"
          id="date"
          name="date"
          type="date"
          register={register("date")}
          icon={<Calendar size={24} />}
          textColor={false}
        />
        {errors.date && <ErrorMessage error={errors.date.message} />}

        <InputForm
          label="Horário"
          id="time"
          name="time"
          type="time"
          register={register("time")}
          icon={<Clock size={24} />}
          textColor={false}
        />
        {errors.time && <ErrorMessage error={errors.time.message} />}
      </div>

      <div className="flex justify-center items-center w-full h-fit">
        <InputForm
          label="Descrição"
          id="description"
          name="description"
          type="text"
          placeholder="Descreva o evento para seu público"
          register={register("description")}
          textColor={false}
          className="h-40"
        />
        {errors.description && (
          <ErrorMessage error={errors.description.message} />
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <Label htmlFor={"category"} className="text-lg font-medium">
          Selecione uma categoria
        </Label>

        <Select {...register("category")}>
          <SelectTrigger className="h-14">
            <SelectValue placeholder="Nenhuma categoria selecionada" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="music">Música</SelectItem>
            <SelectItem value="sports">Esportes</SelectItem>
            <SelectItem value="entreteniment">Entretenimento</SelectItem>
            <SelectItem value="workshop">WorkShop</SelectItem>
            <SelectItem value="other">Outros</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col items-start gap-2 w-full h-fit">
        <Label htmlFor={"address"} className="text-lg font-medium">
          Qual o endereço do seu evento?
        </Label>
        <div className="flex items-center w-full gap-4">
          <Select {...register("address")}>
            <SelectTrigger className="h-14">
              <SelectValue placeholder="Nenhnum endereço selecionado" />
            </SelectTrigger>
            <SelectContent position="item-aligned">
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="inactive">Inativo</SelectItem>
            </SelectContent>
          </Select>
          <Button
            type="button"
            // disabled={!allFieldsFilled}
            className="w-full h-14 bg-purple hover:bg-purple/60"
            // onClick={}
          >
            <Typography variant={"h6"} fontWeight={"semibold"}>
              Adicionar um novo endereço
            </Typography>
          </Button>
        </div>
      </div>

      <Typography variant={"h2"} fontWeight={"bold"} className="leading-[60px]">
        Ingresso
      </Typography>

      <div className="flex flex-col gap-2 w-full">
        <Typography variant={"h4"} fontWeight={"bold"}>
          Inteiro
        </Typography>

        <div className="flex items-center w-full h-fit gap-4">
          <InputForm
            label="Valor do ingresso"
            id="ticket_value"
            name="ticket_value"
            type="text"
            placeholder="R$ 00,00"
            register={register("ticket_value")}
            icon={<DollarSign size={24} />}
            textColor={false}
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
            textColor={false}
          />
          {errors.ticket_quantity && (
            <ErrorMessage error={errors.ticket_quantity.message} />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <Typography variant={"h4"} fontWeight={"bold"}>
          Meia Entrada
        </Typography>

        <div className="flex items-center w-full h-fit gap-4">
          <InputForm
            label="Valor do ingresso de  meia entrada"
            id="half_ticket_value"
            name="half_ticket_value"
            type="text"
            placeholder="R$ 00,00"
            register={register("half_ticket_value")}
            icon={<DollarSign size={24} />}
            textColor={false}
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
            textColor={false}
          />
          {errors.half_ticket_quantity && (
            <ErrorMessage error={errors.half_ticket_quantity.message} />
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="w-full h-14 bg-purple hover:bg-purple/60"
      >
        <Typography variant={"h5"} fontWeight={"semibold"}>
          {isSubmitting ? "Criando..." : "Criar evento"}
        </Typography>
      </Button>
    </form>
  );
}
