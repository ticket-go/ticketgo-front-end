"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Typography } from "@/components/typography";
import { UserAddressForm } from "./address-form";
import { UserInfoForm } from "./user-info-form";
import { Button } from "@/components/ui/button";
import { fetchUpdateUser } from "@/actions/update-user";
import { User } from "@/types/user";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";

export interface EditProfileFormValues extends User {}

interface EditProfileFormProps {
  userId: string;
}

export function EditProfileForm({ userId }: EditProfileFormProps) {
  const router = useRouter();
  const { user } = useAuth();

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
      className="flex flex-col justify-center items-center w-full h-full tab-port:px-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card className="w-[1000px] h-fit tab-port:w-full">
        <CardHeader>
          <CardTitle>
            <Typography variant={"h3"} fontWeight={"medium"}>
              Editar Perfil
            </Typography>
          </CardTitle>
          <CardDescription>
            <Typography variant={"h6"} fontWeight={"regular"}>
              Atualize suas informações pessoais ou endereço.
            </Typography>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full h-14 grid-cols-2">
              <TabsTrigger className="h-full" value="personal">
                Informações Pessoais
              </TabsTrigger>
              <TabsTrigger className="h-full" value="address">
                Endereço
              </TabsTrigger>
            </TabsList>
            <TabsContent value="personal">
              <UserInfoForm user={user} register={register} errors={errors} />
            </TabsContent>
            <TabsContent value="address">
              <UserAddressForm
                user={user}
                register={register}
                errors={errors}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex items-center gap-4">
          <Button
            type="button"
            variant={"outline"}
            className="w-56 h-14 flex gap-4 border-purple bg-transparent text-purple hover:text-purple/80 hover:border-purple/90 hover:bg-transparent tab-port:w-1/3 tab-port:10"
            onClick={() => router.back()}
          >
            <Typography variant={"h5"} fontWeight={"medium"}>
              Cancelar
            </Typography>
          </Button>
          <Button
            type="submit"
            variant={"outline"}
            className="w-56 h-14 bg-purple hover:bg-purple/70 tab-port:w-1/3 tab-port:10"
          >
            <Typography variant={"h5"} fontWeight={"medium"} color={"white"}>
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Typography>
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
