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

const MENU_OPTIONS = [
  {
    name: "Conta",
    path: "/my-account",
  },
  {
    name: "Sair",
  },
];

interface UserMenuOptionsProps {
  username: string;
  children?: React.ReactNode;
}

export function UserMenuOptions({ username, children }: UserMenuOptionsProps) {
  const router = useRouter();
  const { isModalOpen, openModal } = useModal();

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button size={"lg"} className="bg-purple hover:bg-purple/90 ">
            <Typography variant={"h5"} fontWeight={"semibold"}>
              {username}
            </Typography>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={10}>
          {MENU_OPTIONS.map((option) => (
            <DropdownMenuItem key={option.name}>
              {option.name !== "Sair" ? (
                <Button
                  variant={"default"}
                  className="w-full"
                  onClick={() => router.push(`${option.path}`)}
                >
                  {option.name}
                </Button>
              ) : (
                <Button
                  variant={"destructive"}
                  className="w-full"
                  onClick={() => openModal()}
                >
                  Sair
                </Button>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {isModalOpen && <ModalLogout />}
    </>
  );
}
