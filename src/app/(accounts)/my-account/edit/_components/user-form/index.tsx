"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@/components/typography";
import { AddressForm } from "./address-form";
import { UserInfoForm } from "./user-info-form";
import { Button } from "@/components/ui/button";
import { fetchUpdateUser } from "@/actions/update-user";

interface EditProfileFormProps {
  userId: string;
}

const UserProfileFormValues = z.object({
  first_name: z.optional(z.string()),
  last_name: z.optional(z.string()),
  email: z.optional(z.string({})),
  phone: z.string({ required_error: "Telefone é obrigatório" }),
  street: z.optional(z.string()),
  number: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional(),
  city: z.optional(z.string()),
  district: z.optional(z.string()),
  state: z.optional(z.string()),
  country: z.optional(z.string()),
  complement: z.optional(z.string()),
});

export type UserProfileFormSchema = z.infer<typeof UserProfileFormValues>;

export function EditProfileForm({ userId }: EditProfileFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<UserProfileFormSchema>({
    resolver: zodResolver(UserProfileFormValues),
  });

  const onSubmit: SubmitHandler<UserProfileFormSchema> = async (data) => {
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
