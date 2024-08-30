import { fetchInvoice } from "@/actions/fetch-invoice";
import { Typography } from "@/components/typography";
import Link from "next/link";

export default async function Payment({ params }: { params: { id: string } }) {
  const { id } = params;
  const invoice = await fetchInvoice(id);

  if (!invoice) {
    return (
      <main className="flex justify-center items-center w-full min-h-screen bg-background">
        <div className="w-fit h-fit">
          <Typography variant={"h4"} fontWeight={"bold"}>
            Fatura não encontrada.
          </Typography>
        </div>
      </main>
    );
  }

  return (
    <main className="flex justify-center items-center w-full min-h-screen bg-background">
      <div className="w-fit h-fit p-4 rounded shadow-md">
        <Typography variant={"h4"} fontWeight={"bold"} className="mb-4">
          Fatura: {invoice.uuid}
        </Typography>
        <Typography variant={"h5"} className="mb-2">
          Valor: R$ {invoice.value}
        </Typography>
        <Typography variant={"h5"} className="mb-2">
          Status: {invoice.status}
        </Typography>
        <Typography variant={"h5"} className="mb-2">
          Tipo de Pagamento: {invoice.payment_type ?? "Não especificado"}
        </Typography>
        <Typography variant={"h5"} className="mb-4">
          ID Externo: {invoice.external_id ?? "N/A"}
        </Typography>
        {invoice.link_payment && (
          <Typography variant={"h5"} className="mb-4">
            <Link
              href={invoice.link_payment}
              target="_blank"
              className="text-blue-500 underline"
            >
              Pagar Fatura
            </Link>
          </Typography>
        )}
        <Typography variant={"h5"} className="mb-2">
          Usuário: {invoice.user}
        </Typography>
        <Typography variant={"h5"} className="mb-4">
          Total de Ingressos: {invoice.tickets.length}
        </Typography>
        <Typography variant={"h5"} fontWeight={"bold"} className="mt-4">
          Detalhes dos Ingressos:
        </Typography>
      </div>
    </main>
  );
}
