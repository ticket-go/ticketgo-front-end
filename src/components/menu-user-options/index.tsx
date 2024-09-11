"use client";

import { ModalLogout } from "../modal-logout";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Typography } from "../typography";
import { useModal } from "@/hooks/useModal";
import { useRouter } from "next/navigation";
import { User2Icon } from "lucide-react";

interface UserMenuOptionsProps {
  username: string;
  userId: string;
}

export function UserMenuOptions({ username, userId }: UserMenuOptionsProps) {
  const router = useRouter();
  const { isModalOpen, openModal } = useModal();

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            size={"lg"}
            className="flex items-center gap-2 bg-purple hover:bg-purple/90 px-4"
          >
            <User2Icon size={20} color="white" />
            <Typography
              variant={"h5"}
              fontWeight={"semibold"}
              className="text-white"
            >
              {username}
            </Typography>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={10}>
          <DropdownMenuItem>
            <Button
              variant={"default"}
              className="w-full"
              onClick={() => router.push("/my-account")}
            >
              Conta
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              variant={"default"}
              className="w-full"
              onClick={() => router.push(`/change-password/${userId}`)}
            >
              Segurança
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              variant={"destructive"}
              className="w-full"
              onClick={() => openModal()}
            >
              Sair
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isModalOpen && <ModalLogout />}
    </>
  );
}
