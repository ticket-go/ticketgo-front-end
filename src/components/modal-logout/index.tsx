"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Typography } from "../typography";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "next-auth/react";
import { useModal } from "@/hooks/useModal";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

interface ModalLogoutProps {
  isPageAccount?: boolean;
}

export function ModalLogout({ isPageAccount = false }: ModalLogoutProps) {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();
  const { isModalOpen, setIsModalOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    if (isPageAccount) {
      openModal();
    }
  }, [isPageAccount, openModal]);

  const handleLogout = async () => {
    if (!isAuthenticated) {
      return;
    }
    await logout();
    await signOut();

    closeModal();
    if (!isPageAccount) {
      router.prefetch("/");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      {isPageAccount ? null : (
        <DialogTrigger asChild>
          <Button variant="destructive">Sair</Button>
        </DialogTrigger>
      )}
      <DialogContent className="bg-background">
        <DialogHeader>
          <DialogTitle>
            <Typography variant="h4" fontWeight={"bold"}>
              Sair
            </Typography>
          </DialogTitle>
          <DialogClose />
        </DialogHeader>
        <DialogDescription>
          <Typography variant="h5">Deseja realmente sair?</Typography>
        </DialogDescription>
        <DialogFooter>
          <Button variant="secondary" onClick={closeModal}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            Sair
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
