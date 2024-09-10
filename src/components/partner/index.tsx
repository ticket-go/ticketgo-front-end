"use client";

import { useRouter } from "next/navigation";
import { Typography } from "../typography";
import { Button } from "../button";

export function Partner() {
    const router = useRouter();

    const handleRedirect = () => {
        router.push('/register'); 
    };

    return (
        <div className="flex items-center justify-center flex-col w-full h-[300px] bg-purple-gradient mt-8 mb-8 gap-4">
            <div className="flex flex-col items-center">
                <Typography variant={"h3"} fontWeight={"bold"}>Seja nosso parceiro</Typography>
                <Typography variant={"h3"} fontWeight={"bold"}>Tenha seu evento em nossa plataforma!</Typography>
            </div>
            <Button
                text="Criar uma conta"
                className="w-[30%] h-[60px] bg-white hover:bg-white hover:scale-105 transition"
                textColor="text-purple"
                fontWeight="bold"
                onClick={handleRedirect} 
            />
        </div>
    );
}
