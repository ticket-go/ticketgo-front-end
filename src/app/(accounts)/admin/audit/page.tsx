import { HistoryTable } from "../_components/history-table";
import { Section } from "@/components/section";

export default function Audit() {
  return (
    <main className="flex justify-center items-center w-full h-full bg-background">
      <Section className="mt-20">
        <HistoryTable />
      </Section>
    </main>
  );
}
