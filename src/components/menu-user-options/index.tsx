"use client";

import { useState } from "react";
import { ModalLogout } from "../modal-logout";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

interface UserMenuOptionsProps {
  username: string;
}

export function UserMenuOptions({ username }: UserMenuOptionsProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild className="rounded-2xl">
          <Button size={"lg"}>{username}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={10}>
          <DropdownMenuItem>
            <Button
              variant={"destructive"}
              className="w-full"
              onClick={openModal} // Abre o modal quando clicado
            >
              Sair
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isModalOpen && <ModalLogout closeModal={closeModal} />}
    </>
  );
}
