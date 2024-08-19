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
import { Typography } from "../typography";

interface UserMenuOptionsProps {
  username: string;
  children?: React.ReactNode;
}

export function UserMenuOptions({ username, children }: UserMenuOptionsProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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

      {isModalOpen && <ModalLogout closeModal={closeModal} />}
    </>
  );
}
