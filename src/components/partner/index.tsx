import { Bold } from "lucide-react";
import { Typography } from "../typography";
import { Button } from "../button";



export function Partner () {
    return (
        <div className="flex items-center justify-center flex-col w-full h-[300px] bg-purple-gradient mt-8 mb-8">
            <Typography variant={"h3"} fontWeight={"bold"}>Seja nosso parceiro</Typography>
            <Typography variant={"h3"} fontWeight={"bold"}>Tenha seu evento em nossa plataforma!</Typography>
            <Button text="Criar uma conta"></Button>
        </div>
    )
}