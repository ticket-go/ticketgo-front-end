"use client";

import Image from "next/image";
import { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormRegister } from "react-hook-form";
import { CreateEventFormSchema } from "./useCreateEventForm";

interface UploadImageFileProps {
  register: UseFormRegister<CreateEventFormSchema>;
}

export function UploadImageFile({ register }: UploadImageFileProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };
  return (
    <div className="flex justify-center items-center w-full h-[480px] rounded-md bg-white/20">
      <Label
        htmlFor="image"
        className="flex flex-col justify-center items-center w-full h-full cursor-pointer"
      >
        {imagePreview ? (
          <Image
            src={imagePreview}
            width={0}
            height={0}
            alt="Preview"
            className="object-cover w-full h-full rounded-md"
          />
        ) : (
          <>
            <Image
              src="/assets/images/image-down.svg"
              alt="Upload Image"
              width={100}
              height={100}
            />
            <span className="text-white text-xl font-bold mt-4">
              Clique para fazer upload de uma imagem
            </span>
          </>
        )}
        <Input
          type="file"
          id="image"
          className="hidden"
          accept="image/*"
          {...register("image", { onChange: handleImageChange })}
        />
      </Label>
    </div>
  );
}
