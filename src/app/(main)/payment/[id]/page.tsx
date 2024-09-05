import { Section } from "@/components/section";
import { Typography } from "@/components/typography";
import { Cart } from "../_components/cart";
import { fetchPaymentsUser } from "@/actions/fetch-payments";
import { GenericButton } from "@/components/generic-button";
import { ShoppingCartIcon } from "lucide-react";

export default async function Payment({ params }: { params: { id: string } }) {
  const { id } = params;
  const payments = await fetchPaymentsUser(id);

  if (!payments) {
    return (
      <main className="flex justify-center items-center w-full min-h-screen bg-background">
        <div className="flex flex-col justify-center items-center w-fit h-fit gap-4">
          <ShoppingCartIcon size={80} />

          <Typography variant={"h4"} fontWeight={"medium"}>
            Você não possui nenhum item em seu carrinho de compras.
          </Typography>

          <GenericButton title="Ver eventos" className="w-[200px] mt-4" />
        </div>
      </main>
    );
  }

  return (
    <main className="flex justify-start items-center w-full h-screen bg-background">
      <Section className="w-full h-fit">
        <Typography variant={"h4"} fontWeight={"bold"}>
          Carrinho de compras
        </Typography>
        <Cart payment={payments} />
      </Section>
    </main>
  );
}
