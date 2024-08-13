"use client";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { ModalLogout } from "../modal-logout";
import { useMenuUser } from "./useMenuUser";

export interface MenuUserOptionsProps {
  username: string;
}

export function MenuUserOptions({ username }: MenuUserOptionsProps) {
  const { isModalOpen, handleModal } = useMenuUser();

  return (
    <>
      <DropdownMenu data-testid="menu-user-container" modal={false}>
        <DropdownMenuTrigger
          data-testid="menu-user-button-trigger"
          asChild
          className="rounded-2xl"
        >
          <Button data-testid="menu-user-button-username" size={"lg"}>
            {username}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          data-testid="menu-user-content-options"
          sideOffset={10}
        >
          <DropdownMenuItem data-testid="menu-user-options">
            <Button
              variant={"destructive"}
              className="w-full"
              onClick={handleModal}
            >
              Sair
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isModalOpen && <ModalLogout closeModal={handleModal} />}
    </>
  );
}
