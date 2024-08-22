import { Typography } from "@/components/typography";
import { fetchUser } from "@/actions/fetch-user";
import { Suspense } from "react";
import Image from "next/image";

export default async function UserAdm({ params }: { params: { id: string } }) {
  const { id } = params;
  const user = await fetchUser(id);

  console.log("User Data:", user);

  /* if (!user || Object.keys(user).length === 0) {
    return (
      <div className="w-full rounded-md shadow-lg flex flex-col p-6 bg-gradient-block gap-4">
        <p className="text-red-500">Erro ao carregar dados do usuário.</p>
      </div>
    );
  } */

  return (
    <div className="w-full rounded-md shadow-lg flex flex-col p-6 bg-gradient-block gap-4">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex items-center gap-6">
         
          <Image
            src={"/assets/images/house.webp"} 
            alt={`Imagem do usuário`}
            width={200}
            height={200}
            className="rounded-full"
          />
       
          <div className="flex flex-col gap-2">
            <Typography fontWeight={"medium"} variant={"h5"}>MuroSujoCasaShow</Typography>
            <Typography fontWeight={"light"} variant={"h5"}>Rua do Chafariz, 28, PDF</Typography>
            <Typography fontWeight={"light"} variant={"h6"}>A melhor casa de show do Rio Grande do Norte, cerveja quente e cara, chão sujo e torto, sem segurança nenhuma e com inúmeras moitas para os casais curtirem. Venham agora mesmo para o MuroSujoCasaShow e tenha uma noite inesquecível, aproveite ela como se fosse sua última noite, pois com nossa segurança e higienização, pode acabar sendo.</Typography>
            
          </div>
        </div>
      </Suspense>
    </div>
  );
}
