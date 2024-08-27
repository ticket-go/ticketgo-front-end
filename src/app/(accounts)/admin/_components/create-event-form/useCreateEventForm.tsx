"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { fetchCreateEvent } from "@/actions/fetch-create-event";
import { Event } from "@/types/event";
import { useAuth } from "@/hooks/useAuth";

export interface CreateEventFormSchema extends Event {}

export const useCreateEventForm = () => {
  const { user } = useAuth();
  const [isTopEvent, setIsTopEvent] = useState(false);
  const [isHeroEvent, setIsHeroEvent] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<CreateEventFormSchema>({
    defaultValues: {
      category: "other",
      status: "scheduled",
      ticket_value: "0",
      ticket_quantity: 0,
      half_ticket_value: "0",
      half_ticket_quantity: 0,
    },
  });

  const handleTopEventChange = () => setIsTopEvent((prev) => !prev);
  const handleHeroEventChange = () => setIsHeroEvent((prev) => !prev);

  const onSubmit: SubmitHandler<CreateEventFormSchema> = async (data) => {
    const formData = new FormData();

    formData.append("user_uuid", user?.user_id as string);
    formData.append("address_id", data?.user.address?.uuid || "");
    formData.append("is_hero_event", String(isHeroEvent));
    formData.append("is_top_event", String(isTopEvent));
    formData.append("uuid", data.uuid || "");
    formData.append("name", data.name);
    formData.append("date", String(data.date)); // Convertendo para string se necessário
    formData.append("time", data.time);
    formData.append("description", data.description);

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      await fetchCreateEvent(formData);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isLoading,
    onSubmit,
    isTopEvent,
    isHeroEvent,
    handleTopEventChange,
    handleHeroEventChange,
  };
};
