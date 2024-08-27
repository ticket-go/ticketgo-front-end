"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Typography } from "@/components/typography";
import { AddressForm } from "./address-form";
import { UserInfoForm } from "./user-info-form";
import { Button } from "@/components/ui/button";
import { fetchUpdateUser } from "@/actions/update-user";
import { User } from "@/types/user";

export interface EditProfileFormValues extends User {}

interface EditProfileFormProps {
  userId: string;
}

export function EditProfileForm({ userId }: EditProfileFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<EditProfileFormValues>();

  const onSubmit: SubmitHandler<EditProfileFormValues> = async (data) => {
    try {
      const response = await fetchUpdateUser(userId, data);

      if (response) {
        router.replace("/my-account");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="flex flex-col justify-center items-start w-[800px] gap-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex justify-center items-start w-full h-fit gap-6">
        <UserInfoForm register={register} errors={errors} />
        <AddressForm register={register} errors={errors} />
      </div>
      <div className="flex items-center w-fit h-fit gap-6">
        <Button
          type="button"
          variant={"outline"}
          className="w-56 h-14 flex gap-4 border-purple bg-transparent text-purple hover:text-purple/80 hover:border-purple/90 hover:bg-transparent"
          onClick={() => router.back()}
        >
          <Typography variant={"h5"} fontWeight={"medium"}>
            Cancelar
          </Typography>
        </Button>
        <Button
          type="submit"
          variant={"outline"}
          className="w-56 h-14 bg-purple hover:bg-purple/70 p-6"
        >
          <Typography variant={"h5"} fontWeight={"medium"}>
            {isSubmitting ? "Salvando..." : "Salvar"}
          </Typography>
        </Button>
      </div>
    </form>
  );
}
