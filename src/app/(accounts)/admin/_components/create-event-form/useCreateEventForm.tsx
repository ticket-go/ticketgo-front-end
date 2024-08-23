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
    formState: { errors, isLoading, isSubmitting },
  } = useForm<CreateEventFormSchema>({
    defaultValues: {
      category: "other",
      status: "scheduled",
      is_hero_event: false,
      is_top_event: false,
      ticket_value: "0",
      ticket_quantity: 0,
      half_ticket_value: "0",
      half_ticket_quantity: 0,
    },
  });

  const handleTopEventChange = () => setIsTopEvent(!isTopEvent);
  const handleHeroEventChange = () => setIsHeroEvent(!isHeroEvent);

  const onSubmit: SubmitHandler<CreateEventFormSchema> = async (data) => {
    const newData = {
      ...data,
      user_uuid: user?.user_id as string,
      address_id: data?.address?.uuid || undefined,
    };

    await fetchCreateEvent(newData);
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
