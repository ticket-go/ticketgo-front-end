"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { fetchCreateEvent } from "@/actions/fetch-create-event";
import { Event } from "@/types/event";

export interface CreateEventFormSchema extends Omit<Event, "image"> {
  image: FileList;
}

export const useCreateEventForm = () => {
  const [isTopEvent, setIsTopEvent] = useState(false);
  const [isHeroEvent, setIsHeroEvent] = useState(false);
  const [success, setSuccess] = useState(false); 
  const [isLoading, setIsLoading] = useState(false); 

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateEventFormSchema>({
    defaultValues: {
      category: "other",
      status: "scheduled",
      ticket_value: "0",
      ticket_quantity: 0,
      half_ticket_value: "0",
      half_ticket_quantity: 0,
      is_hero_event: false,
      is_top_event: false,
      address: "b8ad6ace-41cf-4aee-b067-2447d888e408",
    },
  });

  const handleTopEventChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setIsTopEvent(newValue);
    setValue("is_top_event", newValue);
  };

  const handleHeroEventChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.checked;
    setIsHeroEvent(newValue);
    setValue("is_hero_event", newValue);
  };

  const handleCancel = () => {
    reset();
  };

  const onSubmit: SubmitHandler<CreateEventFormSchema> = async (data) => {
    try {
      setIsLoading(true); 
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("date", data.date?.toString());
      formData.append("time", data.time);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("status", data.status);
      formData.append("ticket_value", data.ticket_value || "0");
      formData.append("half_ticket_value", data.half_ticket_value || "0");
      formData.append(
        "ticket_quantity",
        data.ticket_quantity?.toString() || "0"
      );
      formData.append(
        "half_ticket_quantity",
        data.half_ticket_quantity?.toString() || "0"
      );
      formData.append("is_top_event", data.is_top_event ? "true" : "false");
      formData.append("is_hero_event", data.is_hero_event ? "true" : "false");
      formData.append("address", String(data.address));

      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      await fetchCreateEvent(formData);
      setSuccess(true); 
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  return {
    register,
    handleSubmit,
    control,
    errors,
    isSubmitting,
    isLoading,
    onSubmit,
    isTopEvent,
    isHeroEvent,
    handleTopEventChange,
    handleHeroEventChange,
    handleCancel,
    success, 
  };
};
