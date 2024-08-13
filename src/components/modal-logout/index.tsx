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

interface ModalLogoutProps {
  closeModal: () => void;
}

export function ModalLogout({ closeModal }: ModalLogoutProps) {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    closeModal();
  };

  return (
    <Dialog open={true} onOpenChange={closeModal}>
      <DialogTrigger asChild>
        <Button variant="destructive">Sair</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Typography variant="h4">Sair</Typography>
          </DialogTitle>
          <DialogClose />
        </DialogHeader>
        <DialogDescription>
          <Typography variant="h4">Deseja realmente sair?</Typography>
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
