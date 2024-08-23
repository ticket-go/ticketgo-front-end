import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Separator } from "./separator";
import { useMyAccount } from "./useMyAccount";

export function MyOrders() {
  const { purchases } = useMyAccount();
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

      <div className="flex gap-4 p-6 border-foreground tab-port:flex-col tab-port:p-4">
        {purchases && purchases.length > 0 ? (
          purchases.map((purchase) => (
            <div key={purchase.uuid}>
              <Typography variant="h4">Status: {purchase.status}</Typography>
              <Typography variant="h4">Value: {purchase.value}</Typography>
            </div>
          ))
        ) : (
          <Typography variant="h4">Nenhuma compra realizada!</Typography>
        )}
      </div>
    </>
  );
}
