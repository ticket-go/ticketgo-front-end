import { Typography } from "@/components/typography";

interface EventDescriptionProps {
  description?: string;
}

export default function EventDesc({ description }: EventDescriptionProps) {
  return (
    <div className="w-full rounded-md shadow-lg flex flex-col p-6 bg-background gap-4">
      <Typography fontWeight={"bold"}>Descrição</Typography>

      <Typography fontWeight={"light"} variant={"h5"}>
        {description || "Descrição não disponível"}
      </Typography>
    </div>
  );
}
