import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Typography } from "../typography";
import { Address } from "@/types/address";
import { useModalAddress } from "./useModalAddress";

export interface CreateAddressFormSchema extends Address {}

export function ModalCreateAddress() {
  const {
    isModalAddressOpen,
    handleCloseModalAddress,
    handleChangeModalAddress,
    register,
    handleSubmit,
    onSubmit,
    isSubmitting,
    watchedFields,
  } = useModalAddress();

  return (
    <Dialog
      modal={true}
      open={isModalAddressOpen}
      onOpenChange={() => handleChangeModalAddress()}
    >
      <DialogTrigger asChild>
        <Button
          type="button"
          className="w-1/3 h-14 bg-purple hover:bg-purple/60"
        >
          <Typography variant="h6" fontWeight="semibold">
            Novo Endereço
          </Typography>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px] w-max">
        <form
          className="flex flex-col gap-4 w-full h-fit"
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogHeader>
            <DialogTitle>Adicionar Endereço</DialogTitle>
            <DialogDescription>
              preencha os campos abaixo para adicionar um novo endereço
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-4 ">
              <div className="w-full">
                <Label htmlFor="street" className="text-lg font-medium">
                  Endereço
                </Label>
                <Input
                  id="street"
                  type="text"
                  placeholder="Digite o nome da rua"
                  {...register("street")}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="number" className="text-lg font-medium">
                  Número
                </Label>
                <Input
                  id="number"
                  type="number"
                  placeholder="N°"
                  {...register("number")}
                  className="w-[100px]"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <Label htmlFor="city" className="text-lg font-medium">
                Cidade
              </Label>
              <Input
                id="city"
                type="text"
                placeholder="Digite o nome da cidade"
                {...register("city")}
              />
            </div>
            <div className="flex flex-col gap-4 w-full">
              <Label htmlFor="state" className="text-lg font-medium">
                Estado
              </Label>
              <Input
                id="state"
                type="text"
                placeholder="Digite o nome do estado"
                {...register("state")}
              />
            </div>
            <div className="flex flex-col gap-4 w-full">
              <Label htmlFor="district" className="text-lg font-medium">
                Bairro
              </Label>
              <Input
                id="district"
                type="text"
                placeholder="Digite o nome do bairro"
                {...register("district")}
              />
            </div>
            <div className="flex flex-col gap-4 w-full">
              <Label htmlFor="zip_code" className="text-lg font-medium">
                CEP
              </Label>
              <Input
                id="zip_code"
                type="text"
                placeholder="CEP"
                {...register("zip_code")}
              />
            </div>
            <div className="flex flex-col gap-4 w-full">
              <Label htmlFor="country" className="text-lg font-medium">
                País
              </Label>
              <Input
                id="country"
                type="text"
                placeholder="Digite o nome do país"
                {...register("country")}
              />
            </div>
            <div className="flex flex-col gap-4 w-full">
              <Label htmlFor="complement" className="text-lg font-medium">
                Complemento
              </Label>
              <Input
                id="complement"
                type="text"
                placeholder="Digite o complemento"
                {...register("complement")}
              />
            </div>
          </div>
          <DialogFooter className="w-full h-full">
            <DialogClose>
              <Button
                type="button"
                disabled={watchedFields.some((field) => !field)}
                className="w-16 h-10 p-4 bg-purple hover:bg-purple/60"
              >
                <Typography variant="h6" fontWeight="semibold">
                  Cancelar
                </Typography>
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={watchedFields.some((field) => !field)}
              className="w-16 h-10 bg-purple hover:bg-purple/60"
            >
              <Typography variant="h6" fontWeight="semibold">
                {isSubmitting ? "Criando" : "Criar"}
              </Typography>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
