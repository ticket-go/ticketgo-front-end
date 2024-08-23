import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Separator } from "./separator";
import { Edit2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

export function Address() {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between items-center pr-6">
        <Typography
          variant="h3"
          fontWeight="semibold"
          className="p-4 mobile:py-0 mobile:text-[20px] font-semibold"
        >
          Meus Endereços
        </Typography>
      </div>
      <Separator />
      <div className="flex gap-4 p-6 border-foreground tab-port:flex-col tab-port:p-4">
        <div className="flex flex-col w-full h-fit">
          <Typography variant="h4" fontWeight="semibold">
            Edereço principal
          </Typography>
          {user?.address && user?.address ? (
            <div className="flex justify-between items-center px-2">
              <div className="flex flex-col w-full h-fit gap-2">
                <Typography variant="h6" className="mt-4">
                  {user.address.street}, {user.address.number},{" "}
                  {user.address.city} - {user.address.state}
                </Typography>
                {user.address.complement && (
                  <Typography variant="h6" className="mt-2">
                    {user.address.complement}
                  </Typography>
                )}
              </div>
              <Button
                variant="outline"
                className="w-fit h-fit flex gap-4 p-2 bg"
                size={"icon"}
                onClick={() => router.push(`/my-account/edit/${user.user_id}`)}
              >
                <Edit2Icon size={24} />
              </Button>
            </div>
          ) : (
            <div className="flex flex-col w-full h-fit gap-2">
              <Typography variant="h6" className="mt-2">
                Nenhum endereço informado.
              </Typography>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
