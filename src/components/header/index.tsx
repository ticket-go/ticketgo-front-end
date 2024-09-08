"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Typography } from "../typography";
import { HeaderNavItems } from "./nav-items";
import { SearchBar } from "../search-bar";
import { ModeToggle } from "../theme-switch";
import { UserMenuOptions } from "../menu-user-options";
import { useAuth } from "@/hooks/useAuth";
import { useSession } from "next-auth/react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useHeader } from "./useHeader";
import { cn } from "@/lib/utils";
import { usePayment } from "@/hooks/usePayment";

interface CartIndicatorProps {
  totalItems: number;
  paymentId: string;
}

export function Header() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { data: session } = useSession();
  const { cartTotalAmount } = useCart();
  const { currentPaymentId } = usePayment();
  const { isScroll } = useHeader();

  const displayName = session?.user?.name || user?.username;

  return (
    <header
      data-testid="header-container"
      className={cn([
        "fixed top-0 right-0 left-0 flex items-center justify-between bg-background px-6 py-4 lg:px-8 lg:py-8 z-20",
        isScroll && "bg-background/90 shadow-md",
      ])}
    >
      <Link href="/" className="flex items-center" prefetch={false}>
        <Typography
          data-testid="header-title-logo"
          variant={"h3"}
          fontWeight={"black"}
        >
          TicketGO
        </Typography>
      </Link>

      <nav className="md:flex items-center space-x-8 mb-4">
        <SearchBar />

        <HeaderNavItems children="Eventos" href="/" />

        <div className="flex items-center w-fit h-fit space-x-4">
          {!isAuthenticated && !session ? (
            <Button
              data-testid="header-button"
              variant={"secondary"}
              size={"lg"}
              onClick={() => router.push("/register")}
              className="hidden md:block" // Esconde no mobile
            >
              Criar conta
            </Button>
          ) : (
            <CartIndicator
              totalItems={cartTotalAmount}
              paymentId={`${currentPaymentId}`}
            />
          )}

          <ModeToggle />

          {isAuthenticated || session ? (
            <UserMenuOptions username={`${displayName}`} />
          ) : (
            <Button
              data-testid="header-button"
              size={"lg"}
              className="bg-purple hover:bg-purple/90 text-white"
              onClick={() => router.push("/login")}
            >
              Entrar
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}

function CartIndicator({ totalItems, paymentId }: CartIndicatorProps) {
  return (
    <Button
      variant={"outline"}
      size={"icon"}
      className="relative bg-background hover:bg-transparent/10"
    >
      <Link href={`/payment/${paymentId}`}>
        <ShoppingCart size={24} />
      </Link>
      {totalItems > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-white text-xs">
          {totalItems}
        </span>
      )}
    </Button>
  );
}
