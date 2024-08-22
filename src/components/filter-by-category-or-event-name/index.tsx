import { Input } from "@/components/ui/input";
import { MapPin, SearchIcon } from "lucide-react";
import { Address } from "@/types/address";
import { InputForm } from "../input-form";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface InputFormProps {
  address: Address[];
}

const filterFormSchema = z.object({
  location: z.string(),
  search: z.string(),
});

type FilterFormSchema = z.infer<typeof filterFormSchema>;

export function FilterByCategoryOrEventNameForm({ address }: InputFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FilterFormSchema>({
    resolver: zodResolver(filterFormSchema),
  });

  const onSubmit: SubmitHandler<FilterFormSchema> = async (data) => {
    console.log("Form data:", data);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 bg-slate-50 rounded-lg shadow-md">
      <form
        className="flex justify-center items-center w-full h-full bg-background gap-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputForm
          label="Location"
          id="location"
          placeholder="Selecione a localização"
          name="location"
          register={register("location")}
          icon={<MapPin size={24} />}
          type="select"
          // options={address.map(addr => ({ value: addr.id, label: addr.name }))} // Exemplo de mapeamento dos dados de endereço
        />

        <div className="relative w-full h-fit max-w-md hidden lg:flex">
          <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            data-testid="header-search-input"
            type="search"
            placeholder="Buscar eventos"
            className="pr-10 lg:h-10 text-black"
            {...register("search")} // Registra o campo de busca no formulário
          />
        </div>
      </form>
    </div>
  );
}
