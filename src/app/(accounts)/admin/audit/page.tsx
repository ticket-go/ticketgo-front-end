import { fetchAuditHistory } from "@/actions/fetch-audit-history";
import { HistoryTable } from "../_components/history-table";
import { Section } from "@/components/section";

export default async function Page() {
  const historyData = await fetchAuditHistory();

  return (
    <main className="flex justify-center items-center w-full h-full bg-background">
      <Section className="mt-20">
        <HistoryTable historyData={historyData} />
      </Section>
    </main>
  );
}
