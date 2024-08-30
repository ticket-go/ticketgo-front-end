import { Typography } from "@/components/typography";
import { Separator } from "./separator";
import { useMyAccount } from "./useMyAccount";

export function MyPayments() {
  const { payments, loadingPayments } = useMyAccount();

  if (loadingPayments) {
    return <Typography variant="h4">Carregando...</Typography>;
  }

  return (
    <>
      <Typography
        variant="h3"
        fontWeight="semibold"
        className="p-4 mobile:py-0 mobile:text-[20px] font-semibold"
      >
        Meus pagamentos
      </Typography>

      <Separator />

      <div className="flex flex-col gap-4 p-6 border-foreground tab-port:p-4">
        {payments && payments.length > 0 ? (
          payments.map((payment) => (
            <div
              key={payment.uuid}
              className="flex flex-col gap-2 p-4 border rounded-lg"
            >
              <Typography variant="h4">
                Status: <span className="font-normal">{payment.status}</span>
              </Typography>
              <Typography variant="h4">
                Valor: <span className="font-normal">R$ {payment.value}</span>
              </Typography>
            </div>
          ))
        ) : (
          <Typography variant="h4">Nenhuma compra realizada!</Typography>
        )}
      </div>
    </>
  );
}
