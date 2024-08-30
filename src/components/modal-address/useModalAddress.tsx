"use client";

import { useCallback, useState } from "react";
import { Address } from "@/types/address";
import { useForm, SubmitHandler } from "react-hook-form";
import { fetchCreateAddress } from "@/actions/create-address";

export interface CreateAddressFormSchema extends Address {}

export const useModalAddress = () => {
  const [isModalAddressOpen, setIsModalAddressOpen] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateAddressFormSchema>({
    defaultValues: {
      street: "",
      number: 0,
      city: "",
      state: "",
      district: "",
      zip_code: "",
      country: "",
      complement: "",
    },
  });

  const watchedFields = watch([
    "street",
    "number",
    "city",
    "state",
    "district",
    "zip_code",
    "country",
  ]);

  const handleChangeModalAddress = () => setIsModalAddressOpen(true);

  const handleCloseModalAddress = useCallback(() => {
    if (isModalAddressOpen) {
      setIsModalAddressOpen(false);
    }
  }, [isModalAddressOpen]);

  const onSubmit: SubmitHandler<CreateAddressFormSchema> = async (data) => {
    const response = await fetchCreateAddress(data);
    if (response.status === 201) {
      setIsModalAddressOpen(false);
    }
  };

  return {
    isModalAddressOpen,
    setIsModalAddressOpen,
    handleChangeModalAddress,
    handleCloseModalAddress,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    watchedFields,
  };
};
