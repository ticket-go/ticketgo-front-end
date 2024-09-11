import { Typography } from "@/components/typography";
import { Separator } from "./separator";
import { useMyAccount } from "./useMyAccount";
import { TicketPayment } from "./ticket-payment";

export function MyPayments() {
  const { user } = useAuth();
  const { payments, loadingPayments } = useMyAccount(user?.user_id as string);

  if (loadingPayments) {
    return <Typography>Carregando...</Typography>;
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
            <div key={payment.uuid} className="flex gap-4">
              <TicketPayment payment={payment} />
            </div>
          ))
        ) : (
          <Typography variant="h4">Nenhuma compra realizada!</Typography>
        )}
      </div>
    </>
  );
}
