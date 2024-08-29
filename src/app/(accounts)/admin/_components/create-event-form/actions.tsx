import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { useCreateEventForm } from "./useCreateEventForm";

export function CreateEventFormActions() {
  const { isSubmitting, isLoading, handleCancel } = useCreateEventForm();

  return (
    <div className="flex items-center w-full gap-6">
      <Button
        type="button"
        variant={"outline"}
        className="w-1/2  h-14 flex gap-4 border-purple bg-transparent text-purple hover:text-purple/80 hover:border-purple/90 hover:bg-transparent"
        onClick={() => handleCancel()}
      >
        <Typography variant="h5" fontWeight="semibold">
          Cancelar
        </Typography>
      </Button>
      <Button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="w-1/2 h-14 bg-purple hover:bg-purple/60"
      >
        <Typography variant="h5" fontWeight="semibold">
          {isSubmitting ? "Criando..." : "Criar evento"}
        </Typography>
      </Button>
    </div>
  );
}
