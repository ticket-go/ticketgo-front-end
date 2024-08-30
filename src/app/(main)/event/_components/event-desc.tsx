import { Typography } from "@/components/typography";

interface EventDescriptionProps {
  description?: string;
}

export default function EventDesc({ description }: EventDescriptionProps) {
  return (
    <div className="w-full rounded-md shadow-lg flex flex-col p-6 bg-gradient-block gap-4">
      <Typography fontWeight={"bold"} color={"white"}>Descrição</Typography>

      <Typography fontWeight={"light"} color={"white"} variant={"h5"}>
        {description || "Descrição não disponível"}
      </Typography>
    </div>
  );
}
