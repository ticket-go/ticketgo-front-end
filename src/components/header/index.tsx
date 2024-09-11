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
import { useHeader } from "./useHeader";
import { cn } from "@/lib/utils";

import { useCartPayment } from "@/hooks/useCartPayment";

interface CartIndicatorProps {
  totalItems: number;
  paymentId: string;
}

export function Header() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { data: session } = useSession();

  const { payment, cartTotalItems } = useCartPayment();
  const { isScroll } = useHeader();

  const userId = user?.user_id as string;
  const displayName = session?.user?.name || user?.username;

  return (
    <header
      data-testid="header-container"
      className={cn([
        "fixed top-0 right-0 left-0 flex items-center justify-between bg-background w-full h-fit px-6 py-8 z-20",
        isScroll && "bg-background/90 shadow-md",
      ])}
    >
      <Link href="/" prefetch={false}>
        <Typography
          data-testid="header-title-logo"
          variant={"h3"}
          fontWeight={"black"}
        >
          TicketGO
        </Typography>
      </Link>

      <nav className="flex items-center gap-6">
        <SearchBar />

        <HeaderNavItems children="Eventos" href="/events" />

        <div className="flex items-center w-fit h-fit space-x-4">
          {!isAuthenticated && !session ? (
            <Button
              data-testid="header-button"
              variant={"secondary"}
              size={"lg"}
              onClick={() => router.push("/register")}
              className="hidden md:block"
            >
              Criar conta
            </Button>
          ) : (
            <CartIndicator
              totalItems={cartTotalItems}
              paymentId={payment?.uuid || ""}
            />
          )}

          <ModeToggle />

          {isAuthenticated || session ? (
            <UserMenuOptions username={`${displayName}`} userId={userId} />
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
      className="relative bg-background hover:bg-transparent/10 hover:dark:bg-purple mobile:hidden"
    >
      <Link href={"/payment"}>
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
