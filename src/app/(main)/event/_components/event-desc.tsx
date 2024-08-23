import { Typography } from "@/components/typography";

interface EventDescription {
  description?: string;
}

export default function EventDesc({ description }: EventDescription) {
  return (
    <div className="w-full rounded-md shadow-lg flex flex-col p-6 bg-gradient-block gap-4">
      <Typography fontWeight={"bold"} color={"white"}>Descrição</Typography>

      <Typography fontWeight={"light"} color={"white"} variant={"h5"}>
        {description || "Descrição não disponível"}
      </Typography>
    </div>
  );
}
