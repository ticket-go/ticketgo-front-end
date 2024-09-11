import { GenericButton } from "@/components/generic-button";
import { Typography } from "@/components/typography";
import { Payment } from "@/types/payment";

interface ResumeCartProps {
  payment: Payment | undefined;
  totalItems: number;
  isSubmitting: boolean;
  onClick: () => void;
}

export function ResumeCart({
  payment,
  totalItems,
  isSubmitting,
  onClick,
}: ResumeCartProps) {
  return (
    <div className="flex flex-col justify-between w-1/4 h-[300px] bg-background border-[2px] border-purple rounded-lg p-4 gap-2 tab-port:w-full">
      <Typography variant={"h4"} fontWeight={"bold"}>
        Resumo do pedido
        <Separator />
      </Typography>
      <div className="flex justify-between items-center px-2">
        <Typography variant={"h6"} fontWeight={"medium"}>
          Total do items
        </Typography>
        <Typography variant={"h6"} fontWeight={"medium"}>
          {totalItems}
        </Typography>
      </div>
      <div className="flex justify-between items-center px-2">
        <Typography variant={"h6"} fontWeight={"medium"}>
          Total do pedido
        </Typography>
        <Typography variant={"h6"} fontWeight={"medium"}>
          R$ {payment?.value ? payment.value : "0,00"}
        </Typography>
      </div>
      <GenericButton
        title={isSubmitting ? "Finalizando..." : "Finalizar compra"}
        onClick={onClick}
      />
    </div>
  );
}

function Separator() {
  return <div className="w-full h-[1px] bg-gray-200 mt-2" />;
}
