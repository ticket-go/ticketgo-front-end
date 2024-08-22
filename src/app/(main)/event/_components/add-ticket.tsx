import { Typography } from "@/components/typography";

export default function AddTicket() {
  return (
    <div className="w-full rounded-md shadow-lg flex flex-col p-6 bg-gradient-block gap-4">
      <div className="flex flex-col gap-2">
        <Typography fontWeight={"medium"} variant={"h5"}>Individual - Inteira</Typography>
        <Typography fontWeight={"light"} variant={"h5"}>R$ 80,00</Typography>
        <Typography fontWeight={"light"} variant={"h5"}>em até 10x</Typography>

        <div>
          <Typography fontWeight={"light"} variant={"h6"}>Aplicar código promocional individual</Typography>
          <input
            type="text"
            placeholder="Digite seu código"
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
      </div>
    </div>
  );
}
