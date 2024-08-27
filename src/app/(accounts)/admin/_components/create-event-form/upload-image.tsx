"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { UseFormRegister } from "react-hook-form";
import { CreateEventFormSchema } from "./useCreateEventForm";

interface UploadImageFileProps {
  register: UseFormRegister<CreateEventFormSchema>;
}

export function UploadImageFile({ register }: UploadImageFileProps) {
  return (
    <div className="flex justify-center items-center w-full h-[480px] rounded-md bg-white/20">
      <Label
        htmlFor="image"
        className="flex flex-col justify-center items-center w-full h-full cursor-pointer"
      >
        <Image
          src="/assets/images/image-down.svg"
          alt="Upload Image"
          width={100}
          height={100}
        />
        <span className="text-white text-xl font-bold mt-4">
          Clique para fazer upload de uma imagem
        </span>
        <Input
          type="file"
          id="image"
          className="hidden"
          accept="image/*"
          {...register("image")}
        />
      </Label>
    </div>
  );
}
